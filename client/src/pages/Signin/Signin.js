import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import getValidationErrors from '../../utils/getValidationErrors';
import logo from '../../assets/logo.svg';
import { Input } from '../../components/Input/Input';
import { Container, FromContainer, Form, Footer } from './styles';
import { useAuth } from '../../hooks/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthGoogle } from '../../components/AuthGoogle/AuthGoogle';

export const Signin = () => {
    const history = useHistory();
    const formRef = useRef(null);
    const [showpwd, setShowpwd] = useState(false);
    const [cheked, setCheked] = useState(false);
    const [rememberUser, setRememberUser] = useState({});
    const [disabled, setDisabled] = useState(false);
    const { signIn } = useAuth();


    useEffect(() => {
        const item = localStorage.getItem('@Photogram:username&password');
       
        if (item) {
            setRememberUser(JSON.parse(item))
            setCheked(true);
        }
    }, []);

    useEffect(() => {
        if (cheked === false) {
            localStorage.removeItem('@Photogram:username&password')
        }
    }, [cheked]);

    const handleChecked = ({ target }) => {
        setCheked(target.checked)
    }

    const handleSubmit = useCallback(async (data) => {
        try {
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                username: Yup.string().required('Username obligatorio'),
                password: Yup.string().required('Password obligatorio')
            })

            await schema.validate(data, { abortEarly: false });

            await signIn({ password: data.password, username: data.username })

            cheked && localStorage.setItem('@Photogram:username&password', JSON.stringify({ password: data.password, username: data.username }));

            history.push('/');

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);
                formRef.current.setErrors(errors);
                return;
            }

            toast.error(error.response.data.message);
        }
    }, [cheked, history, signIn])


    return (
        <Container>
            <FromContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <img src={logo} alt="photogram" />
                    <span>Inicia Sesión para ver fotos</span>

                    <hr />

                    <Input name="username" placeholder="Usuario" defaultValue={rememberUser.username} />

                    <div style={{ position: "relative", width: "100%" }}>
                        <Input type={showpwd ? "text" : "password"} name="password" placeholder="Contraseña" defaultValue={rememberUser.password} />

                        {showpwd ?
                            <FaEye
                                onClick={() => setShowpwd(!showpwd)}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "5px",
                                    cursor: "pointer",
                                }}
                            />
                            :
                            <FaEyeSlash
                                onClick={() => setShowpwd(!showpwd)}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "5px",
                                    cursor: "pointer",
                                }}
                            />
                        }
                    </div>

                    <label>
                        <input
                            type="checkbox"
                            checked={cheked}
                            onChange={handleChecked}
                        />
                        <span>Recordar usuario</span>
                    </label>

                    <button disabled={disabled} type="submit">Iniciar sesión</button>

                    <center><div className="divider"><b>O</b></div></center>

                    <AuthGoogle buttonTitle={"Iniciar sesión con Google"}/>

                    <span className="footer">
                        <p>
                            <Link to="forgot-password" >¿Olvidaste tu contraseña?</Link>
                        </p>
                    </span>

                </Form>

                <Footer>
                    <p>
                        ¿No tienes una cuenta? <Link to="signup">Registrarme</Link>
                    </p>
                </Footer>
            </FromContainer>
        </Container >
    )
}

