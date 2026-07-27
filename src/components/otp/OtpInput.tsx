import React, { useState, useRef } from 'react';
import { Button } from '../common/Button';

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  isLoading?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onComplete, isLoading = false }) => {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d+$/.test(pasted)) {
      const pastedDigits = pasted.slice(0, length).split('');
      const newDigits = [...digits];
      pastedDigits.forEach((d, i) => {
        newDigits[i] = d;
      });
      setDigits(newDigits);
      inputRefs.current[Math.min(pastedDigits.length, length - 1)]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otp = digits.join('');
    if (otp.length === length) {
      onComplete(otp);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center items-center space-x-2 sm:space-x-3">
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (inputRefs.current[idx] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-dark-100 border-2 border-gold-500/40 focus:border-gold-400 rounded-lg text-white focus:outline-none transition-colors"
          />
        ))}
      </div>

      <Button
        variant="primary"
        size="lg"
        isLoading={isLoading}
        type="submit"
        disabled={digits.join('').length !== length}
        className="w-full"
      >
        VERIFY & ACTIVATE ACCOUNT
      </Button>
    </form>
  );
};
