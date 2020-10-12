import React, { createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchAction = useCallback(async (term) => {
        try {
            setLoading(true);
            const res = await api.get('/search', {
                params: {
                    term,
                }
            })

            if (res.status === 200) setUsers(res.data);
            console.log(res);

        } catch (error) {
            console.log(error.response.message);
        } finally {
            setLoading(false);
        }

    }, [])

    return (
        <SearchContext.Provider value={{ users, loading, searchAction, setUsers, setLoading }}>
            {children}
        </SearchContext.Provider>
    )
}

function useSearch() {
    const context = useContext(SearchContext);

    if (!context) throw new Error('useSearch must be used within an SearchProvider');

    return context;
}

export { SearchProvider, useSearch };