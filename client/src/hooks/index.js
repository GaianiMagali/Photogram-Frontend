import React from 'react';
import { AuthProvider } from './auth';

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            { children}
        </AuthProvider>
    )
}

export default Providers;