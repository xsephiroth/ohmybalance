import React from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  padding: 4px 8px;
  border-radius: 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
  color: ${({ theme }) => theme.color.primary};

  ${css`
    ${({ active, theme }) =>
      active && `border: 1px solid ${theme.color.secondary}`}
  `}
`;

const CategoryBtn = ({ children, ...restProps }) => {
  return <Button {...restProps}>{children}</Button>;
};

export default CategoryBtn;
