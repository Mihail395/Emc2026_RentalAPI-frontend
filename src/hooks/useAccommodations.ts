import {useState, useEffect} from "react";
import type {Accommodation, CreateAccommodationRequest, UpdateAccommodationRequest} from "../api/types/Accommodation.ts";
import AccommodationAPI from "../api/accommodationAPI.ts";

// It fetches accommodations and returns them with loading and error state
const useAccommodations = () => {

    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [condition, setCondition] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                setLoading(true);
                const data = await AccommodationAPI.getByCondition(condition);
                setAccommodations(data);
            } catch (err) {
                setError("Failed to fetch accommodations");
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodations();
    }, [condition, refresh]);

    const triggerRefresh = () => setRefresh(prev => !prev);

    const createAccommodation = async (request: CreateAccommodationRequest) => {
        await AccommodationAPI.create(request);
        triggerRefresh();
    };

    const updateAccommodation = async (id: number, request: UpdateAccommodationRequest) => {
        await AccommodationAPI.update(id, request);
        triggerRefresh();
    };

    const deleteAccommodation = async (id: number) => {
        await AccommodationAPI.delete(id);
        triggerRefresh();
    };

    return {accommodations, loading, error, condition, setCondition,
        createAccommodation, updateAccommodation, deleteAccommodation};
};

export default useAccommodations;