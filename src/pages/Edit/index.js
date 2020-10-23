import React from "react";
import styled from "styled-components";
import { Layout, NavigationBar } from "../../components";
import Categories from "./Categories";
import Remark from "./Remark";
import DatePicker from "./DatePicker";
import Amount from "./Amount";
import AmountKeyboard from "./AmountKeyboard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;

const Block = styled.div``;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const Edit = () => {
  return (
    <Layout>
      <NavigationBar
        start={<NavigationBar.Back />}
        center={<NavigationBar.Center>Hello</NavigationBar.Center>}
      />
      <Wrapper>
        <Categories />
        <Block>
          <Info>
            <Remark />
            <DatePicker />
            <Amount />
          </Info>
          <AmountKeyboard />
        </Block>
      </Wrapper>
    </Layout>
  );
};

export default Edit;
