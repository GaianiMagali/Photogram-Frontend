import React from 'react';
import { EditProfileLeft } from './EditProfileLeft';
import { EditProfileRight } from './EditProfileRight';
import { Layout } from '../../pages/Layout/Layout';
import { Container } from './styles';
import { useParams } from 'react-router-dom';

export const EditProfile = () => {
    const { id } = useParams();
    

    return (
        <>
            <Layout>
                <Container>
                    <EditProfileLeft />
                    <EditProfileRight id={id} />
                </Container>
            </Layout>
        </>
    )
}