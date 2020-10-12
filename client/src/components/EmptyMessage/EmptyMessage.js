import React from 'react';
import { Container } from './styles';

export const EmptyMessage = React.memo(({ message }) => {
    return <Container>{message}</Container>;

})
