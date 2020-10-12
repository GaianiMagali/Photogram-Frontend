import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useSearch } from '../../hooks/search';
import { SearchContainer } from '../Search/SearchContainer';
import { ModalUploadPhoto } from '../Modal/ModalUploadPhoto';

import logo from '../../assets/logo.svg';
import { FiSearch } from 'react-icons/fi';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Nav, Container, Img, ContainerSearch, Input, ContainerOptions } from './styles';

let time = null;

export const Header = () => {
    const { user, signOut } = useAuth()
    const { searchAction, setUsers, setLoading } = useSearch();
    const [term, setTerm] = useState('');

    useEffect(() => {
        clearTimeout(time);

        if (term.trim()) {
            setLoading(true);
            time = setTimeout(() => {
                searchAction(term);
            }, 1000)
        }

        return () => {
            setUsers([]);
        }
    }, [searchAction, setLoading, setUsers, term])

    const toggleClose = useCallback(() => {
        setTerm("");
    }, []);

    return (
        <Nav>
            <Container>
                <Link to="/">
                    <Img src={logo} alt="logo" />
                </Link>


                <ContainerSearch>
                    <FiSearch color="#ccc" size={15} />
                    <Input placeholder="Buscar" value={term} onChange={(e) => setTerm(e.target.value)} />
                    {term.length > 0 && <SearchContainer toggleClose={toggleClose} />}
                </ContainerSearch>

                <ContainerOptions>
                    <ModalUploadPhoto />

                    <Link to={`/profile/${user.username}`} style={{ marginLeft: '15px' }}>
                        <FaUser color="#222" size={25} />
                    </Link>

                    <FaSignOutAlt color="#222" size={25} onClick={signOut} />
                </ContainerOptions>

            </Container>
        </Nav>
    )
}
