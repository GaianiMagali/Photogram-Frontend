import React, { createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';

const UploadContext = createContext();

const UploadProvider = ({children}) => {

  const[data, setData] = useState(null);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState(false);

  const uploadPhotoAction = useCallback(async (dataImage) => {
    try {
      setLoading(true);
      const fd = new FormData();

      fd.append('file', dataImage.file, dataImage.file.name);
      fd.append('body', dataImage.body);

      const res = await api.post('/photos', fd);
      console.log(res);

      if(res.status === 200) {
        setData(res.data);
      }


      
    } catch (error) {
      if(error.response.status === 500) {
        setError(true);
      }
    }finally {
      setLoading(false)
    }
  },[])

  const resetValues = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(false);
  } ,[])

  return (
    <UploadContext.Provider value={{data, loading, error, uploadPhotoAction, resetValues}}>
      {children}
    </UploadContext.Provider>
  )
}

function useUpload() {
  const context = useContext(UploadContext);

  if(!context) throw new Error('useUpload must be used within an UploadProvider');

  return context;
}

export { UploadProvider, useUpload };