import { ChatType } from "./conversation-type.service";
import HttpService from "./http.service";

import { parserParameters } from "@/lib/url-parser";

export interface AIAnswerResponse {
  data: { answer: string; metadata?: string };
  statusCode: number;
}

export interface ChatRequestPayload {
  collection_name: string;
  query: string;
  choice: ChatType;
  previous_question: string[];
  previous_answer: string[];
  elaborate: boolean;
  simplify: boolean;
  channel_type_id: number;
  embedding_model_id: number;
  language_model_id: number;
}

class ChatService {
  private http;

  constructor() {
    this.http = new HttpService(
      parserParameters(process.env.NEXT_PUBLIC_API_ENDPOINT!, "chat_retriever")
    );
  }

  async generateAIAnswerFromServer(payload: ChatRequestPayload): Promise<AIAnswerResponse> {
    return this.http.create({ ...payload, choice: payload.choice.toLowerCase() });
  }
}

const chatService = new ChatService();

export default chatService;
