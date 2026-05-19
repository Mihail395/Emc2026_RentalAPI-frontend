import {useState, useEffect} from "react";
import type {Country, CreateCountryRequest, UpdateCountryRequest} from "../api/types/Country.ts";
import CountryAPI from "../api/countryAPI.ts";

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                const data = await CountryAPI.getAll();
                setCountries(data);
            } catch (err) {
                setError("Failed to fetch countries");
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, [refresh]);

    const triggerRefresh = () => setRefresh(prev => !prev);

    const createCountry = async (request: CreateCountryRequest) => {
        await CountryAPI.create(request);
        triggerRefresh();
    };

    const updateCountry = async (id: number, request: UpdateCountryRequest) => {
        await CountryAPI.update(id, request);
        triggerRefresh();
    };

    const deleteCountry = async (id: number) => {
        await CountryAPI.delete(id);
        triggerRefresh();
    };

    return {countries, loading, error,
    createCountry, updateCountry, deleteCountry};
};

export default useCountries;