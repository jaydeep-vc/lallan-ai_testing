import * as serverAction from "./server-actions";
export type { UserDocument } from "./server-actions";
import * as storageActions from "./storage";

const userDocActions = { ...serverAction, ...storageActions };
export default userDocActions;
