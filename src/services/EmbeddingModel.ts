const models = [
  { id: 1, name: "OpenAI Embedding" },
  // { id: 2, name: "Custom Embedding" },
];

class EmbeddingModel {
  static OpenAI_Embedding = 1;
  static Custom_Embedding = 2;

  static allModels() {
    return models;
  }

  static getId(name: string): number {
    const ind = models.findIndex((i) => i.name === name);

    if (ind > -1) return models[ind].id;

    return -1;
  }

  static getName(id: number): string {
    const ind = models.findIndex((i) => i.id === id);
    if (ind > -1) return models[ind].name;
    return "";
  }
}

export default EmbeddingModel;
