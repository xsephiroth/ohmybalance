import React from "react";
import { useHistory } from "react-router-dom";

const CreateBill = () => {
  const history = useHistory();
  return (
    <>
      <button onClick={() => history.push("/")}>Home</button>
      <h1>CreateBill</h1>
    </>
  );
};

export default CreateBill;
