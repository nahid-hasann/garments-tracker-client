import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.init';
import { embed } from 'framer-motion/client';
import { TbUrgent } from 'react-icons/tb';
// import { GoogleAuthProvider } from 'firebase/auth/web-extension';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

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
        return signInWithPopup(auth, provider);
    }

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
            setLoading(false);
        })
        return () => unsubscribe();
    })

    const authInfo = {
        user,
        loading,
        registerUser,
        signIn,
        logInWithGoogle
    }

    return <AuthContext value={authInfo} > {children} </AuthContext>
};

export default AuthProvider;