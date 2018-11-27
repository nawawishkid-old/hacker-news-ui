import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CommentAuthor = styled(({ authorId, className }) => (
  <span className={className}>
    {"By "}
    <Link className="story-comment-detail-author" to={"/user/" + authorId}>
      {authorId}
    </Link>
  </span>
))``;

export default CommentAuthor;
