import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Alert
} from "@mui/material";
import useHosts from "../../hooks/useHosts.ts";

const HostsPage = () => {
    const {hosts, loading, error} = useHosts();

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
            <Typography variant="h4" gutterBottom>
                Hosts
            </Typography>

            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3
            }}>
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
                        <Card sx={{height: "100%"}}>
                            <CardContent>
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
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default HostsPage;