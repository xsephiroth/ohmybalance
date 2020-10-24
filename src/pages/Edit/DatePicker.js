import React, { useMemo } from "react";
import styled from "styled-components";
import { useBill } from "./BillContext";

const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 5px;
  color: ${({ theme }) => theme.color.primary};
  -webkit-tap-highlight-color: transparent;
  position: relative;
`;

const DateInput = styled.input.attrs({ type: "date" })`
  min-width: 30px;
  width: 100%;
  outline: 1px solid red;
  border: 0;
  position: absolute;
  opacity: 0;

  // 隐藏icon触发点击日历事件
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    width: 100%;
    left: -30px;
  }
`;

const DatePicker = () => {
  const { bill, setBill } = useBill();

  const date = useMemo(() => {
    const d = bill.date;
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  }, [bill.date]);

  const handleChange = (e) => {
    e.persist();
    setBill((b) => ({ ...b, date: new Date(e.target.value) }));
  };

  return (
    <>
      <Button>
        <DateInput value={date} onChange={handleChange} />
        {date}
      </Button>
    </>
  );
};

export default DatePicker;
