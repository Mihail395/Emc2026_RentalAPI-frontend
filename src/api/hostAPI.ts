import api from "../axios/axios.ts";
import type {UpdateHostRequest, CreateHostRequest, Host} from "./types/Host.ts";

const HostAPI = {

    // GET /api/hosts
    getAll: async (): Promise<Host[]> => {
        const response = await api.get("/api/hosts");
        return response.data;
    },

    // GET /api/hosts/:id
    getById: async (id: number): Promise<Host> => {
        const response = await api.get(`/api/hosts/${id}`);
        return response.data;
    },

    create: async (request: CreateHostRequest): Promise<Host> => {
        const response = await api.post("/api/hosts/add", request);
        return response.data;
    },

    update: async (id: number, request: UpdateHostRequest): Promise<Host> => {
        const response = await api.put(`/api/hosts/${id}/edit`, request);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/api/hosts/${id}/delete`);
    }
};

export default HostAPI;