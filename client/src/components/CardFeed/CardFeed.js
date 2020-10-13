import React, { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import TimeAgo from "react-timeago";
import spanishString from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { Profile } from '../Profile/Profile';

import { Card, CardHeader, ContainerPhoto, PhotoCard, CardControls, CardDetails, TimeAgo as StyleTimeAgo, CardFooter } from './styles';
import { ModalMoreOptions } from '../Modal/ModalMoreOptions';
import { FaHeart, FaComment } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

const CommentList  = lazy(() => import("../CommentList/CommentList"));

const formatter = buildFormatter(spanishString);

export const CardFeed = ({ feed }) => {

    const { isAuthor, isLiked, photo } = feed;
    const [like, setLike] = useState(isLiked);

    const [commentsPhoto, setCommentsPhoto] = useState(photo.getComments);
    const [comment, setComment] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (comment.trim()) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [comment])

    const toggleLike = useCallback(async (photo_id) => {
        const response = await api.post(`/likes/${photo_id}`);

        if (response.status === 200) {
            setLike(!like);
        } else {
            toast.error('Probablemente esta publicación ya no existe!');
        }
    }, [like])

    const handleComment = useCallback((event) => {
        setComment(event.target.value);
    }, [])

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        const response = await api.post(`/comments/${photo.id}`, { body: comment });
        if (response.status === 200) {
            setCommentsPhoto((state) => [...state, response.data]);
            setComment('');
            setDisabled(true);
        }

    }, [comment, photo.id])

    return (
        <Card>
            <CardHeader>
                <Profile
                    direction="row"
                    img={photo.uploadedBy.avatar_url}
                    username={photo.uploadedBy.username}
                />

                <ModalMoreOptions isAuthor={isAuthor} photo={photo} />

            </CardHeader>

            <ContainerPhoto>
                <PhotoCard src={photo.photo_url} alt={photo.photo_url} />
            </ContainerPhoto>

            <CardControls>
                {like ? (
                    <FaHeart
                        onClick={() => toggleLike(photo.id)}
                        size={20}
                        style={{ color: "#FC4850", marginRight: 10 }}
                    />
                ) : (
                        <FiHeart
                            onClick={() => toggleLike(photo.id)}
                            size={20}
                            style={{ marginRight: 10 }}
                        />
                    )}

                <Link to={`/photo/${photo.id}`}>
                    <FaComment size={20} color="#2c2c2c" />
                </Link>
            </CardControls>

            <CardDetails>
                <p style={{ fontWeight: "bold" }}>
                    {photo.uploadedBy.username}
                    <span
                        style={{
                            marginLeft: 5,
                            fontWeight: "normal",
                            marginBottom: 10,
                            display: "inline-block"
                        }}
                    >
                        {photo.body}
                    </span>
                </p>

                <Suspense fallback={<p>Cargando...</p>}>
                    {commentsPhoto.length > 0 && (
                        <CommentList comments={commentsPhoto} />
                    )}
                </Suspense>

                <StyleTimeAgo>
                    <TimeAgo date={`${photo.createdAt}Z`} formatter={formatter} />
                </StyleTimeAgo>

                <Link
                    to={`/photo/${photo.id}`}
                    style={{
                        fontWeight: "bold",
                        textDecoration: 'none',
                        color: '#999999',
                        marginTop: '10px',
                        display: 'block'
                    }}
                >
                    Ver más detalles
                </Link>

            </CardDetails>

            <CardFooter>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={comment}
                        onChange={handleComment}
                        placeholder="Añade un comentario"
                    />
                    <button type="submit" disabled={disabled}>
                        Publicar
                    </button>
                </form>
            </CardFooter>
        </Card>
    )
}
