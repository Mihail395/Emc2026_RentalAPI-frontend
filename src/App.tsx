import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./ui/components/Layout.tsx";
import HomePage from "./ui/pages/HomePage.tsx";
import AccommodationsPage from "./ui/pages/AccommodationsPage.tsx";
import HostsPage from "./ui/pages/HostsPage.tsx";
import CountriesPage from "./ui/pages/CountriesPage.tsx";
import LoginPage from "./ui/pages/LoginPage.tsx";
import RegisterPage from "./ui/pages/RegisterPage.tsx";
import ProtectedRoute from "./ui/components/ProtectedRoute.tsx";
import WishlistPage from "./ui/pages/WishlistPage.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>

                    {/* Public routes — anyone can access */}
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>

                    {/* Protected routes — must be logged in */}
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/accommodations" element={<AccommodationsPage/>}/>
                        <Route path="/hosts" element={<HostsPage/>}/>
                        <Route path="/countries" element={<CountriesPage/>}/>
                        <Route path="/wishlist" element={<WishlistPage/>}/>
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;