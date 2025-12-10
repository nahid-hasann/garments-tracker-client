// src/Rout/ManagerRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook /useAuth";

const ManagerRoute = ({ children }) => {
    const { user, role, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // এখন শুধু manager allowed
    if (role !== "manager") {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-center">
                <div className="space-y-2">
                    <p className="text-sm font-semibold text-red-500">
                        Access denied
                    </p>
                    <p className="text-xs text-slate-500">
                        This page is only for <span className="font-medium">Manager</span>.
                    </p>
                </div>
            </div>
        );
    }

    return children;
};

export default ManagerRoute;
