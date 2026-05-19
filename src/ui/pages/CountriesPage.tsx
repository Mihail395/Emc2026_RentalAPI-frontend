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
import useCountries from "../../hooks/useCountries.ts";
import useAuth from "../../hooks/useAuth.ts";
import CountryDialog from "../components/CountryDialog.tsx";
import type {Country, CreateCountryRequest, UpdateCountryRequest} from "../../api/types/Country.ts";

const CountriesPage = () => {
    const {countries, loading, error, createCountry, updateCountry, deleteCountry} = useCountries();
    const {isAdmin} = useAuth();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const handleOpenCreate = () => {
        setSelectedCountry(null);
        setDialogOpen(true);
    };

    const handleOpenEdit = (country: Country) => {
        setSelectedCountry(country);
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setSelectedCountry(null);
    };

    const handleSubmit = async (data: CreateCountryRequest | UpdateCountryRequest) => {
        if (selectedCountry) {
            await updateCountry(selectedCountry.id, data as UpdateCountryRequest);
        } else {
            await createCountry(data as CreateCountryRequest);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this country?")) {
            await deleteCountry(id);
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
                <Typography variant="h4">Countries</Typography>
                {isAdmin && (
                    <Button variant="contained" onClick={handleOpenCreate}>
                        Add Country
                    </Button>
                )}
            </Box>

            {countries.length === 0 && (
                <Alert severity="info">No countries found.</Alert>
            )}

            <Box sx={{display: "flex", flexWrap: "wrap", gap: 3}}>
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
                        <Card sx={{height: "100%", display: "flex", flexDirection: "column"}}>
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="h6">
                                    {country.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Continent: {country.continent}
                                </Typography>
                            </CardContent>

                            {isAdmin && (
                                <CardActions>
                                    <Button size="small" onClick={() => handleOpenEdit(country)}>
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(country.id)}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Box>
                ))}
            </Box>

            <CountryDialog
                open={dialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                country={selectedCountry}
            />
        </Box>
    );
};

export default CountriesPage;