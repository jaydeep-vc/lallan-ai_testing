class DocumentLoaderService {
  async loadDocumentFromURL(url: string): Promise<Blob> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Invalid file url. Failed to load.");

      const doc = await response.blob();
      return doc;
    } catch (error: any) {
      throw error;
    }
  }
}

const documentLoader = new DocumentLoaderService();

export default documentLoader;
