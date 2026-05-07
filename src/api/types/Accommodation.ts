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

// Mirrors CreateAccommodationRequest.java
export interface CreateAccommodationRequest {
    name: string;
    category: string;
    hostId: number;
    numRooms: number;
}