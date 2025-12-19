import type {ILoginResponse} from "../interface/ILoginResponse.ts";
import type {IProfile} from "../interface";
import {API} from "./api.ts";


export const login = async (username: string, password: string): Promise<ILoginResponse> => {
    const response = await API.post<ILoginResponse>("/auth/login", {username, password});
    return response.data;
};


export const getProfile = async (): Promise<IProfile> => {
    const response = await API.post<IProfile>("/auth/profile");
    return response.data;
};

export const logout = async (): Promise<void> => {
    await API.post("/auth/logout");
};