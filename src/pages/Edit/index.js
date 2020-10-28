import React, { useEffect } from "react";
import styled from "styled-components";
import { Layout, NavigationBar } from "../../components";
import BillTypeSwitch from "./BillTypeSwitch";
import Categories from "./Categories";
import Remark from "./Remark";
import DatePicker from "./DatePicker";
import Amount from "./Amount";
import AmountKeyboard from "./AmountKeyboard";
import { useResetRecoilState } from "recoil";
import { billState } from "./state";

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
  const resetBill = useResetRecoilState(billState);
  useEffect(() => {
    return resetBill;
  }, [resetBill]);

  return (
    <Layout>
      <React.Suspense fallback={<p>Loading...</p>}>
        <NavigationBar
          start={<NavigationBar.Back />}
          center={
            <NavigationBar.Center>
              <BillTypeSwitch />
            </NavigationBar.Center>
          }
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
      </React.Suspense>
    </Layout>
  );
};

export default Edit;
