import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = () => {

    const [user, SetUser] = useState(null);
    const [loading, setLoading] = useState(false);

    return <AuthContext></AuthContext>
};

export default AuthProvider;