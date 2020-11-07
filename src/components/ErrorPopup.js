import React, { useState } from "react";
import styled from "styled-components";

const ErrorPopup = styled.div`
  position: absolute;
  top: 1em;
  transition: 0.5s;
  left: ${(props) => (props.show ? "1em" : "-100%")};
  z-index: 999;

  min-width: 50vw;
  min-height: 4em;
  border-radius: 10px;
  background: red;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorPopupContext = React.createContext();

export const ErrorPopupProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const dispatch = React.useCallback((error, duration = 1500) => {
    setError(error);
    setShow(true);
    setTimeout(() => setShow(false), duration);
    setTimeout(() => setError(null), duration + 500);
  }, []);

  return (
    <ErrorPopupContext.Provider value={[dispatch]}>
      <ErrorPopup show={show}>{error?.message || error}</ErrorPopup>
      {children}
    </ErrorPopupContext.Provider>
  );
};

export const useErrorPopup = () => React.useContext(ErrorPopupContext);
