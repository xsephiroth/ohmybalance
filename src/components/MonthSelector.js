import React from "react";
import styled from "styled-components";
import DateInput from "./DateInput";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1em;
  margin-bottom: 1em;
`;

const StyledButton = styled.button`
  position: relative;

  display: inline-block;
  background-color: transparent;
  border: 2px solid white;
  padding: 0.5em 2em;
  border-radius: 5px;
  color: white;
`;

const MonthSelector = ({ value, onChange }) => {
  return (
    <StyledContainer>
      <StyledButton>
        <DateInput type="month" min="2000-01" onChange={onChange} />
        {value}
      </StyledButton>
    </StyledContainer>
  );
};

export default MonthSelector;
