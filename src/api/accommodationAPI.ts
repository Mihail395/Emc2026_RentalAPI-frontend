import api from "../axios/axios.ts";
import type {Accommodation} from "./types/Accommodation.ts";
import type {Page} from "./types/Page.ts";

// Repository pattern — each function maps to one backend endpoint
const AccommodationAPI = {

    // GET /api/accommodations
    getAll: async (): Promise<Accommodation[]> => {
        const response = await api.get("/api/accommodations");
        return response.data;
    },

    // GET /api/accommodations/:id
    getById: async (id: number): Promise<Accommodation> => {
        const response = await api.get(`/api/accommodations/${id}`);
        return response.data;
    },

    // GET /api/accommodations/filter
    getFiltered: async (params: {
        category?: string;
        hostId?: number;
        countryId?: number;
        minRooms?: number;
        hasAvailableRooms?: boolean;
        page?: number;
        size?: number;
    }): Promise<Page<Accommodation>> => {
        const response = await api.get("/api/accommodations/filter", { params });
        return response.data;
    }
};

export default AccommodationAPI;