import HttpService from "./http.service";

interface IEmbeddingResponse {
  code: number;
  message: string;
}

class EmbeddingService {
  private http;

  constructor() {
    this.http = new HttpService("/api/embedding");
  }

  async generateAndStoreEmbedding(
    file_url: string,
    channel_id?: string
  ): Promise<IEmbeddingResponse> {
    return this.http.create({ file_url, channel_id });
  }
}

const embeddingService = new EmbeddingService();
export default embeddingService;
