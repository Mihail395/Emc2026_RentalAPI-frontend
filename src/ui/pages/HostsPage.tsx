import {useState} from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Typography
} from "@mui/material";
import useHosts from "../../hooks/useHosts.ts";
import useCountries from "../../hooks/useCountries.ts";
import useAuth from "../../hooks/useAuth.ts";
import HostDialog from "../components/HostDialog.tsx";
import type {Host, CreateHostRequest, UpdateHostRequest} from "../../api/types/Host.ts";

const HostsPage = () => {
    const {hosts, loading, error, createHost, updateHost, deleteHost} = useHosts();
    const {countries} = useCountries();
    const {isAdmin} = useAuth();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedHost, setSelectedHost] = useState<Host | null>(null);

    const handleOpenCreate = () => {
        setSelectedHost(null);
        setDialogOpen(true);
    };

    const handleOpenEdit = (host: Host) => {
        setSelectedHost(host);
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setSelectedHost(null);
    };

    const handleSubmit = async (data: CreateHostRequest | UpdateHostRequest) => {
        if (selectedHost) {
            await updateHost(selectedHost.id, data as UpdateHostRequest);
        } else {
            await createHost(data as CreateHostRequest);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this host?")) {
            await deleteHost(id);
        }
    };

    if (loading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}>
                <Typography variant="h4">Hosts</Typography>
                {isAdmin && (
                    <Button variant="contained" onClick={handleOpenCreate}>
                        Add Host
                    </Button>
                )}
            </Box>

            {hosts.length === 0 && (
                <Alert severity="info">No hosts found.</Alert>
            )}

            <Box sx={{display: "flex", flexWrap: "wrap", gap: 3}}>
                {hosts.map((host) => (
                    <Box
                        key={host.id}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "calc(50% - 12px)",
                                md: "calc(33.33% - 16px)"
                            }
                        }}
                    >
                        <Card sx={{height: "100%", display: "flex", flexDirection: "column"}}>
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="h6">
                                    {host.name} {host.surname}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Country: {host.country?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Continent: {host.country?.continent}
                                </Typography>
                            </CardContent>

                            {isAdmin && (
                                <CardActions>
                                    <Button size="small" onClick={() => handleOpenEdit(host)}>
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(host.id)}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Box>
                ))}
            </Box>

            <HostDialog
                open={dialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                host={selectedHost}
                countries={countries}
            />
        </Box>
    );
};

export default HostsPage;