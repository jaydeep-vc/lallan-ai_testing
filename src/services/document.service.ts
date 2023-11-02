import HttpService from "./http.service";

import { parserParameters } from "@/lib/url-parser";

export interface ApiFileResponse {
  data: {
    collection_uuid: string;
  };
  statusCode: number;
}

export interface ApiFileRequest {
  doc_name: string[];
  channel_id: string;
  channel_type_id: number;
  embedding_model_id: number;
}

class DocumentService {
  private http;

  constructor() {
    this.http = new HttpService(
      parserParameters(process.env.NEXT_PUBLIC_API_ENDPOINT!, "upload_doc")
    );
  }

  async uploadAndGenerateEmbedding(payload: ApiFileRequest): Promise<ApiFileResponse> {
    return this.http.create<ApiFileRequest>(payload);
  }
}

const docService = new DocumentService();

export default docService;
