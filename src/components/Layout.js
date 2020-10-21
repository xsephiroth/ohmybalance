import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.primary};
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
