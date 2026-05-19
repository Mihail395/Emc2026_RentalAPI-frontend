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
import type {
    Accommodation,
    CreateAccommodationRequest,
    UpdateAccommodationRequest
} from "../../api/types/Accommodation.ts";
import type {Host} from "../../api/types/Host.ts";

interface AccommodationDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateAccommodationRequest | UpdateAccommodationRequest) => void;
    accommodation?: Accommodation | null;
    hosts: Host[];
}

const CATEGORIES = ["ROOM", "HOUSE", "FLAT", "APARTMENT", "HOTEL", "MOTEL"];
const CONDITIONS = ["GOOD", "BAD"];

const AccommodationDialog = ({
                                 open,
                                 onClose,
                                 onSubmit,
                                 accommodation,
                                 hosts
                             }: AccommodationDialogProps) => {

    const defaultHostId = accommodation?.host.id ?? hosts[0]?.id ?? 0;

    const [name, setName] = useState(accommodation?.name ?? "");
    const [category, setCategory] = useState(accommodation?.category ?? "FLAT");
    const [condition, setCondition] = useState(accommodation?.condition ?? "GOOD");
    const [hostId, setHostId] = useState<number>(defaultHostId);
    const [numRooms, setNumRooms] = useState<number>(accommodation?.numRooms ?? 1);

    useEffect(() => {
        if (open) {
            setName(accommodation?.name ?? "");
            setCategory(accommodation?.category ?? "FLAT");
            setCondition(accommodation?.condition ?? "GOOD");
            setHostId(accommodation?.host.id ?? hosts[0]?.id ?? 0);
            setNumRooms(accommodation?.numRooms ?? 1);
        }
    }, [open]);

    const isEditMode = accommodation !== null && accommodation !== undefined;

    const handleSubmit = () => {
        if (isEditMode) {
            onSubmit({name, category, condition, hostId, numRooms});
        } else {
            onSubmit({name, category, hostId, numRooms});
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {isEditMode ? "Edit Accommodation" : "Add Accommodation"}
            </DialogTitle>

            <DialogContent sx={{display: "flex", flexDirection: "column", gap: 2, pt: 2}}>

                <TextField
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {CATEGORIES.map((cat) => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {isEditMode && (
                    <FormControl fullWidth>
                        <InputLabel>Condition</InputLabel>
                        <Select
                            value={condition}
                            label="Condition"
                            onChange={(e) => setCondition(e.target.value)}
                        >
                            {CONDITIONS.map((cond) => (
                                <MenuItem key={cond} value={cond}>{cond}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                <FormControl fullWidth>
                    <InputLabel>Host</InputLabel>
                    <Select
                        value={hostId}
                        label="Host"
                        onChange={(e) => setHostId(Number(e.target.value))}
                    >
                        {hosts.map((host) => (
                            <MenuItem key={host.id} value={host.id}>
                                {host.name} {host.surname}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Number of Rooms"
                    type="number"
                    fullWidth
                    value={numRooms}
                    onChange={(e) => setNumRooms(Number(e.target.value))}
                    slotProps={{htmlInput: {min: 1}}}
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

export default AccommodationDialog;