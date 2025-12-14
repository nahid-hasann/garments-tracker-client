import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.init';
import { TbUrgent } from 'react-icons/tb';
import axios from 'axios';
import useAxiosSecure from '../Hook /useAxiosSecure';
// import { GoogleAuthProvider } from 'firebase/auth/web-extension';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dbUser, setDbUser] = useState(null);
    const axiosSecure = useAxiosSecure();


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
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // ১. ডাটাবেস থেকে ইউজার ডাটা আনা
                try {
                    const res = await axiosSecure.get(`/users?email=${currentUser.email}`);
                    setDbUser(res.data);
                } catch (error) {
                    console.error("Failed to fetch user data", error);
                }

                // ⭐ ২. JWT টোকেন জেনারেট করা (Cookies সেট হবে)
                const userInfo = { email: currentUser.email };
                try {
                    await axiosSecure.post('/jwt', userInfo, { withCredentials: true });
                } catch (error) {
                    console.error("JWT Token Error", error);
                }

            } else {
                // ⭐ ৩. ইউজার না থাকলে কুকি ক্লিয়ার করা (Logout)
                try {
                    await axiosSecure.post('http://localhost:8000/logout', {}, { withCredentials: true });
                } catch (error) {
                    console.error("Logout Error", error);
                }
                setDbUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        registerUser,
        signIn,
        logInWithGoogle,
        updateUserProfile,
        logOut,
        role: dbUser?.role,
        userStatus: dbUser?.status
    }

    return <AuthContext value={authInfo} > {children} </AuthContext>
};

export default AuthProvider;