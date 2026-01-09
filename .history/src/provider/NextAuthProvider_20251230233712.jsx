"use client"
import React from 'react';

const NextAuthProvider = ({children}) => {
    return <SessionProvider> {children}
    </SessionProvider>
};

export default NextAuthProvider;