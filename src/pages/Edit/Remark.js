import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { remarkState } from "./state";

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
  const [remark, setRemark] = useRecoilState(remarkState);

  return (
    <Container
      rows={2}
      value={remark}
      onChange={(e) => setRemark(e.target.value)}
      placeholder="备注"
    />
  );
};

export default Remark;
