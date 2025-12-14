import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook /useAuth";
import { Helmet } from "react-helmet-async";

const ManagerRoute = ({ children }) => {
    const { user, role, userStatus, loading } = useAuth(); // userStatus আনলাম
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    // ১. লগইন না থাকলে লগইন পেজে পাঠাও
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    
    if (role !== "manager") {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-center">
                <Helmet><title>Access Denied</title></Helmet>
                <div className="space-y-2">
                    <p className="text-2xl text-red-500 font-bold">Access Denied</p>
                    <p className="text-slate-500">You are not a Manager.</p>
                </div>
            </div>
        );
    }

   
    if (userStatus !== "active") {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-3 p-4">
                <Helmet><title>Account Pending</title></Helmet>

                <div className="text-6xl">⏳</div>

                <h2 className="text-2xl font-bold text-slate-800">Account Not Active</h2>

                <p className="text-slate-500 max-w-md">
                    Hello, <span className="font-semibold">{user.displayName}</span>!
                    Your manager account is currently <span className={`badge ${userStatus === 'suspended' ? 'badge-error' : 'badge-warning'} text-white capitalize`}>{userStatus}</span>.
                </p>

                {userStatus === "pending" ? (
                    <p className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                        Please wait for <b>Admin approval</b>. Once approved, you can access the dashboard.
                    </p>
                ) : (
                    <p className="text-sm bg-red-50 text-red-700 px-4 py-2 rounded-lg">
                        Your account has been suspended. Check your profile for details.
                    </p>
                )}
            </div>
        );
    }

    
    return children;
};

export default ManagerRoute;