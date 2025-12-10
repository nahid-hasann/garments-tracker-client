import React from 'react';

const PrivateRout = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={location.pathname} replace />;
    }

    return children;
};


export default PrivateRout;