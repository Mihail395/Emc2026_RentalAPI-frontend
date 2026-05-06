import {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Alert
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";
import AuthAPI from "../../api/authAPI.ts";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await AuthAPI.login({username, password});
            // Save token and user info to context + localStorage
            login(response.token, response.username, response.role);
            // Redirect to home after login
            navigate("/");
        } catch (err) {
            setError("Invalid username or password");
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
                        Login
                    </Typography>

                    {/* Show error if login failed */}
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
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;