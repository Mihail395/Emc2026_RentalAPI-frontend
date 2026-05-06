import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";

const HomePage = () => {
    const {isAuthenticated, username} = useAuth();

    return (
        <Box sx={{textAlign: "center", mt: 8}}>
            <Typography variant="h3" gutterBottom>
                Welcome to Rental API
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
                {isAuthenticated
                    ? `Hello, ${username}! Browse our accommodations.`
                    : "Please login to browse accommodations."}
            </Typography>

            <Box sx={{display: "flex", gap: 2, justifyContent: "center", mt: 4}}>
                <Button variant="contained" component={Link} to="/accommodations">
                    View Accommodations
                </Button>
                <Button variant="outlined" component={Link} to="/hosts">
                    View Hosts
                </Button>
                <Button variant="outlined" component={Link} to="/countries">
                    View Countries
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;