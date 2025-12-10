import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';

const useAuth = () => {

    const authInfo = use(AuthContext)

    return (
        <div>
            
        </div>
    );
};

export default useAuth;