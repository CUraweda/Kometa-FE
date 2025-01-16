import { useEffect, useState, useCallback } from "react";

export const useTimer = ({
  second,
  elementBefore,
  elementAfter,
}: {
  second: number;
  elementBefore: React.ReactNode;
  elementAfter: React.ReactNode;
}) => {
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const tick = () => {
      setCurrentTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
    };

    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const startTimer = useCallback(() => {
    setCurrentTime(second);
  }, [second]);

  return {
    element: currentTime == 0 ? elementBefore : elementAfter,
    startTimer,
  };
};
