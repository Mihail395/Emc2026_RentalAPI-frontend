import type {Country} from "./Country.ts";

export interface Host {
    id: number;
    name: string;
    surname: string;
    createdAt: string;
    updatedAt: string;
    country: Country;
}