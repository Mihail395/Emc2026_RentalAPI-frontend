import api from "../axios/axios.ts";
import type {Accommodation, CreateAccommodationRequest, UpdateAccommodationRequest} from "./types/Accommodation.ts";
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
    },

    getByCondition: async (condition: string | null): Promise<Accommodation[]> => {
        const response = await api.get("/api/accommodations/filter-by-condition", {
            params: condition ? {condition} : {}
        });
        return response.data;
    },

    create: async (request: CreateAccommodationRequest): Promise<Accommodation> => {
        const response = await api.post("/api/accommodations/add", request);
        return response.data;
    },

    update: async (id: number, request: UpdateAccommodationRequest): Promise<Accommodation> => {
        const response = await api.put(`/api/accommodations/${id}/edit`, request);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/api/accommodations/${id}/delete`);
    },

    rentRooms: async (id: number, numRooms: number): Promise<Accommodation> => {
        const response = await api.patch(`/api/accommodations/${id}/rent`, {numRooms});
        return response.data;
    },

    freeRooms: async (id: number, numRooms: number): Promise<Accommodation> => {
        const response = await api.patch(`/api/accommodations/${id}/free`, {numRooms});
        return response.data;
    }
};

export default AccommodationAPI;