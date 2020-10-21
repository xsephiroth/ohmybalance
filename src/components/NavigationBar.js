import React from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";

const activeMixin = css`
  &:active {
    filter: opacity(0.8);
  }
`;

const minWidthMixin = css`
  min-width: 10%;
`;

const Container = styled.div`
  height: 50px;
  padding: 10px;
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.backgroundColor.primary};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Start = styled.div`
  margin-left: 15px;
  font-size: 1.5em;

  ${minWidthMixin}
  ${activeMixin}
`;

const Center = styled.div`
  ${minWidthMixin}
  ${activeMixin}
`;

const End = styled.div`
  margin-right: 5px;

  ${minWidthMixin}
  ${activeMixin}
`;

const BackButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  color: inherit;
  font-size: 1.1em;
  -webkit-tap-highlight-color: transparent;
`;

const Back = ({ children, onClick, ...restProps }) => {
  const history = useHistory();
  if (!onClick) {
    onClick = () => history.goBack();
  }
  return (
    <BackButton onClick={onClick} {...restProps}>
      {children || "<"}
    </BackButton>
  );
};

const NavigationBar = ({ start, center, end }) => {
  return (
    <Container>
      <Start>{start}</Start>
      <Center>{center}</Center>
      <End>{end}</End>
    </Container>
  );
};

NavigationBar.Start = Start;
NavigationBar.Center = Center;
NavigationBar.End = End;
NavigationBar.Back = Back;

export default NavigationBar;
