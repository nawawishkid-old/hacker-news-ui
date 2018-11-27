import React from "react";
import styled from "styled-components";
import CommentAuthor from "./Author";
import CommentTime from "./Time";

const CommentDetail = styled(({ author, time, className }) => (
  <div className={"story-comment-detail " + className}>
    <small>
      <CommentAuthor authorId={author} />
      <CommentTime time={time} />
    </small>
  </div>
))`
  padding-bottom: 0.5em;

  & > small > span {
    padding-right: 1em;
  }
`;

export default CommentDetail;
