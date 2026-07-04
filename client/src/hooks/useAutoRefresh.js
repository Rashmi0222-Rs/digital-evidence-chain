import { useEffect } from "react";

function useAutoRefresh(callback, interval = 30000) {
  useEffect(() => {
    if (!callback) return;

    const timer = setInterval(() => {
      callback();
    }, interval);

    const handleFocus = () => {
      callback();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", handleFocus);
    };
  }, [callback, interval]);
}

export default useAutoRefresh;