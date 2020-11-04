import React from "react";
import styled, { css, keyframes } from "styled-components";
import Layout from "./Layout";

const Container = styled(Layout)`
  position: relative;
`;

const spin = keyframes`
from {
    transform: rotate(0deg) translate(-50%, -50%);
}
to {
    transform: rotate(360deg) translate(-50%, -50%);
}
`;

const shared = css`
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  border: 3px solid transparent;
  animation: ${spin} 1s infinite linear;
  transform-origin: top left;
`;

const Loading = styled.span`
  ${shared}
  width: 8em;
  height: 8em;
  border-top-color: #c7421a;

  &::before {
    ${shared}
    content: '';
    width: 7em;
    height: 7em;
    border-left-color: #e9ec2f;
  }

  &::after {
    ${shared}
    content: '';
    width: 6em;
    height: 6em;
    border-bottom-color: #16a085;
  }
`;

const LoadingFallback = () => {
  return (
    <Container>
      <Loading />
    </Container>
  );
};

export default LoadingFallback;
