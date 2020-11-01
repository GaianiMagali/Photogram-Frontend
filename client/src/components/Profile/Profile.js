import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png'
import { Container, Img, Username, Name } from './styles';

export const Profile = ({ direction, username, name, usidebar = false, img, isOwner = false }) => {

    return (
        <Container direction={direction} usidebar={usidebar}>
            <Link to={`/profile/${username}`}>
                {img ? (
                    <Img src={img} alt="avatar" usidebar={usidebar} isOwner={isOwner} />
                ) : (
                        <Img src={avatar} alt="avatar" usidebar={usidebar} isOwner={isOwner} />
                    )}
            </Link>
            <div>
                <Link to={`/profile/${username}`}>
                    {username && <Username usidebar={usidebar}>{username}</Username>}
                </Link>
                {name && <Name>{name}</Name>}
            </div>
        </Container>
    )
}
