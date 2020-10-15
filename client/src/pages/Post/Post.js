import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from '../../components/Profile/Profile';
import api from '../../services/api';
import { Layout } from '../Layout/Layout';

import TimeAgo from "react-timeago";
import spanishString from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { Container, ContainerPhoto, Img, ContainerPost, HeaderPost, ContainerComments, TimeStyle, ContainerOptions, ContainerComment } from './styles';

const formatter = buildFormatter(spanishString);

export const Post = () => {
    const { photo_id } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        async function getPost() {
            const response = await api.get(`/photos/${photo_id}`);

            //const { photo } = response.data;
            const { isAuthor, isLiked, photo } = response.data;

            setPost(photo);
            setComments(photo.getComments);
            setIsLiked(isLiked);
            setIsAuthor(isAuthor);
            
           
        }
        getPost();
    }, [photo_id])

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
                            {comments.length > 0 ? comments.map((comment) => (
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

                        <ContainerOptions>
                            
                            <span>{post.LikesCount} Me gusta</span>
                            
                            <div>{/* Aqui el boton de like */}</div>
                        </ContainerOptions>

                        <ContainerComment>{/* La sección de comentario */}</ContainerComment>

                    </ContainerPost>
                </Container>

            </Layout>
        )
    }

}
