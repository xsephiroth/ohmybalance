import React from "react";
import styled from "styled-components";

const colorGreen = `#59df59`;
const colorRed = `#ff7373`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px 10px;
  padding: 5px;
`;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const Dot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: block;
  margin: 3px;
`;

const DotIncome = styled(Dot)`
  background-color: ${colorGreen};
`;
const DotExpense = styled(Dot)`
  background-color: ${colorRed};
`;

const Main = styled.div`
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
  color: ${({ type }) => (type === "INCOME" ? colorGreen : colorRed)};

  ::before {
    content: "${({ type }) => (type === "INCOME" ? "+" : "-")}";
  }
`;

const Bill = ({ bill }) => {
  const { type, category, remark, amount } = bill;

  return (
    <Container>
      {type === "INCOME" && <DotIncome />}
      {type === "EXPENSE" && <DotExpense />}
      <Main>
        <Block>
          <Category>{category}</Category>
          <Remark>{remark}</Remark>
        </Block>
        <Amount type={type}>{amount}</Amount>
      </Main>
    </Container>
  );
};

export default Bill;
