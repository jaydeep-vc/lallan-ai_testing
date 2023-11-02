import * as serverActions from "./server-actions";
import * as clientActions from "./client-actions";
export type { Channel } from "./server-actions";

const channelActions = { ...serverActions, ...clientActions };

export default channelActions;
