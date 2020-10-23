import React from "react";
import { Layout, NavigationBar } from "../../components";
import Categories from "./Categories";
import Remark from "./Remark";
import AmountKeyboard from "./AmountKeyboard";

const Edit = () => {
  return (
    <Layout>
      <NavigationBar
        start={<NavigationBar.Back />}
        center={<NavigationBar.Center>Hello</NavigationBar.Center>}
      />
      <Categories />
      <Remark />
      <AmountKeyboard />
    </Layout>
  );
};

export default Edit;
