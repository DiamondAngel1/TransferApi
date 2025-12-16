import type {IUserTokenInfo} from "./IUserTokenInfo.ts";

export interface IAuthState {
    user: IUserTokenInfo|null;
}