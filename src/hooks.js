import { useRef, useEffect } from "react";

export const useLongClick = (duration = 500, onClick, onLongClick) => {
  const ref = useRef();
  const longRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const btn = ref.current;

    let id;
    const end = () => {
      clearTimeout(id);

      if (!longRef.current) {
        // eslint-disable-next-line no-unused-expressions
        onClick?.();
      }
    };

    const start = (e) => {
      // 避免touchstart与mousedown冲突
      e.preventDefault();

      // reset
      clearTimeout(id);
      longRef.current = false;

      id = setTimeout(() => {
        longRef.current = true;
        // eslint-disable-next-line no-unused-expressions
        onLongClick?.();
        navigator.vibrate(50);
      }, duration);
    };

    btn.addEventListener("touchstart", start);
    btn.addEventListener("touchend", end);
    btn.addEventListener("touchcancel", end);
    btn.addEventListener("mousedown", start);
    btn.addEventListener("mouseup", end);

    return () => {
      clearTimeout(id);
      btn.removeEventListener("touchstart", start);
      btn.removeEventListener("touchend", end);
      btn.removeEventListener("touchcancel", end);
      btn.removeEventListener("mousedown", start);
      btn.removeEventListener("mouseup", end);
    };
  }, [duration, onClick, onLongClick]);

  return ref;
};
