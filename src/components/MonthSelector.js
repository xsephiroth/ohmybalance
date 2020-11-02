import React from "react";
import styled from "styled-components";
import DateInput from "./DateInput";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;

const StyledButton = styled.a`
  position: relative;

  display: inline-block;
  padding: 0.5em 2em;
  color: white;
  text-decoration: none;
  border-bottom: 2px solid white;
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
