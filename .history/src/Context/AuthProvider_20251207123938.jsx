import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.init';
import { embed } from 'framer-motion/client';
import { TbUrgent } from 'react-icons/tb';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signinwithem
    }

    const authInfo = {
        user,
        loading
    }

    return <AuthContext value={authInfo} > {children} </AuthContext>
};

export default AuthProvider;