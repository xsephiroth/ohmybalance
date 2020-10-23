import { selectorFamily } from "recoil";

const mockBills = [
  {
    year: 2020,
    month: 9,
    date: 11,
    type: "EXPENSE",
    amount: 10,
    category: "美妆",
    remark: "不知道买了什么",
  },
  {
    year: 2020,
    month: 10,
    date: 11,
    type: "EXPENSE",
    amount: 10,
    category: "美妆",
    remark: "不知道买了什么",
  },
  {
    year: 2020,
    month: 10,
    date: 11,
    type: "EXPENSE",
    amount: 100,
    category: "日用品",
    remark: "没有备注",
  },
  {
    year: 2020,
    month: 10,
    date: 12,
    type: "INCOME",
    amount: 500.5,
    category: "收入",
    remark: "",
  },
];

export const monthBillsSelector = selectorFamily({
  key: "monthBills",
  get: (year, month) => () => {
    return mockBills.filter(
      (bill) => bill.year === year && bill.month === month
    );
  },
});
