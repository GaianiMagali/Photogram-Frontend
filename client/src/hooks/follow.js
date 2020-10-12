import React, { createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';

const FollowContext = createContext();

const FollowProvider = ({ children }) => {

    const [follows, setFollows] = useState([]);
    const [loading, setLoading] = useState(false);

    const getFollows = useCallback(async () => {
        try {
            setLoading(true)
            const res = await api.get("/feeds/follows", {
                params: {
                    page: 0,
                    pageSize: 12,
                }
            });

            if (res.status === 200) {
                setFollows(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }, [])

    const removeFollow = useCallback((id) => {
        setFollows((state) => state.filter(follow => follow.id !== id));
    }, [])

    return (
        <FollowContext.Provider value={{ follows, loading, getFollows, removeFollow }}>
            {children}
        </FollowContext.Provider>
    )
}

function useFollow() {
    const context = useContext(FollowContext);

    if (!context) throw new Error('useFollow must be used within an FollowProvider');

    return context;
}

export { FollowProvider, useFollow };