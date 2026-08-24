"use client";

import { useState } from "react";
import { useOtpVerification } from "../hooks/useOtpVerification";


type OtpVerificationProps = {
    verificationEmail: string;
    signupPassword: string;

    setVerificationEmail: (value: string) => void;
    setSignupPassword: (value: string) => void;
    setShowOtp: (value: boolean) => void;
};

export default function OtpVerification({
    verificationEmail,
    signupPassword,
    setVerificationEmail,
    setSignupPassword,
    setShowOtp,
}: OtpVerificationProps) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { handleVerifyOtp } =
        useOtpVerification({
            otp,
            verificationEmail,
            signupPassword,

            setLoading,
            setError,
            setSignupPassword,
            setVerificationEmail,
            setOtp,
            setShowOtp,
        });

    function handleBackToSignup() {
        setShowOtp(false);
        setOtp("");
        setError("");
        setVerificationEmail("");
        setSignupPassword("");
    }

    return (
        <div className="mx-auto w-full max-w-[585px]">
            <div className="mb-[55px] text-center">
                <h1
                    className="
                        font-serif
                        text-[52px]
                        leading-[1]
                        font-normal
                        tracking-[-0.03em]
                        text-[#414141]
                    "
                >
                    Verify Email
                    <span className="ml-3">
                        —
                    </span>
                </h1>

                <p
                    className="
                        mt-5
                        font-[Outfit]
                        text-[17px]
                        text-[#707070]
                    "
                >
                    We sent a 6-digit
                    verification code to
                </p>

                <p
                    className="
                        mt-1
                        font-[Outfit]
                        text-[17px]
                        font-medium
                        text-[#333333]
                    "
                >
                    {verificationEmail}
                </p>
            </div>

            <div className="space-y-[25px]">
                <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                        const value =
                            e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 6);

                        setOtp(value);
                        setError("");
                    }}
                    placeholder="Enter 6-digit code"
                    className="
                        h-[61px]
                        w-full
                        border
                        border-[#000000]
                        bg-white
                        px-[25px]
                        text-center
                        font-[Outfit]
                        text-[24px]
                        tracking-[0.5em]
                        text-[#333333]
                        outline-none
                        placeholder:text-[17px]
                        placeholder:tracking-normal
                        focus:border-[#222222]
                    "
                />

                {error && (
                    <p
                        className="
                            font-[Outfit]
                            text-sm
                            text-red-500
                        "
                    >
                        {error}
                    </p>
                )}

                <div className="flex justify-center pt-[15px]">
                    <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={
                            loading ||
                            otp.length !== 6
                        }
                        className="
                            h-[59px]
                            w-[200px]
                            border
                            border-[#222222]
                            bg-[#0b0606]
                            font-[Outfit]
                            text-[20px]
                            font-normal
                            text-white
                            transition
                            duration-200
                            hover:bg-[#333333]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify"}
                    </button>
                </div>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={handleBackToSignup}
                        className="
                            font-[Outfit]
                            text-[16px]
                            text-[#555555]
                            underline
                        "
                    >
                        Back to Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}