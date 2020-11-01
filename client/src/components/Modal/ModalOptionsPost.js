import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { StyledModal, MoreOptions } from './styles';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useFeed } from '../../hooks/feed';
import { useFollow } from '../../hooks/follow';

export const ModalOptionsPost = React.memo(({ isAuthor, photo }) => {
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);

    const { deletePhotoAction, deleteFollowAction } = useFeed();
    const { removeFollow } = useFollow();

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

    const handleDelete = useCallback((photo) => {
        deletePhotoAction(photo);
        toggleModal();
        history.push('/');
    }, [deletePhotoAction, toggleModal, history])

    const handleFollow = useCallback((idUser) => {
        deleteFollowAction(idUser);
        removeFollow(idUser);
        toggleModal();
    }, [deleteFollowAction, removeFollow, toggleModal])


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
                <MoreOptions>
                    {isAuthor ? (
                        <li className="red" onClick={() => handleDelete(photo)}>
                            Eliminar publicación
                        </li>
                    ) : (
                            <li className="red" onClick={() => handleFollow(photo.user_id)}>
                                Dejar de seguir
                            </li>
                        )}
                    <li onClick={toggleModal}>Cancelar</li>
                </MoreOptions>
            </StyledModal>
        </>
    )
})
