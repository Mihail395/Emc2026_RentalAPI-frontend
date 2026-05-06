import  {useState} from "react";
import type {ReactNode} from "react";
import AuthContext from "../context/AuthContext.ts";

interface AuthProviderProps {
    children: ReactNode;
}

// The Provider component — wraps the whole app and provides the auth state
// to every component inside it
const AuthProvider = ({children}: AuthProviderProps) => {

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [username, setUsername] = useState<string | null>(
        localStorage.getItem("username")
    );
    const [role, setRole] = useState<string | null>(
        localStorage.getItem("role")
    );

    const login = (newToken: string, newUsername: string, newRole: string) => {
        setToken(newToken);
        setUsername(newUsername);
        setRole(newRole);
        localStorage.setItem("token", newToken);
        localStorage.setItem("username", newUsername);
        localStorage.setItem("role", newRole);
    };

    const logout = () => {
        setToken(null);
        setUsername(null);
        setRole(null);
        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
    };

    return (
        // Provide the values to all children components
        <AuthContext.Provider value={{
            token,
            username,
            role,
            login,
            logout,
            isAuthenticated: token !== null
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;