import {useState, useEffect} from "react";
import type {Host} from "../api/types/Host.ts";
import HostAPI from "../api/hostAPI.ts";

const useHosts = () => {
    const [hosts, setHosts] = useState<Host[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHosts = async () => {
            try {
                setLoading(true);
                const data = await HostAPI.getAll();
                setHosts(data);
            } catch (err) {
                setError("Failed to fetch hosts");
            } finally {
                setLoading(false);
            }
        };

        fetchHosts();
    }, []);

    return {hosts, loading, error};
};

export default useHosts;