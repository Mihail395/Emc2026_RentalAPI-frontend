import {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import type {Host, CreateHostRequest, UpdateHostRequest} from "../../api/types/Host.ts";
import type {Country} from "../../api/types/Country.ts";

interface HostDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateHostRequest | UpdateHostRequest) => void;
    host?: Host | null;
    countries: Country[];
}

const HostDialog = ({open, onClose, onSubmit, host, countries}: HostDialogProps) => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [countryId, setCountryId] = useState<number>(0);

    useEffect(() => {
        if (host) {
            setName(host.name);
            setSurname(host.surname);
            setCountryId(host.country.id);
        } else {
            setName("");
            setSurname("");
            setCountryId(countries[0]?.id || 0);
        }
    }, [host, open]);

    const handleSubmit = () => {
        onSubmit({name, surname, countryId});
        onClose();
    };

    const isEditMode = host !== null && host !== undefined;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {isEditMode ? "Edit Host" : "Add Host"}
            </DialogTitle>

            <DialogContent sx={{display: "flex", flexDirection: "column", gap: 2, pt: 2}}>
                <TextField
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    label="Surname"
                    fullWidth
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />

                <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                        value={countryId}
                        label="Country"
                        onChange={(e) => setCountryId(Number(e.target.value))}
                    >
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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

export default HostDialog;