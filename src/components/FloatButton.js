import React from "react";
import styled from "styled-components";

const Button = styled.button`
  outline: none;
  border: none;
  font-size: 1.8rem;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.05s all;
  -webkit-tap-highlight-color: transparent;

  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};

  position: fixed;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  transform: translate(-50%, -50%);

  &:active {
    filter: opacity(0.8);
  }
`;

const FloatButton = ({
  children,
  top,
  right,
  bottom = 0,
  left = "50%",
  color = "white",
  bgColor = "rgba(94, 209, 231, 1)",
  ...restProps
}) => {
  return (
    <Button
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      color={color}
      bgColor={bgColor}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default FloatButton;
