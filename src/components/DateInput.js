import styled from "styled-components";

const DateInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  border: 0;
  opacity: 0;

  // 隐藏icon触发点击日历事件
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    width: 100%;
    left: -30px;
  }
`;

export default DateInput;
