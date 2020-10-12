import React from 'react';
import { AuthProvider } from './auth';
import { UploadProvider } from './upload';
import { SearchProvider } from './search';
import { FollowProvider } from '../hooks/follow';
import { FeedProvider } from '../hooks/feed';

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <UploadProvider>
                <SearchProvider>
                    <FollowProvider>
                        <FeedProvider>
                            {children}
                        </FeedProvider>
                    </FollowProvider>
                </SearchProvider>
            </UploadProvider>
        </AuthProvider>
    )
}

export default Providers;