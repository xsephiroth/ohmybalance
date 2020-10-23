import React, { useState } from "react";
import styled from "styled-components";

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
  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  });

  return (
    <>
      <Button>
        <DateInput value={date} onChange={(e) => setDate(e.target.value)} />
        {date}
      </Button>
    </>
  );
};

export default DatePicker;
