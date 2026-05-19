import {useState} from "react";
import {
    Alert,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Chip,
    CircularProgress,
    Typography
} from "@mui/material";
import useAccommodations from "../../hooks/useAccommodations.ts";
import useHosts from "../../hooks/useHosts.ts";
import useAuth from "../../hooks/useAuth.ts";
import AccommodationDialog from "../components/AccommodationDialog.tsx";
import type {Accommodation, CreateAccommodationRequest, UpdateAccommodationRequest} from "../../api/types/Accommodation.ts";

const AccommodationsPage = () => {
    const {accommodations, loading, error, condition, setCondition, createAccommodation, updateAccommodation, deleteAccommodation} = useAccommodations();
    const {hosts} = useHosts();

    const {isAdmin} = useAuth();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);


    const handleOpenCreate = () => {
        setSelectedAccommodation(null);
        setDialogOpen(true);
    };

    const handleOpenEdit = (accommodation: Accommodation) => {
        setSelectedAccommodation(accommodation);
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setSelectedAccommodation(null);
    };

    const handleSubmit = async (data: CreateAccommodationRequest | UpdateAccommodationRequest) => {
        if (selectedAccommodation) {
            await updateAccommodation(selectedAccommodation.id, data as UpdateAccommodationRequest);
        } else {
            await createAccommodation(data as CreateAccommodationRequest);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this accommodation?")) {
            await deleteAccommodation(id);
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
                <Typography variant="h4">
                    Accommodations
                </Typography>

                {/* Only show Add button if user is ADMIN */}
                {isAdmin && (
                    <Button variant="contained" onClick={handleOpenCreate}>
                        Add Accommodation
                    </Button>
                )}
            </Box>

            {/* Filter buttons */}
            <Box sx={{mb: 3}}>
                <Typography variant="body1" sx={{mb: 1}}>
                    Filter by condition:
                </Typography>
                <ButtonGroup variant="outlined">
                    <Button
                        variant={condition === null ? "contained" : "outlined"}
                        onClick={() => setCondition(null)}
                    >
                        All
                    </Button>
                    <Button
                        variant={condition === "GOOD" ? "contained" : "outlined"}
                        color="success"
                        onClick={() => setCondition("GOOD")}
                    >
                        Good
                    </Button>
                    <Button
                        variant={condition === "BAD" ? "contained" : "outlined"}
                        color="error"
                        onClick={() => setCondition("BAD")}
                    >
                        Bad
                    </Button>
                </ButtonGroup>
            </Box>

            {accommodations.length === 0 && (
                <Alert severity="info">No accommodations found.</Alert>
            )}

            <Box sx={{display: "flex", flexWrap: "wrap", gap: 3}}>
                {accommodations.map((accommodation) => (
                    <Box
                        key={accommodation.id}
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
                                    {accommodation.name}
                                </Typography>
                                <Chip
                                    label={accommodation.category}
                                    color="primary"
                                    size="small"
                                    sx={{mb: 1, mt: 1}}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Host: {accommodation.host?.name} {accommodation.host?.surname}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Country: {accommodation.host?.country?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total Rooms: {accommodation.numRooms}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rented Rooms: {accommodation.rentedRooms}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Available Rooms: {accommodation.numRooms - accommodation.rentedRooms}
                                </Typography>
                                <Chip
                                    label={accommodation.condition}
                                    color={accommodation.condition === "GOOD" ? "success" : "error"}
                                    size="small"
                                    sx={{mt: 1}}
                                />
                            </CardContent>

                            {isAdmin && (
                                <CardActions>
                                    <Button
                                        size="small"
                                        onClick={() => handleOpenEdit(accommodation)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(accommodation.id)}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Box>
                ))}
            </Box>

            <AccommodationDialog
                open={dialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                accommodation={selectedAccommodation}
                hosts={hosts}
            />
        </Box>
    );
};

export default AccommodationsPage;