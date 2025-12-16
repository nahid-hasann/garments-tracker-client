import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.init';
import axios from 'axios';

const provider = new GoogleAuthProvider();


const axiosPublic = axios.create({
    baseURL: 'https://garments-tracker-server.vercel.app',
    withCredentials: true
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dbUser, setDbUser] = useState(null);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
              
                try {
                    const res = await axiosPublic.get(`/users?email=${currentUser.email}`);
                    setDbUser(res.data);
                } catch (error) {
                    console.error("Failed to fetch user data", error);
                }

               
                const userInfo = { email: currentUser.email };
                try {
                    await axiosPublic.post('/jwt', userInfo);
                } catch (error) {
                    console.error("JWT Token Error", error);
                }

            } else {
                // Remove Token
                try {
                    await axiosPublic.post('/logout', {});
                } catch (error) {
                    console.error("Logout Error", error);
                }
                setDbUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []); // 🔥 FIX 2: এখানে ফাঁকা অ্যারে দিতে হবে, [axiosPublic] দেওয়া যাবে না।

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

    // 🔥 FIX 3: .Provider মিসিং ছিল, এটা দিতে হবে
    return <AuthContext.Provider value={authInfo}> {children} </AuthContext.Provider>
};

export default AuthProvider;