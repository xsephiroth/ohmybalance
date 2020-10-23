import React from "react";
import styled from "styled-components";

const Container = styled.textarea`
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
  color: ${({ theme }) => theme.color.primary};
  padding: 5px;
  resize: none;
`;

const Remark = () => {
  return (
    <Container
      rows={2}
      value={"abc"}
      onChange={(e) => console.log(e.target.value)}
    />
  );
};

export default Remark;
