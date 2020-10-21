import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
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
  justify-content: space-around;
`;

const Category = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 400;
  margin-bottom: 5px;
`;

const Remark = styled.span`
  display: block;
  font-size: 0.8rem;
  color: #b2b2b2;

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
    type === "INCOME" ? theme.color.income : theme.color.expense};

  ::before {
    content: "${({ type }) => (type === "INCOME" ? "+" : "-")}";
  }
`;

const Bill = ({ bill }) => {
  const { type, category, remark, amount } = bill;

  return (
    <Container>
      <Icon>
        {type === "INCOME" && <DotIncome />}
        {type === "EXPENSE" && <DotExpense />}
      </Icon>
      <Main>
        <div>
          <Category>{category}</Category>
          <Remark>{remark}</Remark>
        </div>
        <Amount type={type}>{amount}</Amount>
      </Main>
    </Container>
  );
};

export default Bill;
