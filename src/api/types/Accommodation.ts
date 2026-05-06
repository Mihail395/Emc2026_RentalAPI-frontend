// Mirrors AccommodationSummaryDto.java from the backend
export interface Accommodation {
    id: number;
    name: string;
    category: string;
    condition: string;
    numRooms: number;
    rentedRooms: number;
    availableRooms: number;
    hostFullName: string;
    hostCountry: string;
}

// Mirrors CreateAccommodationRequest.java
export interface CreateAccommodationRequest {
    name: string;
    category: string;
    hostId: number;
    numRooms: number;
}