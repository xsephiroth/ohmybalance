import React from "react";
import { useHistory } from "react-router-dom";
import { Layout, Card, Bill, FloatButton } from "../components";

const Home = () => {
  const history = useHistory();

  const bill1 = {
    amount: 10,
    type: "EXPENSE",
    category: "日用",
    remark: "备注了些东备注了些备注了些东备注了些东西西西西西",
  };

  const bill2 = {
    amount: 185,
    type: "INCOME",
    category: "日用",
    remark: "备注了些东备注了些东注了些东备注了些东西西西西西",
  };
  return (
    <Layout>
      <Card>
        <Card.Body>
          <>
            <Bill bill={bill1} />
            <Bill bill={bill2} />
          </>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <>
            <Bill bill={bill1} />
            <Bill bill={bill2} />
          </>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <>
            <Bill bill={bill1} />
            <Bill bill={bill2} />
          </>
        </Card.Body>
      </Card>
      <FloatButton onClick={() => history.push("/add")}>+</FloatButton>
    </Layout>
  );
};

export default Home;
