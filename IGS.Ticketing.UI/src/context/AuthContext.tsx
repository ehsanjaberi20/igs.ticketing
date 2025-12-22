import React, {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import type {IAuthContext, IProfile} from "@/interface";
import {getProfile, login, logout} from "../api/auth.ts";
import {Utils} from "../components/Utils.tsx";
import type {IApiError} from "@/api/api.ts";


const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const profile = await getProfile();
                setUser(profile);
            } catch(error) {
                if((error as IApiError).status !== 401)
                    Utils.notify((error as IApiError).message, 'error');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const loginUser = async (username: string, password: string) => {
        await login(username, password);
        const profile = await getProfile();
        setUser(profile);
    };

    const logoutUser = async () => {
        await logout();
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};