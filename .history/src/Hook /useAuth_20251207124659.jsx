import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../firebase.init';

const useAuth = () => {

    const authInfo = use(AuthContext);
    return auth

    return (
        <div>
            
        </div>
    );
};

export default useAuth;