import React from "react";
import styled from "styled-components";
import { useBill } from "./BillContext";

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
  const { bill, setBill } = useBill();

  const handleChange = (e) => {
    e.persist();
    setBill((b) => ({ ...b, remark: e.target.value }));
  };

  return (
    <Container
      rows={2}
      value={bill.remark}
      onChange={handleChange}
      placeholder="备注"
    />
  );
};

export default Remark;
