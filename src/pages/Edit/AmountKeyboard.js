import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryCache } from "react-query";
import styled, { useTheme } from "styled-components";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { billAmountState, billState } from "./state";
import { createBill, updateBill } from "../../api";

const Container = styled.div`
  width: 100vw;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
  display: ${({ hide }) => (hide ? "none" : "auto")};
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
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

const SaveKey = styled(Key)`
  grid-column: 4 / 5;
  grid-row: 3 / 5;
`;

const useSaveBtnColor = (type) => {
  const theme = useTheme();
  switch (type) {
    case "expense":
      return theme.color.expense;
    case "income":
      return theme.color.income;
    default:
      return "";
  }
};

const useKeyboardHide = () => {
  const [hide, setHide] = useState(false);
  const defaultHeight = window.innerHeight - 100;

  useEffect(() => {
    const check = () => {
      setHide(window.innerHeight < defaultHeight);
    };
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, [defaultHeight]);

  return hide;
};

const useInvalidateBills = () => {
  const qc = useQueryCache();
  return useCallback(() => {
    qc.invalidateQueries("bills");
  }, [qc]);
};

const AmountKeyboard = React.memo(() => {
  // 手机设备输入法弹出时不显示金额输入部分
  const hide = useKeyboardHide();

  const bill = useRecoilValue(billState);
  const resetBill = useResetRecoilState(billState);
  const isBillCreate = !bill._id;
  const saveBtnColor = useSaveBtnColor(bill.type);

  const [amount, setAmount] = useRecoilState(billAmountState);
  const [text, setText] = useState(amount.toString());

  useEffect(() => {
    setAmount(parseFloat(text));
  }, [setAmount, text]);

  const handleNumClick = (n) => () => {
    setText((t) => {
      // 避免重复小数点
      if (n === "." && t.includes(".")) {
        return t;
      }
      return `${t}${n}`;
    });
  };

  const handleDelete = (e) => {
    e.persist();
    setText((t) => {
      const l = t.split("");
      l.pop();
      const v = l.join("");
      return v === "" ? "0" : v;
    });
  };

  const handleClear = () => setText("0");

  const history = useHistory();
  const invalidateBills = useInvalidateBills();

  const [mutateCreateBill] = useMutation(createBill, {
    onSuccess: () => history.replace("/"),
    onSettled: invalidateBills,
  });

  const [mutateUpdateBill] = useMutation(updateBill, {
    onSuccess: () => history.replace("/"),
    onSettled: invalidateBills,
  });

  const handleSave = () => {
    if (isBillCreate) {
      mutateCreateBill(bill);
    } else {
      mutateUpdateBill(bill);
    }
  };

  const [mutateCreateBillNext] = useMutation(createBill, {
    onSuccess: () => {
      resetBill();
      setText("0");
    },
    onSettled: invalidateBills,
  });

  const handleSaveNext = () => {
    mutateCreateBillNext(bill);
  };

  return (
    <Container hide={hide}>
      <InputWrapper>
        <Key onClick={handleNumClick(1)}>1</Key>
        <Key onClick={handleNumClick(2)}>2</Key>
        <Key onClick={handleNumClick(3)}>3</Key>
        <Key onClick={handleDelete}>Del</Key>
        <Key onClick={handleNumClick(4)}>4</Key>
        <Key onClick={handleNumClick(5)}>5</Key>
        <Key onClick={handleNumClick(6)}>6</Key>
        <Key onClick={handleClear}>C</Key>
        <Key onClick={handleNumClick(7)}>7</Key>
        <Key onClick={handleNumClick(8)}>8</Key>
        <Key onClick={handleNumClick(9)}>9</Key>
        <Key onClick={handleSaveNext} disabled={!isBillCreate}>
          {!isBillCreate ? "" : "再记"}
        </Key>
        <Key onClick={handleNumClick(0)}>0</Key>
        <Key onClick={handleNumClick(".")}>.</Key>
        <SaveKey backgroundColor={saveBtnColor} onClick={handleSave}>
          保存
        </SaveKey>
      </InputWrapper>
    </Container>
  );
});

export default AmountKeyboard;
