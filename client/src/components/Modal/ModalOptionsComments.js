import React, { useState, useCallback } from 'react';
import api from '../../services/api';

import { StyledModal, MoreOptions } from './styles';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useFeed } from '../../hooks/feed';
import { useFollow } from '../../hooks/follow';
import { useAuth } from '../../hooks/auth';

export const ModalOptionsComments = React.memo(({ isAuthor, photo, comment, deleteComment }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);

    const { deleteFollowAction } = useFeed();
    const { removeFollow } = useFollow();
    const { user } = useAuth()
    console.log(user);

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

    const handleFollow = useCallback((idUser) => {
        deleteFollowAction(idUser);
        removeFollow(idUser);
        toggleModal();
    }, [deleteFollowAction, removeFollow, toggleModal])

    const handleDeleteComment = useCallback(async (comment) => {
        await api.delete(`/comments/${comment.id}`);
        deleteComment(comment.id)
        toggleModal()
    }, [deleteComment, toggleModal])

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

                {user.username === comment.postedBy.username ? (
                    <MoreOptions>
                        <li className="red" onClick={() => handleDeleteComment(comment)}>
                            Eliminar comentario
                        </li>
                        <li onClick={toggleModal}>Cancelar</li>
                    </MoreOptions>
                ) : (
                        <MoreOptions>
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
