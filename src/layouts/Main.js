import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { APP_NAME } from "../config";

const HeaderBar = styled(props => (
  <div {...props}>
    <center>
      <Link to="/">{APP_NAME}</Link>
    </center>
  </div>
))`
  box-shadow: 0 1px 4px -1px black;
`;
const ContentBox = styled(({ children, ...rest }) => (
  <div {...rest}>{children}</div>
))``;
const Footer = styled(props => (
  <div {...props}>
    <center>Footer</center>
  </div>
))`
  padding: 1em;
`;

export default ({ children }) => (
  <>
    <HeaderBar />
    <ContentBox>{children}</ContentBox>
    <Footer />
  </>
);
