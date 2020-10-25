import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { Layout, Card, Bill, FloatButton } from "../components";
import { fetchBills } from "../api";
import { formatDateText } from "../utils";

const Home = () => {
  const history = useHistory();

  const [dateBills, setDateBills] = useState([]);
  const { data: bills, isLoading } = useQuery("bills", fetchBills);
  useEffect(() => {
    if (!bills) return;

    const groups = {};
    bills.forEach((bill) => {
      const dateText = formatDateText(new Date(bill.date));
      if (dateText in groups) {
        groups[dateText].push(bill);
      } else {
        groups[dateText] = [bill];
      }
    });

    setDateBills([...Object.entries(groups)].sort((a, b) => b - a));
  }, [bills]);

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      {bills.map((bill) => (
        <Card>
          <Card.Body>
            <>
              <Bill bill={bill} />
            </>
          </Card.Body>
        </Card>
      ))}
      <FloatButton onClick={() => history.push("/add")}>+</FloatButton>
    </Layout>
  );
};

export default Home;
