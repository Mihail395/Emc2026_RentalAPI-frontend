export interface Country {
    id: number;
    name: string;
    continent: string;
}

export interface CreateCountryRequest {
    name: string;
    continent: string;
}

export interface UpdateCountryRequest {
    name: string;
    continent: string;
}