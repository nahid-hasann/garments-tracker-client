import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    const register = (email, password) => {
        setLoading
    }


    const authInfo = {
        user,
        loading
    }

    return <AuthContext value={authInfo} > {children} </AuthContext>
};

export default AuthProvider;