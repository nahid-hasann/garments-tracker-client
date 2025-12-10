import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook /useAuth";

const RoleRoute = ({ allowedRoles = [], children }) => {
    const { user, loading, role } = useAuth();
    const location = useLocation();

    
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

   
    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

   
    if (!allowedRoles.includes(role)) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center space-y-2">
                    <p className="text-sm font-semibold text-red-500">
                        Access denied
                    </p>
                    <p className="text-xs text-slate-500">
                        You don&apos;t have permission to view this page.
                    </p>
                </div>
            </div>
        );
    }

   
    return children;
};

export default RoleRoute;
