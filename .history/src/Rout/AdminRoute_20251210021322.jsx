import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook /useAuth";

const AdminRoute = ({ children }) => {
    const { user, role, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    
    if (role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    // সব ঠিক থাকলে children render হবে
    return children;
};

export default AdminRoute;
