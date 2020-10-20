import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  width: 80%;
  margin: 10px auto;

  & + & {
    margin: 10px auto;
  }
`;

const Header = styled.div``;

const Body = styled.div``;

const Card = ({ children }) => {
  return <Container>{children}</Container>;
};

Card.Header = Header;
Card.Body = Body;

export default Card;
