import React, { useState, useCallback, useRef } from 'react';
import { StyledModal, MoreOptions } from './styles';

export const ModalUpdateAvatar = React.memo(({ updatePhoto, deletePhoto }) => {
    const inputFile = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const [image, setImage] = useState('');

    const toggleModal = useCallback(() => {
        setIsOpen(!isOpen);
        setImage("")
    }, [isOpen])

    const afterOpen = useCallback(() => {
        setTimeout(() => {
            setOpacity(1);
        }, 100)
    }, [])

    const beforeClose = useCallback(() => {
        return new Promise(resolve => {
            setOpacity(0);
            setTimeout(resolve, 200);
        })
    }, [])

    const handleInputFile = useCallback(async (file) => {
        if (file.target.files[0]) {
            setImage(URL.createObjectURL(file.target.files[0]));
        } else {
            setImage('');
        }
    }, [])

    return (
        <>
            <span style={{ cursor: 'pointer' }} onClick={() => toggleModal()}>Cambiar Foto de perfil</span>

            <StyledModal
                isOpen={isOpen}
                afterOpen={afterOpen}
                beforeClose={beforeClose}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}
                opacity={opacity}
                backgroundProps={{ opacity }}
            >

                <MoreOptions>
                    {
                        image ? (<li onClick={() => updatePhoto(inputFile.current.files[0], toggleModal)}>
                            Enviar foto
                        </li>
                        ) : <li className="blue" onClick={() => inputFile.current.click()}>
                                Subir foto
                            </li>
                    }

                    <li className="red" onClick={() => deletePhoto(toggleModal)}>
                        Eliminar foto actual
                        </li>
                    <li onClick={toggleModal}>Cancelar</li>
                </MoreOptions>

                <input
                    ref={inputFile}
                    type="file"
                    onChange={handleInputFile}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
            </StyledModal>
        </>

    )
})


