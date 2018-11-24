import React from "react";
import styled from "styled-components";

const HeaderBar = styled(props => (
  <div {...props}>
    <center>Header</center>
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
