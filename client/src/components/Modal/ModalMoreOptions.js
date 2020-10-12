import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { StyledModal, MoreOptions } from './styles';
import { FiMoreHorizontal } from 'react-icons/fi';


export const ModalMoreOptions = React.memo(({ isAuthor, photo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);

    const toggleModal = useCallback(() => {
        setIsOpen(!isOpen);
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


    return (
        <>
            <FiMoreHorizontal size={20} style={{ cursor: 'pointer' }} onClick={toggleModal} />

            <StyledModal
                isOpen={isOpen}
                afterOpen={afterOpen}
                beforeClose={beforeClose}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}
                opacity={opacity}
                backgroundProps={{ opacity }}
            >

                {isAuthor ? (
                    <MoreOptions>
                        <li>Ir a la publicación</li>
                        <li className="red" onClick={() => handleDelete(photo)}>
                            Eliminar publicación
                        </li>
                        <li onClick={toggleModal}>Cancelar</li>
                    </MoreOptions>
                ) : (
                        <MoreOptions>
                            <li>
                                <Link to={`/photo/${photo.id}`}>Ir a la publicación</Link>
                            </li>
                            <li className="red" onClick={() => handleFollow(photo.user_id)}>
                                Dejar de seguir
                            </li>
                            <li onClick={toggleModal}>Cancelar</li>
                        </MoreOptions>
                    )}
            </StyledModal>
        </>

    )
})
