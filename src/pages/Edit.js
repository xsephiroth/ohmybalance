import React from "react";
import styled from "styled-components";
import { Layout, NavigationBar, CategoryBtn, AmountInput } from "../components";

const Categories = styled.div``;

const Edit = () => {
  return (
    <Layout>
      <NavigationBar
        start={<NavigationBar.Back />}
        center={<NavigationBar.Center>Hello</NavigationBar.Center>}
      />
      <Categories>
        <CategoryBtn>美妆</CategoryBtn>
        <CategoryBtn>日用品</CategoryBtn>
      </Categories>
      <AmountInput />
    </Layout>
  );
};

export default Edit;
