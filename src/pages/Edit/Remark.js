import React from "react";
import styled from "styled-components";

const Container = styled.textarea`
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
  color: ${({ theme }) => theme.color.primary};
  padding: 5px;
`;

const Remark = () => {
  return <Container rows={2}>abc</Container>;
};

export default Remark;
