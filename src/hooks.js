import { useRef, useEffect, useState } from "react";

export const useLongPress = (
  duration,
  { onClick = null, onLongPress = null }
) => {
  const ref = useRef();
  const timeoutIdRef = useRef();
  const longRef = useRef(false);
  const moveRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const longPressed = () => {
      longRef.current = true;
      if (moveRef.current) return;
      // eslint-disable-next-line no-unused-expressions
      onLongPress?.();
    };

    const onStart = () => {
      moveRef.current = false;
      longRef.current = false;
      timeoutIdRef.current = setTimeout(longPressed, duration);
    };

    const clear = () => clearTimeout(timeoutIdRef.current);

    const onEnd = () => {
      clear();
      if (moveRef.current) return;
      if (longRef.current) return;
      // eslint-disable-next-line no-unused-expressions
      onClick?.();
    };

    const onMove = () => (moveRef.current = true);

    el.addEventListener("touchstart", onStart);
    el.addEventListener("touchend", clear);
    el.addEventListener("touchmove", onMove);
    el.addEventListener("touchcancel", clear);

    el.addEventListener("mousedown", onStart);
    el.addEventListener("mouseup", onEnd);

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", clear);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchcancel", clear);

      el.removeEventListener("mousedown", onStart);
      el.removeEventListener("mouseup", onEnd);
    };
  }, [duration, onClick, onLongPress]);

  return ref;
};

export const useScrollY = (threshold = 100) => {
  const [dir, setDir] = useState(null);

  useEffect(() => {
    let startY = null;
    let scrollId;

    const onScroll = () => {
      // 标识起始位置
      if (startY === null) startY = window.scrollY;

      // 持续滚动时清理timeout
      clearTimeout(scrollId);

      scrollId = setTimeout(() => {
        // 仅在threashold满足时更新dir
        Math.abs(startY - window.scrollY) >= threshold &&
          setDir(startY >= window.scrollY ? "up" : "down");

        // 重置起始位置
        startY = null;
      }, 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return dir;
};
