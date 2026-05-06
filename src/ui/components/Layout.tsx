import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Box} from "@mui/material";

const Layout = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
        }}>
            <Header/>

            {/* Main content area */}
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Outlet/>
            </Box>

            <Footer/>
        </Box>
    );
};

export default Layout;