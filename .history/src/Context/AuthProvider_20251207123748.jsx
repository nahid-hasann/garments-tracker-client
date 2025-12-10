import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth/cordova';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword
    }


    const authInfo = {
        user,
        loading
    }

    return <AuthContext value={authInfo} > {children} </AuthContext>
};

export default AuthProvider;