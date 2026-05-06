import api from "../axios/axios.ts";
import type {Country} from "./types/Country.ts";

const CountryAPI = {

    // GET /api/countries
    getAll: async (): Promise<Country[]> => {
        const response = await api.get("/api/countries");
        return response.data;
    }
};

export default CountryAPI;