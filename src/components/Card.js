import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 5px;
  width: 94%;
  margin: 0 auto 10px;

  background-color: ${({ theme }) => theme.backgroundColor.secondary};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  & + & {
    margin: 10px auto;
  }
`;

const Header = styled.div`
  color: ${(props) => props.theme.color.primary};
  padding: 10px;
`;

const Body = styled.div``;

const Card = ({ children }) => {
  return <Container>{children}</Container>;
};

Card.Header = Header;
Card.Body = Body;

export default Card;
