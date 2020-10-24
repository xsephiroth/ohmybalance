import React from "react";
import styled from "styled-components";
import { useBill } from "./BillContext";

const Container = styled.div`
  flex: 1;
  text-align: right;
  color: ${({ theme }) => theme.color.expense};
  font-weight: 900;
  font-size: 1.5em;
  padding: 8px;
`;

const Amount = () => {
  const { bill } = useBill();
  return <Container>{bill.amount}</Container>;
};

export default Amount;
