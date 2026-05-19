import {AppBar, Toolbar, Typography, Button, Box} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";

const Header = () => {
    const {isAuthenticated, username, logout} = useAuth();
    // useNavigate lets us redirect programmatically
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        // AppBar is MUI's top navigation bar component
        <AppBar position="static">
            <Toolbar>
                {/* App title on the left */}
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Rental API
                </Typography>

                {/* Navigation links */}
                <Box sx={{display: "flex", gap: 2}}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/accommodations">
                        Accommodations
                    </Button>
                    <Button color="inherit" component={Link} to="/hosts">
                        Hosts
                    </Button>
                    <Button color="inherit" component={Link} to="/countries">
                        Countries
                    </Button>

                    {/* Show username and logout if logged in
                        Show login button if not logged in */}
                    {isAuthenticated ? (
                        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                            <Typography variant="body2">{username}</Typography>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{display: "flex", gap: 1}}>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;