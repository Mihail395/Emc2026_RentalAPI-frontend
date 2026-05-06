import api from "../axios/axios.ts";
import type {AuthResponse, LoginRequest} from "./types/Auth.ts";

const AuthAPI = {

    // POST /api/auth/login
    login: async (request: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post("/api/auth/login", request);
        return response.data;
    },

    // POST /api/auth/register
    register: async (request: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post("/api/auth/register", request);
        return response.data;
    }
};

export default AuthAPI;