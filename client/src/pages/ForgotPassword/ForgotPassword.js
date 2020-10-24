import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import { useForm } from '../EditProfile/useForm';
import { Container, FromContainer, Form, Footer } from './styles';

export const ForgotPassword = () => {
    const [inputValues, handleChange, setInputValues, reset] = useForm({
        email: ""
    })

    const onForgotPassword = useCallback(async () => {
        try {
            await api.put('/users/forgot-password', {
                email: inputValues.email
            })

            reset();
            toast.success('Se envio el link correctamente!')
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }, [inputValues])

    return (
        <Container>
            <FromContainer>
                <Form onSubmit={onForgotPassword}>
                    <img src={logo} alt="photogram" />
                    <span>¿Tienes problemas para iniciar sesión?</span>

                    <p>Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</p>

                    <input
                        name="email"
                        placeholder="Correo electrónico"
                        value={inputValues.email}
                        onChange={handleChange}
                    />

                    <button type="submit">Enviar enlace de inicio de sesión</button>

                    <center><div className="divider"><b>O</b></div></center>

                    <p>
                        <Link to="signup"> Crear cuenta nueva</Link>
                    </p>

                </Form>

                <Footer>
                    <p>
                        <Link to="signin"> Volver al inicio de sesión</Link>
                    </p>
                </Footer>

            </FromContainer>
        </Container>
    )
}
