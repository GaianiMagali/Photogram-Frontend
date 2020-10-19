import { useState } from 'react';

export const useForm = (initialState = {}) => {
    const [values, setvalues] = useState(initialState);

    const handleChange = ({ target }) => {
        setvalues({
            ...values,
            [target.name]: target.value

        });
    }

    const setInputValues = (newValues) => {
        setvalues(newValues);
    }

    return [values, handleChange, setInputValues];
}