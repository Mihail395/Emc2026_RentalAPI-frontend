import {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Alert,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";
import {useNavigate, Link} from "react-router-dom";
import type {RegisterRequest} from "../../api/types/Auth.ts";
import useAuth from "../../hooks/useAuth.ts";
import AuthAPI from "../../api/authAPI.ts";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("ROLE_USER");
    // role defaults to ROLE_USER
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {login} = useAuth();

    const handleRegister = async () => {
        try {
            setLoading(true);
            setError(null);
            const request: RegisterRequest = {username, password, role};
            const response = await AuthAPI.register(request);
            // after successful registration instantly login and redirect to the home page
            login(response.token, response.username, response.role);
            navigate("/");
        } catch (err) {
            setError("Registration failed. Username may already exist.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh"
        }}>
            <Card sx={{width: 400, p: 2}}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{mb: 2}}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        label="Username"
                        fullWidth
                        sx={{mb: 2}}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        sx={{mb: 2}}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Role selector — dropdown menu */}
                    <FormControl fullWidth sx={{mb: 2}}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={role}
                            label="Role"
                            onChange={(e) => setRole(e.target.value)}
                            // Select is MUI's dropdown component
                            // each MenuItem is one option
                        >
                            <MenuItem value="ROLE_USER">User</MenuItem>
                            <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleRegister}
                        disabled={loading}
                        sx={{mb: 2}}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>

                    {/* Link to login page */}
                    <Typography variant="body2" sx={{textAlign: "center"}}>
                        Already have an account?{" "}
                        <Link to="/login">Login here</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RegisterPage;