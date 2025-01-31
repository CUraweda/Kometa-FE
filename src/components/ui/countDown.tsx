import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  expiredDate?: string; // Tambahkan tanda `?` agar bisa undefined sementara
}

const CountdownTimer: React.FC<CountdownTimerProps > = ({ expiredDate }) => {
  
  if (!expiredDate) {
    return <p className="text-red-500">Loading countdown...</p>; // Menampilkan pesan loading jika expiredDate belum ada
  }

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const expirationTime = new Date(expiredDate).getTime();
    const difference = expirationTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiredDate]);

  return (
    <div className="flex gap-5">
      <div>
        <span className="countdown font-mono text-3xl">
          <span style={{ "--value": timeLeft.days } as React.CSSProperties}></span>
        </span>
        days
      </div>
      <div>
        <span className="countdown font-mono text-3xl">
          <span style={{ "--value": timeLeft.hours } as React.CSSProperties}></span>
        </span>
        hours
      </div>
      <div>
        <span className="countdown font-mono text-3xl">
          <span style={{ "--value": timeLeft.minutes } as React.CSSProperties}></span>
        </span>
        min
      </div>
      <div>
        <span className="countdown font-mono text-3xl">
          <span style={{ "--value": timeLeft.seconds } as React.CSSProperties}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default CountdownTimer;
