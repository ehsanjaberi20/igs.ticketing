import type {IProfile} from "./IProfile.ts";

export interface IAuthContext {
    user: IProfile | null;
    loginUser: (username: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
    loading: boolean;
}