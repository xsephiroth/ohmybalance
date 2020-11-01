import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DateInput } from "../../components";
import { billDateState } from "./state";
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

const DatePicker = React.memo(() => {
  const [date, setDate] = useRecoilState(billDateState);
  const dateText = formatDateText(date);

  return (
    <>
      <Button>
        <DateInput
          type="date"
          value={dateText}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        {dateText}
      </Button>
    </>
  );
});

export default DatePicker;
