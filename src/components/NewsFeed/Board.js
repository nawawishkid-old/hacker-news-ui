import React from "react";
import styled from "styled-components";

const NewsFeedBoard = styled(({ children, className }) => (
  <div className={"newsfeed-board " + className}>{children}</div>
))`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default NewsFeedBoard;
