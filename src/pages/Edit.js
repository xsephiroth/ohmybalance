import React from "react";
import { Layout, NavigationBar } from "../components";

const Edit = () => {
  return (
    <Layout>
      <NavigationBar
        start={<NavigationBar.Back />}
        center={<NavigationBar.Center>Hello</NavigationBar.Center>}
      />
      <h1>CreateBill</h1>
    </Layout>
  );
};

export default Edit;
