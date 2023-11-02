export type ChatType = "Global" | "Self" | "Mixed";

type Conversation = {
  type: ChatType;
  value: number;
};

class ConversationType {
  static SELF: number = 1;
  static GLOBAL: number = 2;
  static MIXED: number = 3;
  static _values: Conversation[] = [
    { type: "Global", value: this.GLOBAL },
    { type: "Self", value: this.SELF },
    { type: "Mixed", value: this.MIXED },
  ];

  static _getValue(type: string): number {
    return this._values.filter((v) => v.type === type)[0].value;
  }

  static _getType(number: number): ChatType {
    return this._values.filter((v) => v.value === number)[0].type;
  }
}

export default ConversationType;
