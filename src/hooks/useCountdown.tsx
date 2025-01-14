import { useEffect, useState } from "react";

const countName = "countdown";

export const useCountdown = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTime = localStorage.getItem(countName);
    return storedTime ? parseInt(storedTime, 10) : seconds;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    localStorage.setItem(countName, timeLeft.toString());

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return {
    time: formatTime(timeLeft),
    clear: () => localStorage.removeItem(countName),
    isNull: timeLeft == 0,
  };
};
