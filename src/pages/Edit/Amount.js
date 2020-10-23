import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  text-align: right;
  color: ${({ theme }) => theme.color.expense};
  font-weight: 900;
  font-size: 1.5em;
  padding: 8px;
`;

const Amount = () => {
  return <Container>0</Container>;
};

export default Amount;
