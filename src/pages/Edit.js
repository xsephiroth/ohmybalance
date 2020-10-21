import React from "react";
import { Layout, NavigationBar, AmountInput } from "../components";

const Edit = () => {
  return (
    <Layout>
      <NavigationBar
        start={<NavigationBar.Back />}
        center={<NavigationBar.Center>Hello</NavigationBar.Center>}
      />
      <AmountInput />
    </Layout>
  );
};

export default Edit;
