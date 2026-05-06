import {Navigate, Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth();

    // If not logged in redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    // If logged in render the page
    return <Outlet/>;
};

export default ProtectedRoute;