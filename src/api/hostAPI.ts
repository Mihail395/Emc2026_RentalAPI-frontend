import api from "../axios/axios.ts";
import type {Host} from "./types/Host.ts";

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
    }
};

export default HostAPI;