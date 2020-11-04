import React, { useEffect, useCallback } from 'react';
import { useForm } from '../../hooks/useForm';
import { ContainerRight, ContainerRightHeader, ContainerRightForm } from './styles';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import avatar from '../../assets/avatar.png';
import { ModalUpdateAvatar } from '../../components/Modal/ModalUpdateAvatar';


export const EditProfileRight = ({ id }) => {
    const { updateDataUser, user, signOut } = useAuth();
    const history = useHistory();
    // const [disabled, setDisabled] = useState(true);

    const [inputValues, handleChange, setInputValues, reset] = useForm({
        avatar_url: "",
        name: "",
        email: "",
        username: "",
        bio: "",
        phone: ""
    })

    useEffect(() => {
        const getUser = async () => {
            const { data } = await api.get(`/users/user/${Number(id)}`);
            setInputValues({
                avatar_url: data.user.avatar_url,
                name: data.user.name || '',
                email: data.user.email || '',
                username: data.user.username || '',
                bio: data.user.bio || '',
                phone: data.user.phone || ''
            })
        }
        getUser()

        return () => {
            reset()
        }
    }, [])

    const updateProfile = useCallback(async (e) => {
        e.preventDefault()
        await api.put('/users', { ...inputValues });
        updateDataUser(inputValues)
    }, [inputValues])

    const updatePhoto = useCallback(async (dataImage, toggleModal) => {
        try {
            const fd = new FormData();

            fd.append('file', dataImage, dataImage.name);

            const { data } = await api.put('/users/avatar', fd);

            updateDataUser({
                avatar_url: data.avatar_url
            })

            toggleModal()

        } catch (error) {
            console.log(error);
        }
    }, [updateDataUser])

    const deletePhoto = useCallback(async (toggleModal) => {
        try {
            await api.put('/users/avatarDelete');

            updateDataUser({
                avatar_url: null
            })

            toggleModal()
        } catch (error) {
            console.log(error);
        }
    })

    const removeUser = useCallback(async (idUser) => {
        await api.delete(`/users/user/${idUser}`);
        signOut()
        history.push("/signin")
    }, [history, signOut])

    return (
        <>
            <ContainerRight>
                <ContainerRightHeader>
                    <img
                        src={user.avatar_url || avatar} alt={user.name}
                    />
                    <div >
                        <h1>{user.username}</h1>

                        <ModalUpdateAvatar
                            updatePhoto={updatePhoto} deletePhoto={deletePhoto}
                        />
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
                            <span>Correo Electrónico</span>
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

                            <span
                                style={{ color: "#0095f6", cursor: 'pointer' }}
                                onClick={() => removeUser(user.id)}
                            >
                                Inhabilitar mi cuenta permanentemente
                            </span>
                        </div>
                    </form>
                </ContainerRightForm>
            </ContainerRight>
        </>
    )
}