import React from "react";
import { NavigationBar } from "../components";

const Edit = () => {
  return (
    <>
      <NavigationBar
        start={<NavigationBar.Back />}
        center={<NavigationBar.Center>Hello</NavigationBar.Center>}
      />
      <h1>CreateBill</h1>
    </>
  );
};

export default Edit;
