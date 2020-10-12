import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';

import avatar from '../../assets/avatar.png'

import { Container, Img, Username, Name } from './styles';

export const Profile = ({ direction, username, name, usidebar = false, img, isOwner = false }) => {

    const usernameMemo = useMemo(() => {
        return (username.length > 11) ? `${username.substring(0, 11)}...`
            : username;
    }, [username])

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
                    {username && <Username usidebar={usidebar}>{usernameMemo}</Username>}
                </Link>
                {name && <Name>{name}</Name>}
            </div>
        </Container>
    )
}
