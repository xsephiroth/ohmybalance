import React, { useMemo } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dateState } from "./state";
import { formatDateText } from "../../utils";

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
  const [date, setDate] = useRecoilState(dateState);
  const dateText = formatDateText(date);

  return (
    <>
      <Button>
        <DateInput
          value={dateText}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        {dateText}
      </Button>
    </>
  );
};

export default DatePicker;
