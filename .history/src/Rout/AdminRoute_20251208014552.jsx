import { Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";

const AdminRoute = ({ children }) => {
    const { user, role, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (user && role === "admin") return children;

    return <Navigate to="/" replace />;
};

export default AdminRoute;
