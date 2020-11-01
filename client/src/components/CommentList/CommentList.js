import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from "react-timeago";
import spanishString from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { Container, Comment, TimeAgo as StyleTimeAgo } from './styles';

const formatter = buildFormatter(spanishString);

const CommentList = React.memo(({ comments }) => {

    return (
        <Container>
            {comments &&
                comments.map(comment => (
                    <Comment key={comment.id}>
                        <div>
                            <Link to={`/profile/${comment.postedBy.username}`}>
                                {comment.postedBy.username}
                            </Link>
                            <span>
                                {comment.body.length > 50
                                    ? comment.body.substr(0, 49) + "..."
                                    : comment.body
                                }
                            </span>
                        </div>

                        <StyleTimeAgo>
                            <TimeAgo date={`${comment.createdAt}Z`} formatter={formatter} />
                        </StyleTimeAgo>
                    </Comment>
                ))
            }
        </Container>
    )
})

export default CommentList;
