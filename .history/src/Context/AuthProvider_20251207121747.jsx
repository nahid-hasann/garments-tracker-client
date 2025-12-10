import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = () => {

    const [user, SetUser] = useState(null);
    const [loading, setLoading] = useState(false);


    const authInfo = {
        user,
        loading
    }

    return <AuthContext value={authInfo} > {chid} </AuthContext>
};

export default AuthProvider;