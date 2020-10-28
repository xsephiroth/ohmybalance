import React, { useRef, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { Layout, Card, Bill, FloatButton } from "../components";
import { fetchBills } from "../api";
import { formatDateText } from "../utils";

const useGroupDateBills = (groups = []) => {
  const groupDateBills = useMemo(() => {
    const final = [];
    let currentDate;
    let cursor; // current date bills cursor

    groups.map((group) =>
      group.map((bill) => {
        const billDateText = formatDateText(bill.date);
        if (currentDate !== billDateText) {
          // is new date
          currentDate = billDateText;
          cursor = [];
          final.push({ date: billDateText, bills: cursor });
        }
        cursor.push(bill);
      })
    );

    return final;
  }, [groups]);

  return groupDateBills;
};

const Home = () => {
  const history = useHistory();
  const skipRef = useRef(0);

  const query = useInfiniteQuery("bills", fetchBills, {
    staleTime: 60 * 1000,
  });
  const {
    data: groups,
    isLoading,
    isSuccess,
    isError,
    error,
    fetchMore,
  } = query;

  const loadMore = () => {
    skipRef.current += 2;
    fetchMore(skipRef.current);
  };

  const groupDateBills = useGroupDateBills(groups);

  return (
    <Layout>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
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
      <button onClick={loadMore}>More</button>
      <FloatButton onClick={() => history.push("/add")}>+</FloatButton>
    </Layout>
  );
};

export default Home;
