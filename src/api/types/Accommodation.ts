import type {Host} from "./Host.ts";

// Mirrors AccommodationSummaryDto.java from the backend
export interface Accommodation {
    id: number;
    name: string;
    category: string;
    condition: string;
    host: Host;
    numRooms: number;
    rentedRooms: number;
}

export interface CreateAccommodationRequest {
    name: string;
    category: string;
    hostId: number;
    numRooms: number;
}

export interface UpdateAccommodationRequest {
    name: string;
    category: string;
    condition: string;
    hostId: number;
    numRooms: number;
}