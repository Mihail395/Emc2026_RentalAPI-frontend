import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Layout from "./ui/components/Layout.tsx";
import HomePage from "./ui/pages/HomePage.tsx";
import AccommodationsPage from "./ui/pages/AccommodationsPage.tsx";
import HostsPage from "./ui/pages/HostsPage.tsx";
import CountriesPage from "./ui/pages/CountriesPage.tsx";
import LoginPage from "./ui/pages/LoginPage.tsx";
import ProtectedRoute from "./ui/components/ProtectedRoute.tsx";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>

            {/* Public routes — anyone can access */}
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/" element={<HomePage/>}/>

            {/* Protected routes — must be logged in */}
            <Route element={<ProtectedRoute/>}>
              <Route path="/accommodations" element={<AccommodationsPage/>}/>
              <Route path="/hosts" element={<HostsPage/>}/>
              <Route path="/countries" element={<CountriesPage/>}/>
            </Route>

            {/* Redirect unknown URLs to home */}
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;