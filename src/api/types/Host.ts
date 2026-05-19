import type {Country} from "./Country.ts";

export interface Host {
    id: number;
    name: string;
    surname: string;
    createdAt: string;
    updatedAt: string;
    country: Country;
}

export interface CreateHostRequest {
    name: string;
    surname: string;
    countryId: number;
}

export interface UpdateHostRequest {
    name: string;
    surname: string;
    countryId: number;
}