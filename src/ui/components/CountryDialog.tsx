import {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import type {Country, CreateCountryRequest, UpdateCountryRequest} from "../../api/types/Country.ts";

interface CountryDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCountryRequest | UpdateCountryRequest) => void;
    country?: Country | null;
}

const CountryDialog = ({open, onClose, onSubmit, country}: CountryDialogProps) => {

    const [name, setName] = useState("");
    const [continent, setContinent] = useState("");

    useEffect(() => {
        if (country) {
            setName(country.name);
            setContinent(country.continent);
        } else {
            setName("");
            setContinent("");
        }
    }, [country, open]);

    const handleSubmit = () => {
        onSubmit({name, continent});
        onClose();
    };

    const isEditMode = country !== null && country !== undefined;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {isEditMode ? "Edit Country" : "Add Country"}
            </DialogTitle>

            <DialogContent sx={{display: "flex", flexDirection: "column", gap: 2, pt: 2}}>
                <TextField
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    label="Continent"
                    fullWidth
                    value={continent}
                    onChange={(e) => setContinent(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    {isEditMode ? "Update" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CountryDialog;