import React from "react";
import styled from "styled-components";
import CommentDetail from "./Detail";
import CommentLoader from "./Loader";

const CommentSingle = styled(({ data, className }) => (
  <div className={"story-comment " + className}>
    <CommentDetail author={data.by} time={data.time} />
    <div
      className="story-comment-content"
      dangerouslySetInnerHTML={{ __html: data.text }}
    />
    {data.kids ? <CommentLoader commentIds={data.kids} /> : null}
  </div>
))`
  padding: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid blue;
`;

export default CommentSingle;
