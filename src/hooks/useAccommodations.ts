import {useState, useEffect} from "react";
import type {Accommodation} from "../api/types/Accommodation.ts";
import AccommodationAPI from "../api/accommodationAPI.ts";

// It fetches accommodations and returns them with loading and error state
const useAccommodations = () => {

    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                setLoading(true);
                const data = await AccommodationAPI.getAll();
                setAccommodations(data);
            } catch (err) {
                setError("Failed to fetch accommodations");
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodations();
    }, []);
    return {accommodations, loading, error};
};

export default useAccommodations;