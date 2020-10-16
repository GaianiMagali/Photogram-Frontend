import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from '../../components/Profile/Profile';
import api from '../../services/api';
import { Layout } from '../Layout/Layout';

import TimeAgo from "react-timeago";
import spanishString from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { FaHeart, FaComment } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

import { Container, ContainerPhoto, Img, ContainerPost, HeaderPost, ContainerComments, TimeStyle, ContainerOptions } from './styles';

import { CardFooter as ContainerComment } from '../../components/CardFeed/styles';

import { toast } from 'react-toastify';

const formatter = buildFormatter(spanishString);

export const Post = () => {
    const { photo_id } = useParams();
    const inputRef = useRef(null);

    const [post, setPost] = useState(null);
    const [commentsPhoto, setCommentsPhoto] = useState([]);
    const [comment, setComment] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (comment.trim()) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [comment])

    useEffect(() => {
        async function getPost() {
            const response = await api.get(`/photos/${photo_id}`);

            //const { photo } = response.data;
            const { isAuthor, isLiked, photo } = response.data;

            setPost(photo);
            setCommentsPhoto(photo.getComments);
            setIsLiked(isLiked);
            setIsAuthor(isAuthor);
        }
        getPost();
    }, [photo_id, isLiked])

    const toggleLike = useCallback(async (photo_id) => {
        const response = await api.post(`/likes/${photo_id}`);

        if (response.status === 200) {
            setIsLiked(!isLiked);
        } else {
            toast.error('Probablemente esta publicación ya no existe!');
        }
    }, [isLiked])

    const handleComment = useCallback((event) => {
        setComment(event.target.value);
    }, [])

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        const response = await api.post(`/comments/${photo_id}`, { body: comment });
        if (response.status === 200) {
            setCommentsPhoto((state) => [...state, response.data]);
            setComment('');
            setDisabled(true);
        }

    }, [comment, photo_id])


    if (!post) {
        return (
            <Container>
                <p>Cargando...</p>
            </Container>
        )
    } else {
        return (
            <Layout>
                <Container>
                    <ContainerPhoto>
                        <Img src={post.photo_url} alt={post.body} />

                    </ContainerPhoto>

                    <ContainerPost>
                        <HeaderPost>
                            <Profile
                                img={post.uploadedBy.avatar_url}
                                username={post.uploadedBy.username}
                            />
                            <p>{post.body}</p>
                        </HeaderPost>

                        <ContainerComments>
                            {commentsPhoto.length > 0 ? commentsPhoto.map((comment) => (
                                <div key={comment.id} style={{ marginBottom: "10px" }}>
                                    <Profile
                                        img={comment.postedBy.avatar_url}
                                        username={comment.postedBy.username}
                                    />

                                    <p style={{ margin: '5px 0' }}>{comment.body}</p>

                                    <TimeStyle>
                                        <TimeAgo
                                            date={`${comment.createdAt}`}
                                            formatter={formatter}
                                        />
                                    </TimeStyle>
                                </div>
                            )) : <p>No hay  comentarios para mostrar</p>}
                        </ContainerComments>

                        <ContainerOptions >
                            <div>
                                {isLiked ? (
                                    <FaHeart
                                        onClick={() => toggleLike(photo_id)}
                                        size={20}
                                        style={{ color: "#FC4850", marginRight: 10, cursor: "pointer" }}
                                    />
                                ) : (
                                        <FiHeart
                                            onClick={() => toggleLike(photo_id)}
                                            size={20}
                                            style={{ marginRight: 10, cursor: "pointer" }}
                                        />
                                    )}


                                <FaComment onClick={() => inputRef.current.focus()} size={20} color="#2c2c2c" style={{ cursor: "pointer" }} />
                            </div>

                            <div style={{
                                marginTop: 4,
                                marginBottom: 4,

                            }}><span >{post.LikesCount} Me gusta</span></div>


                            <TimeStyle>
                                <TimeAgo
                                    date={`${post.createdAt}`}
                                    formatter={formatter}
                                />
                            </TimeStyle>
                        </ContainerOptions>

                        <ContainerComment>
                            <form onSubmit={handleSubmit}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={comment}
                                    onChange={handleComment}
                                    placeholder="Añade un comentario"
                                />
                                <button type="submit" disabled={disabled}>
                                    Publicar
                                </button>
                            </form>
                        </ContainerComment>

                    </ContainerPost>
                </Container>
            </Layout>
        )
    }

}
