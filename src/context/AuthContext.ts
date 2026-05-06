import {createContext} from "react";

export interface AuthContextType {
    token: string | null;
    username: string | null;
    role: string | null;
    login: (token: string, username: string, role: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;