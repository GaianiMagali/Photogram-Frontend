import React from 'react';
import { EditProfileLeft } from './EditProfileLeft';
import { EditProfileRight } from './EditProfileRight';
//import { FormPassword } from './FormPassword';
import { Layout } from '../../pages/Layout/Layout';
import { Container } from './styles';
import { useParams } from 'react-router-dom';

export const EditProfile = () => {
    const { username } = useParams();

    return (
        <>
            <Layout>
                <Container>
                    <EditProfileLeft />
                    <EditProfileRight username={username} />
                </Container>
            </Layout>
        </>
    )
}