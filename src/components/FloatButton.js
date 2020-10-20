import React from "react";
import styled from "styled-components";

const Button = styled.button`
  outline: none;
  border: none;
  color: white;
  font-size: 1.8rem;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #5ed1e7;
  cursor: pointer;
  transition: 0.05s all;
  -webkit-tap-highlight-color: transparent;

  position: fixed;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  transform: translate(-50%, -50%);

  &:active {
    filter: brightness(0.8);
  }
`;

const FloatButton = ({
  children,
  top,
  right,
  bottom = 0,
  left = "50%",
  ...restProps
}) => {
  return (
    <Button top={top} right={right} bottom={bottom} left={left} {...restProps}>
      {children}
    </Button>
  );
};

export default FloatButton;
