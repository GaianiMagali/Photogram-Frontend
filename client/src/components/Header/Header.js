import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { SearchContainer } from '../Search/SearchContainer';

import logo from '../../assets/logo.svg';
import { FiSearch } from 'react-icons/fi';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

import { Nav, Container, Img, ContainerSearch, Input, ContainerOptions } from './styles';

export const Header = () => {
    const { user, signOut } = useAuth();
    const [term, setTerm] = useState('');

    return (
        <Nav>
            <Container>
                <Link to="/">
                    <Img src={logo} alt="logo" />
                </Link>

                <ContainerSearch>
                    <FiSearch color="#ccc" size={15} />
                    <Input
                        placeholder="Buscar"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />

                    {term.length > 0 && <SearchContainer />}
                </ContainerSearch>

                <ContainerOptions>
                    <Link to={`/profile/${user.username}`}>
                        <FaUser color="#222" size={25} />
                    </Link>

                    <FaSignOutAlt color="#222" onClick={signOut} />
                </ContainerOptions>
            </Container>
        </Nav>
    )
}
