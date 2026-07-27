import React, { useState, useEffect } from 'react';

interface OtpTimerProps {
  initialSeconds?: number;
  onResend: () => void;
}

export const OtpTimer: React.FC<OtpTimerProps> = ({ initialSeconds = 120, onResend }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const handleResendClick = () => {
    setSeconds(initialSeconds);
    onResend();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="text-center text-sm text-gray-400">
      {seconds > 0 ? (
        <p>
          Resend code available in <span className="font-bold text-gold-400">{formatTime(seconds)}</span>
        </p>
      ) : (
        <button
          type="button"
          onClick={handleResendClick}
          className="text-gold-400 hover:text-gold-300 font-bold underline transition-colors"
        >
          Resend Verification Code
        </button>
      )}
    </div>
  );
};
