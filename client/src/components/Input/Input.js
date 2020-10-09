import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

export const Input = React.memo (({ name, ...rest }) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    return (

        <Container>
            <input
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
                autoComplete="off"
            />

            {error && <p>{error}</p>}
        </Container>
    )
})
