import React, { memo } from "react";
import styled, { useTheme } from "styled-components";

const Container = styled.div`
  width: 100vw;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.25fr;
  grid-template-rows: repeat(1fr, 4);
`;

const Key = styled.button`
  outline: none;
  border: none;
  padding: 15px;
  color: ${({ theme }) => theme.color.primary};
  -webkit-tap-highlight-color: transparent;
  background-color: ${({ backgroundColor: bgc }) =>
    bgc ? bgc : "transparent"};
  &:active {
    filter: opacity(0.8);
    background-color: ${({ theme }) => theme.backgroundColor.primary};
  }
`;

const useSaveBtnColor = (type) => {
  const theme = useTheme();
  switch (type) {
    case "EXPENSE":
      return theme.color.expense;
    case "INCOME":
      return theme.color.income;
    default:
      return "";
  }
};

const AmountInput = memo(() => {
  const saveBtnColor = useSaveBtnColor("EXPENSE");

  return (
    <Container>
      <InputWrapper>
        <Key>1</Key>
        <Key>2</Key>
        <Key>3</Key>
        <Key>Del</Key>
        <Key>4</Key>
        <Key>5</Key>
        <Key>6</Key>
        <Key>-</Key>
        <Key>7</Key>
        <Key>8</Key>
        <Key>9</Key>
        <Key>+</Key>
        <Key>再记</Key>
        <Key>0</Key>
        <Key>.</Key>
        <Key backgroundColor={saveBtnColor}>保存</Key>
      </InputWrapper>
    </Container>
  );
});

export default AmountInput;
