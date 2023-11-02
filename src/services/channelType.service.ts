const types = [
  { id: 1, type: "General" },
  { id: 2, type: "Finance" },
];

class ChannelTypeService {
  static GENERAL = 1;
  static FINANCE = 2;

  static get types() {
    return types;
  }

  static getId(type: string): number {
    const index = types.findIndex((i) => i.type === type);
    if (index < 0) return -1;
    return types[index].id;
  }

  static getType(id: number): string | null {
    const index = types.findIndex((i) => i.id === id);
    if (index < 0) return null;
    return types[index].type;
  }
}

export default ChannelTypeService;
