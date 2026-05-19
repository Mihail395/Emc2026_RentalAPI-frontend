import api from "../axios/axios.ts";
import type {Country, CreateCountryRequest, UpdateCountryRequest} from "./types/Country.ts";

const CountryAPI = {

    // GET /api/countries
    getAll: async (): Promise<Country[]> => {
        const response = await api.get("/api/countries");
        return response.data;
    },

    create: async (request: CreateCountryRequest): Promise<Country> => {
        const response = await api.post("/api/countries/add", request);
        return response.data;
    },

    update: async (id: number, request: UpdateCountryRequest): Promise<Country> => {
        const response = await api.put(`/api/countries/${id}/edit`, request);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/api/countries/${id}/delete`);
    }
};

export default CountryAPI;