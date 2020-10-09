import React from 'react';
import { AuthProvider } from './auth';
import { UploadProvider } from './upload';

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <UploadProvider>
                {children}
            </UploadProvider>
        </AuthProvider>
    )
}

export default Providers;