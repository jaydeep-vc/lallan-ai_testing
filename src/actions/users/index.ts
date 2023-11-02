import * as serverActions from "./server-actions";
import * as authActions from "./auth-actions";
import * as serverAuthActions from "./server-auth-actions";

export type { Profile } from "./server-actions";
export type { User } from "./auth-actions";

const userActions = { ...serverActions, ...authActions, ...serverAuthActions };

export default userActions;
