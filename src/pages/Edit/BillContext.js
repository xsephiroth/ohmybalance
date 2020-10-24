import React, { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchBill } from "../../api";

const BillContext = createContext();

const initialBill = () => ({
  type: "EXPENSE",
  category: "",
  amount: 0,
  remark: "",
  date: new Date(),
});

export const BillProvider = ({ children }) => {
  const billId = new URLSearchParams(useLocation().search).get("id");
  const [bill, setBill] = useState(initialBill);

  const reset = () => setBill(initialBill());

  useQuery(["bill", billId], fetchBill, {
    enabled: !!billId,
    onSuccess: (b) => setBill(b),
  });

  return (
    <BillContext.Provider value={{ bill, setBill, reset }}>
      {children}
    </BillContext.Provider>
  );
};

export const useBill = () => useContext(BillContext);
