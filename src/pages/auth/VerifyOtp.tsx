import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { OtpInput } from '../../components/otp/OtpInput';
import { OtpTimer } from '../../components/otp/OtpTimer';
import { FaEnvelopeOpenText } from 'react-icons/fa';

export const VerifyOtp: React.FC = () => {
  const { verifyOtpCode, pendingEmail } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const emailToVerify = pendingEmail || 'your email';

  const handleVerify = async (otp: string) => {
    setErrorMsg(null);
    setVerifying(true);
    try {
      await verifyOtpCode({ email: emailToVerify, otp });
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Invalid OTP code. Please check your email and try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = () => {
    alert('A new 6-digit OTP verification code has been dispatched to ' + emailToVerify);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/others/authentication.png')` }}
    >
      <div className="max-w-md w-full bg-dark-100 text-white rounded-2xl shadow-2xl p-8 border border-gold-500/30 text-center space-y-6">
        <div className="w-16 h-16 bg-gold-500/20 text-gold-400 rounded-full flex items-center justify-center mx-auto border border-gold-500/40">
          <FaEnvelopeOpenText className="w-8 h-8" />
        </div>

        <div>
          <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gold-400">
            VERIFY YOUR EMAIL
          </h2>
          <p className="text-gray-400 text-xs mt-2">
            We sent a 6-digit verification code to <span className="text-white font-bold">{emailToVerify}</span>
          </p>
        </div>

        {errorMsg && (
          <div className="alert alert-error text-white text-xs p-3 rounded-lg bg-red-600 font-medium">
            <span>{errorMsg}</span>
          </div>
        )}

        <OtpInput onComplete={handleVerify} isLoading={verifying} />

        <OtpTimer onResend={handleResend} />
      </div>
    </div>
  );
};
