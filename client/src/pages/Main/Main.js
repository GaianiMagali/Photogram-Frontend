import React, { useEffect } from 'react';
import { Profile } from '../../components/Profile/Profile';
import { Spinner } from '../../components/Spinner/Spinner';
import { useAuth } from '../../hooks/auth';
import { Layout } from '../Layout/Layout';
import { EmptyMessage } from '../../components/EmptyMessage/EmptyMessage';

import { Aside, ContainerOwner, ContainerFollows, ContainerFooter, ContainerFeeds, Container } from './styles';
import { useFollow } from '../../hooks/follow';
import { useFeed } from '../../hooks/feed';
import { CardFeed } from '../../components/CardFeed/CardFeed';

export const Main = () => {
    const { user } = useAuth();
    const { follows, loading, getFollows } = useFollow();
    const { feeds, getFeeds } = useFeed()

    useEffect(() => {
        getFollows();
        getFeeds();
    }, [])

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
                    {feeds && feeds.map(feed => (
                        <CardFeed key={feed.photo.id} feed={feed} />
                    ))}
                </ContainerFeeds>
            </Container>
        </Layout>
    )
}
