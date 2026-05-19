import {useState, useEffect} from "react";
import type {Host, CreateHostRequest, UpdateHostRequest} from "../api/types/Host.ts";
import HostAPI from "../api/hostAPI.ts";

const useHosts = () => {
    const [hosts, setHosts] = useState<Host[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

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
    }, [refresh]);

    const triggerRefresh = () => setRefresh(prev => !prev);

    const createHost = async (request: CreateHostRequest) => {
        await HostAPI.create(request);
        triggerRefresh();
    };

    const updateHost = async (id: number, request: UpdateHostRequest) => {
        await HostAPI.update(id, request);
        triggerRefresh();
    };

    const deleteHost = async (id: number) => {
        await HostAPI.delete(id);
        triggerRefresh();
    };

    return {hosts, loading, error,
    createHost, updateHost, deleteHost};
};

export default useHosts;