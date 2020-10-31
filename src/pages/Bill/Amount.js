import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { billState } from "./state";

const Container = styled.div`
  flex: 1;
  text-align: right;
  color: ${({ theme }) => theme.color.expense};
  font-weight: 900;
  font-size: 1.5em;
  padding: 8px;
`;

const Amount = React.memo(() => {
  const { amount } = useRecoilValue(billState);
  return <Container>{amount}</Container>;
});

export default Amount;
