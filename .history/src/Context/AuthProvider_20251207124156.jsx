import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.init';
import { embed } from 'framer-motion/client';
import { TbUrgent } from 'react-icons/tb';
// import { GoogleAuthProvider } from 'firebase/auth/web-extension';

const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logInWithGoogle = () => {
      setLoading(true)
      return signInWithPopup(auth, provider)
    }

    const authInfo = {
        user,
        loading
    }

    return <AuthContext value={authInfo} > {children} </AuthContext>
};

export default AuthProvider;