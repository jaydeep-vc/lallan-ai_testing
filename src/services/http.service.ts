class HttpService {
  private _endpoint;

  constructor(endpoint: string) {
    this._endpoint = endpoint;
  }

  async fetchAll() {
    const response = await fetch(this._endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Unable to handle request. Please try again");

    return response.json();
  }

  async fetchById(id: string) {
    const url = this._endpoint + "/" + id;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Unable to handle request. Please try again");

    return response.json();
  }

  async fetchDocument(url: string): Promise<Blob> {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Invalid file url. Failed to load.");

    return response.blob();
  }

  async create<T>(payload: T): Promise<any> {
    const response = await fetch(this._endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Encoding": "deflate, gzip" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Unable to handle request. Please try again");

    return response.json();
  }
}

export default HttpService;
