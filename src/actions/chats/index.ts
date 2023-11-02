import * as serverActions from "./server-actions";
import * as clientActions from "./client-actions";
export type { Conversation } from "./server-actions";

const chatActions = { ...serverActions, ...clientActions };

export default chatActions;
