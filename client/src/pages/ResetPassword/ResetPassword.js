import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from "../../services/api";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import getValidationErrors from '../../utils/getValidationErrors';
import logo from '../../assets/logo.svg';
import { Container, FromContainer, Form } from './styles';
import { useForm } from '../../hooks/useForm';

export const ResetPassword = () => {
    const history = useHistory();
    const { token } = useParams();
    const [inputValues, handleChange] = useForm({
        password: ""
    })

    const updatePassword = async () => {
        try {
            const schema = Yup.object().shape({
                password: Yup.string().required('Password obligatorio').min(6, 'El password debe ser de máximo 6 dígitos')
            })

            await schema.validate(inputValues, { abortEarly: false });

            await api.put(`/users/password-update`, {
                password: inputValues.password,
                reset_password_link: token
            });

            toast.success('La contraseña se restableció correctamente!')
            history.push("/signin")

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);
                toast.error(errors.password)
                return;
            }
            toast.error(error.response.data.message);
        }
    }


    return (
        <Container>
            <FromContainer>
                <Form onSubmit={updatePassword}>
                    <img src={logo} alt="photogram" />
                    <hr />
                    <p>Nueva contraseña:</p>
                    <input
                        type="password"
                        name="password"
                        value={inputValues.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Restablecer contraseña</button>
                </Form>
            </FromContainer>
        </Container>
    )
}
