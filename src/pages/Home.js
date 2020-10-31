import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { Layout, Card, Bill, FloatButton } from "../components";
import { fetchMonthBills } from "../api";
import { formatDateText } from "../utils";

const useGroupDateBills = (bills = []) => {
  const groupDateBills = useMemo(() => {
    const final = [];
    let currentDate;
    let cursor; // current date bills cursor

    bills.forEach((bill) => {
      const billDateText = formatDateText(bill.date);
      if (currentDate !== billDateText) {
        // is new date
        currentDate = billDateText;
        cursor = [];
        final.push({ date: billDateText, bills: cursor });
      }
      cursor.push(bill);
    });

    return final;
  }, [bills]);

  return groupDateBills;
};

const useYearMonth = () => {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  useEffect(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth() + 1);
  }, []);
  return [year, month];
};

const Home = () => {
  const history = useHistory();
  const [year, month] = useYearMonth();
  const query = useQuery(["monthBills", year, month], fetchMonthBills, {
    enabled: year && month,
  });
  const { data: bills, isLoading, isSuccess, isError, error } = query;

  const groupDateBills = useGroupDateBills(bills);

  return (
    <Layout>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && groupDateBills.length === 0 && (
        <p style={{ color: "white" }}>暂无账单</p>
      )}
      {isSuccess &&
        groupDateBills.map((dateBills) => (
          <Card key={dateBills.date}>
            <Card.Header>{dateBills.date}</Card.Header>
            <Card.Body>
              {dateBills.bills.map((bill) => (
                <Bill key={bill._id} bill={bill} />
              ))}
            </Card.Body>
          </Card>
        ))}
      <FloatButton onClick={() => history.push("/bill")}>+</FloatButton>
    </Layout>
  );
};

export default Home;
