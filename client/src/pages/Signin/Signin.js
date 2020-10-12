import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import { Input } from '../../components/Input/Input';

import { Container, FromContainer, Form, Footer } from './styles';
import { useAuth } from '../../hooks/auth';

export const Signin = () => {
    const history = useHistory();
    const formRef = useRef(null);

    const { signIn} = useAuth();

    const handleSubmit = useCallback(async (data) => {
        try {
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                username: Yup.string().required('Username obligatorio'),
                password: Yup.string().required('Password obligatorio')
            })

            await schema.validate(data, { abortEarly: false });
            console.log(data);

            // await api.post('/auth', data);

            await signIn({ password: data.password, username: data.username })

            history.push('/');

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);
                formRef.current.setErrors(errors);
                return;
            }

            toast.error(error.response.data.message);
        }
    }, [history, signIn])

    return (
        <Container>

            <FromContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <img src={logo} alt="photogram" />
                    <span>Inicia Sesión para ver fotos</span>

                    <hr />

                    <Input name="username" placeholder="Usuario" />

                    <Input type="password" name="password" placeholder="Contraseña" />

                    <button type="submit">Regístrate</button>

                    <hr />


                    <span className="footer">
                        Mira lo que tus amigos tienen preparado para ti.
              </span>

                </Form>

                <Footer>
                    <p>
                        ¿No tienes una cuenta? <Link to="signup">Registrarme</Link>
                    </p>
                </Footer>
            </FromContainer>
        </Container>
    )
}

