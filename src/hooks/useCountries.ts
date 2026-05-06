import {useState, useEffect} from "react";
import type {Country} from "../api/types/Country.ts";
import CountryAPI from "../api/countryAPI.ts";

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
    }, []);

    return {countries, loading, error};
};

export default useCountries;