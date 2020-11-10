import React, { useEffect, useState, useRef } from 'react';
import { Spinner } from '../../components/Spinner/Spinner';
import { useAuth } from '../../hooks/auth';
import { Layout } from '../Layout/Layout';
import { EmptyMessage } from '../../components/EmptyMessage/EmptyMessage';
import { Aside, ContainerOwner, ContainerFollows, ContainerFooter, ContainerFeeds, Container } from './styles';
import { useFollow } from '../../hooks/follow';
import { Profile } from '../../components/Profile/Profile';
import { useFeed } from '../../hooks/feed';
import { CardFeed } from '../../components/CardFeed/CardFeed';

import { v4 as uuidv4 } from 'uuid';

export const Main = () => {
    const [page, setPage] = useState(1);
    const { user } = useAuth();
    const { follows, loading, getFollows } = useFollow();
    const { feeds, getFeeds, totalFeeds, setFeeds } = useFeed();

    useEffect(() => {
        getFollows();
        //setFeeds([])
        getFeeds(page)

        return () => {
            setFeeds([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (page > 1 && Math.ceil(totalFeeds / 2)) {
            getFeeds(page);
        }
    }, [page])


    const observer = useRef(
        new IntersectionObserver(
            async entries => {
                const first = entries[0];
                if (first.isIntersecting) {
                    setPage((state) => state + 1);
                }
            },
            {
                threshold: 0.2
            }
        )
    )

    const [element, setElement] = useState(null);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        //destruye el observador
        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        }
    }, [element])


    return (
        <Layout>
            <Container>
                <Aside>
                    <ContainerOwner>
                        <Profile
                            img={user && user.avatar_url}
                            username={user && user.username}
                            isOwner
                            name={user && user.name}
                        />
                    </ContainerOwner>

                    <ContainerFollows>
                        {follows &&
                            follows.map(follow => (
                                <Profile
                                    key={follow.id}
                                    direction="column"
                                    img={follow.avatar_url}
                                    usidebar
                                    username={follow.username}
                                    name={follow.name}
                                />
                            ))
                        }

                        {follows && follows.length === 0 && loading === false && (
                            <EmptyMessage message="No sigues nadie, empieza a seguir a tus amigos" />
                        )}

                        {loading && <Spinner />}
                    </ContainerFollows>

                    <ContainerFooter>
                        Información - AyudaPrensa - API - Empleo - Privacidad - Condiciones -
                        Directorio - Perfiles - Hashtags - Idioma
                </ContainerFooter>
                </Aside>

                <ContainerFeeds>
                    {feeds && feeds.map((feed) => (
                        <CardFeed key={uuidv4()} feed={feed} />
                    ))}

                    {!!feeds && feeds.length > 0 && (
                        <button
                            ref={setElement}
                            style={{
                                width: "100%",
                                height: "100px",
                                marginBottom: "10px",
                                display: "block",
                                background: "transparent",
                                border: "none"
                            }}
                        />
                    )}
                </ContainerFeeds>
            </Container>
        </Layout>
    )
}
