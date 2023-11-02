import { StreamingTextResponse, Message as VercelChatMessage } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatGooglePaLM } from "langchain/chat_models/googlepalm";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { GooglePaLMEmbeddings } from "langchain/embeddings/googlepalm";
import { PromptTemplate } from "langchain/prompts";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";
import { BytesOutputParser, StringOutputParser } from "langchain/schema/output_parser";
import { RunnableSequence, RunnablePassthrough } from "langchain/schema/runnable";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { TextEncoder } from "util";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { TransformStream, ReadableStreamDefaultController } from "web-streams-polyfill/ponyfill";

import { Database } from "@/types/supabase";

type ConversationalRetrivalQAChainInput = {
  question: string;
  chat_history: VercelChatMessage[];
};

const combineDocumentsFn = (docs: Document[], separator = "\n\n") => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join(separator);
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    } else if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });

  return formattedDialogueTurns.join("\n");
};

const condenseQuestionTemplate = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;
const CONDENSE_QUESTION_PROMPT = PromptTemplate.fromTemplate(condenseQuestionTemplate);

const answerTemplate = `Give optimum answer in proper way to the extent possible for asked input : {question}

Please make sure 'If someone is greeting, please greet them properly everytime' without fail

Initiall please check the question is from context, and totally avoid the question which is out of context and don't at all try to make answer from your knowledge

If the question is asked out of the context, just say that you don't know, don't try to make up an answer

Ensure that your response directly addresses the user's query without including unnecessary details, metadata, or information that is not directly relevant

Ensure to be  specific, mention relevant information, examples, and supporting evidence to strengthen argument.

Avoid vague or incomplete answers. Aim for clarity, coherence, and logical structure in your response.

Only consider the previous question if the current question has any correlation or reference based on it`;

const ANSWER_PROMPT = PromptTemplate.fromTemplate(answerTemplate);

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { owner } = body;
    const messages = body.messages ?? [];
    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;

    // const model = new ChatOpenAI();
    const model = new ChatGooglePaLM({
      apiKey: process.env.GOOGLE_PALM_API_KEY,
    });

    const client = createServerComponentClient<Database>({ cookies });

    const vectorStore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client,
      tableName: "documents",
      queryName: "match_documents",
      filter: { owner },
    });

    const retriver = vectorStore.asRetriever();
    // Retrieve relevant documents from Supabase and wait for it to complete
    const relevantDocs = await retriver.getRelevantDocuments(currentMessageContent);
    console.log("Relevant Docs", relevantDocs);

    const standaloneQuestionChain = RunnableSequence.from([
      {
        question: (input: ConversationalRetrivalQAChainInput) => input.question,
        chat_history: (input: ConversationalRetrivalQAChainInput) =>
          formatVercelMessages(input.chat_history),
      },
      CONDENSE_QUESTION_PROMPT,
      model,
      new StringOutputParser(),
    ]);

    const answerChain = RunnableSequence.from([
      {
        context: retriver.pipe(combineDocumentsFn),
        question: new RunnablePassthrough(),
      },
      ANSWER_PROMPT,
      model,
      new BytesOutputParser(),
    ]);

    const conversationalRetrievalQAChain = standaloneQuestionChain.pipe(answerChain);

    const stream = await conversationalRetrievalQAChain.stream({
      question: currentMessageContent,
      chat_history: previousMessages,
    });

    // let combineStream: any = stream;
    // if (relevantDocs.length > 0) {
    //   combineStream = await prependDataToStream(
    //     JSON.stringify(`metadata: ${JSON.stringify(relevantDocs)}`),
    //     stream
    //   );
    // }

    return new StreamingTextResponse(stream);
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

async function prependDataToStream(
  dataToPrepend: string,
  existingStream: ReadableStream<Uint8Array>
): Promise<ReadableStream<Uint8Array>> {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(dataToPrepend);

  return new ReadableStream({
    async start(controller: ReadableStreamDefaultController<Uint8Array>) {
      // Read from the existing stream and enqueue its data
      const reader = existingStream.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        controller.enqueue(value);
      }

      // Enqueue the data to prepend
      controller.enqueue(encodedData);

      // close the controller
      controller.close();
    },
  });
}
