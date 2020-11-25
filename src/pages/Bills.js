import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { useQuery } from "react-query";
import {
  Layout,
  Card,
  Bill,
  FloatButton,
  MonthSelector,
  LoadingFallback,
} from "../components";
import { fetchMonthBills } from "../api";
import { formatDateText } from "../utils";
import { useScrollY } from "../hooks";

const InfoText = styled.p`
  color: white;
  text-align: center;
`;

const AutoDisplayFloatButton = styled(FloatButton)`
  transition: transform 0.5s;
  transform: translate(-50%, ${(props) => (props.show ? "-50%" : "100px")});
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

  const groupDateStatsBills = useMemo(() => {
    return groupDateBills.map((dateBills) => {
      const stats = dateBills.bills.reduce(
        (acc, bill) => {
          switch (bill.type) {
            case "income":
              return { ...acc, income: acc.income + bill.amount };
            case "expense":
              return { ...acc, expense: acc.expense + bill.amount };
            default:
              return acc;
          }
        },
        { expense: 0, income: 0 }
      );

      // fixed float
      stats.expense = parseFloat(stats.expense.toFixed(2));
      stats.income = parseFloat(stats.income.toFixed(2));

      return { ...dateBills, stats };
    });
  }, [groupDateBills]);

  return groupDateStatsBills;
};

const useYearMonth = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const onChange = (e) => {
    const d = new Date(e.target.value);
    const y = d.getFullYear();
    const mon = d.getMonth();

    if (Number.isNaN(y) || Number.isNaN(mon)) return;

    setYear(y);
    setMonth(mon + 1);
  };

  return [year, month, onChange];
};

const useShowAddButton = () => {
  const scrollY = useScrollY();
  const showAddButton = scrollY !== "down";
  return showAddButton;
};

const StyledDateBillHeader = styled(Card.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .stats {
  }
  .income {
    color: ${(props) => props.theme.color.income};
  }
  .expense {
    color: ${(props) => props.theme.color.expense};
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const BillTypeStat = styled.p`
  &::before {
    color: white;
    margin-right: 3px;
  }

  // income
  ${(props) =>
    props.income &&
    css`
      color: ${(props) => props.theme.color.income};
      &::before {
        content: "收:";
      }
    `}

  // expense
  ${(props) =>
    props.expense &&
    css`
      color: ${(props) => props.theme.color.expense};
      margin-left: 5px;
      &::before {
        content: "支:";
      }
    `}
`;

const DateBillHeader = ({ date, stats }) => {
  return (
    <StyledDateBillHeader>
      <p>{date}</p>
      <Stats>
        <BillTypeStat></BillTypeStat>
        {stats.income !== 0 && (
          <BillTypeStat income>{stats.income}</BillTypeStat>
        )}
        <BillTypeStat expense>{stats.expense}</BillTypeStat>
      </Stats>
    </StyledDateBillHeader>
  );
};

const Bills = () => {
  const history = useHistory();
  const showAddButton = useShowAddButton();
  const [year, month, handleYearMonthChange] = useYearMonth();
  const query = useQuery(["monthBills", year, month], fetchMonthBills, {
    enabled: year && month,
  });
  const { data: bills, isLoading, isSuccess, isError, error } = query;

  const groupDateBills = useGroupDateBills(bills);

  return (
    <Layout style={{ padding: "10px 0" }}>
      <MonthSelector
        value={`${year}-${month}`}
        onChange={handleYearMonthChange}
      />
      {isLoading && <LoadingFallback />}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && groupDateBills.length === 0 && (
        <InfoText>暂无账单</InfoText>
      )}
      {isSuccess &&
        groupDateBills.map((dateBills) => (
          <Card key={dateBills.date}>
            <DateBillHeader date={dateBills.date} stats={dateBills.stats} />
            <Card.Body>
              {dateBills.bills.map((bill) => (
                <Bill key={bill._id} bill={bill} />
              ))}
            </Card.Body>
          </Card>
        ))}
      <AutoDisplayFloatButton
        show={showAddButton}
        onClick={() => history.push("/bill")}
      >
        +
      </AutoDisplayFloatButton>
    </Layout>
  );
};

export default Bills;
