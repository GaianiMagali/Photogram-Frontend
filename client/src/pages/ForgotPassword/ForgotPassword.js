import React from 'react';

import logo from '../../assets/logo.svg';
import { Container, FromContainer, Form, Footer } from './styles';

export const ForgotPassword = () => {
    return (
        <Container>
            <FromContainer>
                <Form >
                    <img src={logo} alt="photogram" />
                    <span>¿Tienes problemas para iniciar sesión?</span>
                    
                    <p>Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</p>

                    <input name="mail" placeholder="Correo electrónico" />

                    <button type="submit">Enviar enlace de inicio de sesión</button>

                    <center><div className="divider"><b>O</b></div></center>
                    
                    <a>Crear cuenta nueva</a>
                </Form>
               
                <Footer>
                    <p>
                        Volver al inicio de sesión 
                    </p>
                </Footer>
                
            </FromContainer>
        </Container>
    )
}
