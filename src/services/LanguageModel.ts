const models = [
  { id: 1, name: "OpenAI Model" },
  { id: 2, name: "Google Model" },
];

class LanguageModel {
  static OpenAI_Model = 1;
  static Google_Model = 2;

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

export default LanguageModel;
