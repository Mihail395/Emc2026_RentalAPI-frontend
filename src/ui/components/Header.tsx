import {AppBar, Toolbar, Typography, Button, Box, IconButton, Badge} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useWishlistContext from "../../hooks/useWishlistContext.ts";

const Header = () => {
    const {isAuthenticated, username, logout} = useAuth();
    const navigate = useNavigate();
    const {wishlist} = useWishlistContext();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Rental API
                </Typography>

                <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
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

                    {isAuthenticated && (
                        <IconButton
                            color="inherit"
                            component={Link}
                            to="/wishlist"
                        >
                            <Badge
                                badgeContent={wishlist.length}
                                color="error"
                            >
                                <FavoriteIcon/>
                            </Badge>
                        </IconButton>
                    )}

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