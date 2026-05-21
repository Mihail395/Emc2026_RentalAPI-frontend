import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Typography
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useWishlistContext from "../../hooks/useWishlistContext.ts";

const WishlistPage = () => {
    const {wishlist, removeFromWishlist, clearWishlist} = useWishlistContext();

    return (
        <Box>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}>
                <Typography variant="h4">
                    My Wishlist
                </Typography>

                {/* Only show clear button if wishlist has items */}
                {wishlist.length > 0 && (
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={clearWishlist}
                    >
                        Clear Wishlist
                    </Button>
                )}
            </Box>

            {wishlist.length === 0 && (
                <Alert severity="info" icon={<FavoriteIcon/>}>
                    Your wishlist is empty. Browse accommodations and add your favorites!
                </Alert>
            )}

            <Box sx={{display: "flex", flexWrap: "wrap", gap: 3}}>
                {wishlist.map((accommodation) => (
                    <Box
                        key={accommodation.id}
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
                                    {accommodation.name}
                                </Typography>
                                <Chip
                                    label={accommodation.category}
                                    color="primary"
                                    size="small"
                                    sx={{mb: 1, mt: 1}}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Host: {accommodation.host?.name} {accommodation.host?.surname}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Country: {accommodation.host?.country?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total Rooms: {accommodation.numRooms}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Available Rooms: {accommodation.numRooms - accommodation.rentedRooms}
                                </Typography>
                                <Chip
                                    label={accommodation.condition}
                                    color={accommodation.condition === "GOOD" ? "success" : "error"}
                                    size="small"
                                    sx={{mt: 1}}
                                />
                            </CardContent>

                            <CardActions>
                                <Button
                                    size="small"
                                    color="error"
                                    startIcon={<FavoriteIcon/>}
                                    onClick={() => removeFromWishlist(accommodation.id)}
                                >
                                    Remove
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default WishlistPage;