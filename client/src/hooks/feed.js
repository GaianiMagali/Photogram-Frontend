import React, { createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const FeedContext = createContext();

const FeedProvider = ({ children }) => {

    const [feeds, setFeeds] = useState([]);
    const [totalFeeds, setTotalFeeds] = useState(0);

    const getFeeds = useCallback(async (page) => {
        try {
            const response = await api.get("/feeds", {
                params: {
                    page,
                    pageSize: 2
                }
            });

            if (response.status === 200) {
                setFeeds((state) => [...state, ...response.data.feeds]);
                setTotalFeeds(response.data.totalFeeds)
               
            }
            
        } catch (error) {
            console.log(error);
        } 
    }, [])

    const deletePhotoAction = useCallback(async (photo) => {
        try {
            const response = await api.delete(`/photos/${photo.id}`,
                {
                    params: {
                        key: photo.key
                    }
                }
            )
            if (response.status === 200) {
                setFeeds((state) => state.filter((item) => item.photo.id !== photo.id))
            }
        } catch (error) {
            toast.error('Ocurrio un error');
        }
    }, [])

    const deleteFollowAction = useCallback(async (idUser) => {
        try {
            const response = await api.post(`/follows/${idUser}`);
            if (response.status === 200) {
                setFeeds((state) => state.filter((item) => item.photo.user_id !== idUser))
            }
        } catch (error) {
            toast.error('Ocurrió un error');
        }
    }, [])

    const addFeed = useCallback((data) => {
        setFeeds((state) => ([data, ...state]));
    }, [])

    return (
        <FeedContext.Provider value={{ feeds, totalFeeds, getFeeds, deletePhotoAction, deleteFollowAction, addFeed, setFeeds }}>
            {children}
        </FeedContext.Provider>
    )
}

function useFeed() {
    const context = useContext(FeedContext);

    if (!context) throw new Error('useFeed must be used within an FeedProvider');

    return context;
}

export { FeedProvider, useFeed };