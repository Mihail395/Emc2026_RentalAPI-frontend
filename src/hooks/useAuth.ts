import {useContext} from "react";
import AuthContext from "../context/AuthContext.ts";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const isAdmin = context.role === "ROLE_ADMIN";

    const isUser = context.role === "ROLE_USER";

    return {
        ...context,
        isAdmin,
        isUser
    };
};

export default useAuth;