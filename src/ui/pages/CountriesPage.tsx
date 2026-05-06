import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Alert
} from "@mui/material";
import useCountries from "../../hooks/useCountries.ts";

const CountriesPage = () => {
    const {countries, loading, error} = useCountries();

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
                Countries
            </Typography>

            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3
            }}>
                {countries.map((country) => (
                    <Box
                        key={country.id}
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
                                    {country.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Continent: {country.continent}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default CountriesPage;