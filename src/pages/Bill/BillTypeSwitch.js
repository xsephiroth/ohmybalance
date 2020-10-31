import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { billTypeState } from "./state";

const Container = styled.div`
  display: flex;
  grid-gap: 5px;
`;

const BillTypeSwitch = React.memo(() => {
  const [billType, setBillType] = useRecoilState(billTypeState);

  return (
    <Container>
      <label>
        <input
          type="radio"
          checked={billType === "expense"}
          onChange={() => setBillType("expense")}
        />{" "}
        支
      </label>
      <label>
        <input
          type="radio"
          checked={billType === "income"}
          onChange={() => setBillType("income")}
        />{" "}
        收
      </label>
    </Container>
  );
});

export default BillTypeSwitch;
