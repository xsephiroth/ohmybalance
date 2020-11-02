import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryCache } from "react-query";
import styled, { css } from "styled-components";
import { useLongPress } from "../hooks";
import { deleteBill } from "../api";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 4em;
  padding: 5px;
  cursor: pointer;
  -webkit-user-select: none;

  position: relative; // for extra
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
`;

const Dot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: block;
  margin: 3px;
`;

const DotIncome = styled(Dot)`
  background-color: ${({ theme }) => theme.color.income};
`;
const DotExpense = styled(Dot)`
  background-color: ${({ theme }) => theme.color.expense};
`;

const Main = styled.div`
  flex: 1;

  display: flex;
  justify-content: space-between;

  & > * {
    margin: 0 1em;
  }
`;

const Category = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 400;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.color.primary};
`;

const Remark = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.secondary};

  max-width: 60vw;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Amount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme, type }) =>
    type === "income" ? theme.color.income : theme.color.expense};

  ::before {
    content: "${({ type }) => (type === "income" ? "+" : "-")}";
  }
`;

const ExtraButton = styled.button`
  border: none;
  outline: none;
  padding: 5px 15px;
  border-radius: 5px;

  ${(props) =>
    props.isDelete &&
    css`
      color: white;
      background-color: #eb4d4b;
    `}
`;

const Bill = ({ bill }) => {
  const history = useHistory();
  const [showExtra, setShowExtra] = useState(false);

  const longPressRef = useLongPress(500, {
    onClick: () => history.push(`/bill?id=${bill._id}`),
    onLongPress: () => setShowExtra(true),
  });

  const onCancel = () => setShowExtra(false);

  const queryCache = useQueryCache();
  const [mutateDeleteBill] = useMutation(deleteBill, {
    onSuccess: () => queryCache.invalidateQueries("monthBills"),
  });
  const onDelete = () => mutateDeleteBill(bill._id);

  const { type, category, remark, amount } = bill;

  return (
    <>
      {showExtra ? (
        <Container>
          <ExtraButton onClick={onDelete} isDelete>
            删除
          </ExtraButton>
          <ExtraButton onClick={onCancel}>取消</ExtraButton>
        </Container>
      ) : (
        <Container onClick={(e) => e.stopPropagation()} ref={longPressRef}>
          <Icon>
            {type === "income" && <DotIncome />}
            {type === "expense" && <DotExpense />}
          </Icon>
          <Main>
            <div>
              <Category>{category || "未分类"}</Category>
              <Remark>{remark}</Remark>
            </div>
            <Amount type={type}>{amount}</Amount>
          </Main>
        </Container>
      )}
    </>
  );
};

export default Bill;
