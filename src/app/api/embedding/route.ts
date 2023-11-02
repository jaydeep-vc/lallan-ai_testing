import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import * as Yup from "yup";

import documentLoader from "@/services/document-loader.service";

const schema = Yup.object({
  file_url: Yup.string().required("Please provide file url").label("File URL").url("Invalid URL"),
  channel_id: Yup.string().label("Channel Id"),
});

type Payload = Yup.InferType<typeof schema>;

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // validate the body first
    const body = (await req.json()) as Payload;
    await schema.validate(body);

    const { file_url, channel_id } = body;

    // Read document
    const file = await documentLoader.loadDocumentFromURL(file_url);
    const loader = new PDFLoader(file!);
    const docs = await loader.load();

    // split into small chunks
    const splitter = new RecursiveCharacterTextSplitter();
    const docOutput = await splitter.splitDocuments(docs);

    // embedding
    const embedding = new OpenAIEmbeddings();

    // insert data into supabase
    const supabase = createServerComponentClient({ cookies });

    for (const document of docOutput) {
      const input = document.pageContent.replace(/\n/g, " ").replace(/[\x00-\x1F\x7F]/g, "");
      const embeddingResponse = await embedding.embedQuery(input);

      await supabase
        .from("documents")
        .insert({
          content: input,
          metadata: { ...document.metadata, source: file_url, owner: channel_id ?? "admin" },
          embedding: embeddingResponse,
          channel_id: channel_id ?? null,
        })
        .throwOnError();
    }

    return NextResponse.json(
      { code: 200, message: "Embedding Stored Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.trace(error);

    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.errors[0] }, { status: 402 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
