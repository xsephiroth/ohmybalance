import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { Layout, Card, Bill, FloatButton, MonthSelector } from "../components";
import { fetchMonthBills } from "../api";
import { formatDateText } from "../utils";

const InfoText = styled.p`
  color: white;
  text-align: center;
`;

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
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const onChange = (e) => {
    const d = new Date(e.target.value);
    setYear(d.getFullYear());
    setMonth(d.getMonth() + 1);
  };

  return [year, month, onChange];
};

const Bills = () => {
  const history = useHistory();
  const [year, month, handleYearMonthChange] = useYearMonth();
  const query = useQuery(["monthBills", year, month], fetchMonthBills, {
    enabled: year && month,
  });
  const { data: bills, isLoading, isSuccess, isError, error } = query;

  const groupDateBills = useGroupDateBills(bills);

  return (
    <Layout>
      <MonthSelector
        value={`${year}-${month}`}
        onChange={handleYearMonthChange}
      />
      {isLoading && <InfoText>Loading...</InfoText>}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && groupDateBills.length === 0 && (
        <InfoText>暂无账单</InfoText>
      )}
      {isSuccess &&
        groupDateBills.map((dateBills) => (
          <>
            <Card key={dateBills.date}>
              <Card.Header>{dateBills.date}</Card.Header>
              <Card.Body>
                {dateBills.bills.map((bill) => (
                  <Bill key={bill._id} bill={bill} />
                ))}
              </Card.Body>
            </Card>

            <Card key={dateBills.date}>
              <Card.Header>{dateBills.date}</Card.Header>
              <Card.Body>
                {dateBills.bills.map((bill) => (
                  <Bill key={`${bill._id}-1`} bill={bill} />
                ))}
              </Card.Body>
            </Card>
            <Card key={dateBills.date}>
              <Card.Header>{dateBills.date}</Card.Header>
              <Card.Body>
                {dateBills.bills.map((bill) => (
                  <Bill key={`${bill._id}-2`} bill={bill} />
                ))}
              </Card.Body>
            </Card>
          </>
        ))}
      <FloatButton onClick={() => history.push("/bill")}>+</FloatButton>
    </Layout>
  );
};

export default Bills;
