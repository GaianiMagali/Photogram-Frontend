import React, { useEffect } from 'react';
import { useForm } from './useForm';
import { ContainerRight, ContainerRightHeader, ContainerRightForm } from './styles';
import api from '../../services/api';

export const EditProfileRight = ({ username }) => {
    const [inputValues, handleChange, setInputValues] = useForm({
        name: "",
        email: "",
        username: "",
        bio: "",
        phone: ""
    })

    useEffect(() => {
        getUser()
    }, [])

    // console.log(inputValues);


    const getUser = async () => {
        const { data } = await api.get(`/users/${username}`);
        console.log(data);
        setInputValues({
            name: data.user.name,
            email: data.user.email,
            username: data.user.username,
            bio: data.user.bio,
            phone: data.user.phone
        })
    }

    const updateProfile = async () => {
        const res = await api.put('/users', { ...inputValues });   
        console.log(res.data);
    }

    return (
        <>
            <ContainerRight>
                <ContainerRightHeader>
                    <img
                        src="https://escritoresdehoy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                    />
                    <div >
                        <h1>jono.jsx</h1>
                        <span>Cambiar Foto de perfil</span>
                    </div>
                </ContainerRightHeader>

                <ContainerRightForm>
                    <form onSubmit={updateProfile}>

                        <div>
                            <span>Nombre</span>
                            <input
                                type="text"
                                name="name"
                                value={inputValues.name}
                                onChange={handleChange}
                                style={{ width: "67%" }} />
                            <div className="help-input">
                                Para ayudar a que las personas descubran tu cuenta, usa el nombre por el que te conoce la gente, ya sea tu nombre completo, apodo o nombre comercial.
                                Solo puedes cambiar el nombre del grupo dos veces en un plazo de 14 días.
                        </div>
                        </div>

                        <div>
                            <span>Nombre de usuario</span>
                            <input
                                type="text"
                                name="username"
                                value={inputValues.username}
                                onChange={handleChange}
                                style={{ width: "50%" }} />
                        </div>

                        <div>
                            <span>Biografia</span>
                            <input
                                type="text"
                                name="bio"
                                value={inputValues.bio}
                                onChange={handleChange}
                                style={{ width: "65%" }} />
                        </div>

                        <div>
                            <span>Correo Electronico</span>
                            <input
                                type="email"
                                name="email"
                                value={inputValues.email}
                                onChange={handleChange}
                                style={{ width: "50%" }} />
                        </div>

                        <div>
                            <span>Número de teléfono</span>
                            <input
                                type="number"
                                name="phone"
                                value={inputValues.phone}
                                onChange={handleChange}
                                style={{ width: "49%" }} />
                        </div>

                        <div className="form-button">
                            <button type="submit">Enviar</button>
                            <span style={{ color: "#0095f6" }}>Inhabilitar mi cuenta permanentemente</span>
                        </div>
                    </form>
                </ContainerRightForm>

            </ContainerRight>
        </>
    )
}