import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Alert,
    Chip,
    Button,
    ButtonGroup
} from "@mui/material";
import useAccommodations from "../../hooks/useAccommodations.ts";

const AccommodationsPage = () => {
    const {accommodations, loading, error, condition, setCondition} = useAccommodations();

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
                Accommodations
            </Typography>

            {/* Filter buttons */}
            <Box sx={{mb: 3}}>
                <Typography variant="body1" sx={{mb: 1}}>
                    Filter by condition:
                </Typography>
                <ButtonGroup variant="outlined">
                    <Button
                        variant={condition === null ? "contained" : "outlined"}
                        onClick={() => setCondition(null)}
                        // contained = active/selected style
                        // outlined = inactive style
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

            {/* Show message if no results */}
            {accommodations.length === 0 && (
                <Alert severity="info">
                    No accommodations found for the selected condition.
                </Alert>
            )}

            {/* flexWrap wraps cards to next line when they don't fit */}
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3
            }}>
                {accommodations.map((accommodation) => (
                    <Box
                        key={accommodation.id}
                        sx={{
                            width: {
                                xs: "100%",      // full width on mobile
                                sm: "calc(50% - 12px)",   // 2 columns on tablet
                                md: "calc(33.33% - 16px)" // 3 columns on desktop
                            }
                        }}
                    >
                        <Card sx={{height: "100%"}}>
                            <CardContent>
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
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AccommodationsPage;