import {Box, Typography} from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                // py = padding top and bottom
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                marginTop: "auto"
                // pushes footer to the bottom
            }}
        >
            <Typography variant="body2" color="text.secondary">
                Rental API © {new Date().getFullYear()}
            </Typography>
        </Box>
    );
};

export default Footer;