import type { Message } from "ai/react";

interface IEmbeddingResponse {
  code: number;
  message: string;
}

export interface IMessagesWithUserReplay {
  id: number | string;
  content: string;
  role: "user" | "assistant";
}

class ChatterService {
  /**
   * Generate embedding and store in the database
   *
   * @param file_url should be the pdf file url to store the embedding of the file
   * @param channel_id pass if you want to store on a particular channel only
   * @returns on success just message
   */
  async generateAndStoreEmbedding(
    file_url: string,
    channel_id?: string
  ): Promise<IEmbeddingResponse> {
    try {
      const payload = { file_url, channel_id };
      const response = await fetch("/api/embedding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  /**
   *  Make converstaion with the Lallan.AI
   *
   * @param messages previous message for contextual data retriving
   * @param owner owner can be the channel id or admin
   * @returns
   */
  async chatWithAI(messages: Message[], owner?: string) {
    return await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner: owner ?? "admin",
        messages: messages,
        show_intermediate_steps: true,
      }),
    });
  }
}

const chatterService = new ChatterService();
export default chatterService;
