import React, { useState, useEffect, useRef, memo } from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
  outline: none;
  -webkit-tap-highlight-color: transparent;
  padding: 4px 8px;
  border-radius: 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
  color: ${({ theme }) => theme.color.primary};
  user-select: none;

  border: 1px solid transparent;
  ${({ active, theme }) =>
    active &&
    css`
      border: 1px solid ${theme.color.secondary};
    `}

  position: relative;
  ${(props) =>
    props.showDel &&
    css`
      &:after {
        content: "X";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 6px 8px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.color.expense};
      }
    `}
`;

const useLongPress = (duration = 500) => {
  const ref = useRef();
  const [isLongPress, setIsLongPress] = useState(false);

  const reset = () => setIsLongPress(false);

  useEffect(() => {
    if (!ref.current) return;
    const btn = ref.current;

    let id;
    const clear = () => clearTimeout(id);

    const start = () => {
      clear();
      id = setTimeout(() => {
        setIsLongPress(true);
        navigator.vibrate(50);
      }, duration);
    };

    btn.addEventListener("touchstart", start);
    btn.addEventListener("touchend", clear);
    btn.addEventListener("touchcancel", clear);

    return () => {
      clear();
      btn.removeEventListener("touchstart", start);
      btn.removeEventListener("touchend", clear);
      btn.removeEventListener("touchcancel", clear);
    };
  }, [duration]);

  return [ref, isLongPress, reset];
};

const CategoryBtn = ({
  children,
  setLongPress,
  willDelete = false,
  ...restProps
}) => {
  console.log(willDelete);
  const [ref, isLongPress, reset] = useLongPress();
  useEffect(() => {
    isLongPress && setLongPress(isLongPress);
    reset();
  }, [isLongPress, reset]);
  return (
    <Button ref={ref} showDel={willDelete} {...restProps}>
      {children}
    </Button>
  );
};

export default memo(CategoryBtn);
