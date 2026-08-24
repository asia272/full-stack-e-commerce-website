"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Title from "../Title";

type ForgotPasswordProps = {
    onBackToLogin: () => void;
};

export default function ForgotPassword({
    onBackToLogin,
}: ForgotPasswordProps) {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

    const [step, setStep] = useState<"email" | "otp">("email");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // SEND PASSWORD RESET OTP
    // ==========================================
    const handleSendOTP = async () => {
        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const { error } =
                await authClient.emailOtp.requestPasswordReset({
                    email: email.trim(),
                });

            if (error) {
                console.error(
                    "PASSWORD RESET REQUEST:",
                    error
                );

                // Don't reveal whether the account exists
                setError(
                    "If an account with this email exists, a verification code has been sent."
                );

                return;
            }

            setStep("otp");

        } catch (error) {
            console.error(
                "FORGOT PASSWORD ERROR:",
                error
            );

            setError(
                "If an account with this email exists, a verification code has been sent."
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // RESET PASSWORD
    // ==========================================

    const handleResetPassword = async () => {
        if (otp.length !== 6) {
            setError("Please enter the 6-digit OTP.");
            return;
        }

        if (password.length < 8) {
            setError(
                "Password must be at least 8 characters."
            );
            return;
        }

        setLoading(true);
        setError("");

        try {
            const { error } =
                await authClient.emailOtp.resetPassword({
                    email: email.trim(),
                    otp,
                    password,
                });

            if (error) {
                setError(
                    error.message ||
                    "Invalid OTP or password reset failed."
                );
                return;
            }

            // Reset component state
            setEmail("");
            setOtp("");
            setPassword("");
            setStep("email");

            // Go back to login
            onBackToLogin();

        } catch (error) {
            console.error("RESET PASSWORD ERROR:", error);

            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-[585px]">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="mb-[55px] text-center">

                {/* <h1
                    className="
                        font-serif
                        text-[52px]
                        leading-[1]
                        font-normal
                        tracking-[-0.03em]
                        text-[#414141]
                    "
                >
                    Forgot Password
                    <span className="ml-3">—</span>
                </h1> */}
                <Title title="Forgot" highlight="password" className="mb-0" size="text-[42px]" />
                <p
                    className="
                        mt-5
                        font-[Outfit]
                        text-[17px]
                        text-[#707070]
                    "
                >
                    {step === "email"
                        ? "Enter your email to receive a 6-digit reset code."
                        : "Enter the code sent to your email and your new password."}
                </p>

            </div>

            {/* ==========================================
                STEP 1 — EMAIL
            ========================================== */}

            {step === "email" && (
                <div className="space-y-[25px]">

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        placeholder="Email"
                        disabled={loading}
                        className="
                            h-[61px]
                            w-full
                            border
                            border-[#000000]
                            bg-white
                            px-[25px]
                            font-[Outfit]
                            text-[17px]
                            text-[#333333]
                            outline-none
                            disabled:opacity-50
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
                            onClick={handleSendOTP}
                            disabled={loading}
                            className="
                                h-[59px]
                                w-[220px]
                                border
                                border-[#222222]
                                bg-[#0b0606]
                                font-[Outfit]
                                text-[20px]
                                text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {loading
                                ? "Sending..."
                                : "Send Code"}
                        </button>

                    </div>

                    <div className="text-center pt-2">

                        <button
                            type="button"
                            onClick={onBackToLogin}
                            disabled={loading}
                            className="
                                font-[Outfit]
                                text-[16px]
                                text-[#555555]
                                underline
                                disabled:opacity-50
                            "
                        >
                            Back to Login
                        </button>

                    </div>

                </div>
            )}

            {/* ==========================================
                STEP 2 — OTP + NEW PASSWORD
            ========================================== */}

            {step === "otp" && (
                <div className="space-y-[25px]">

                    <div className="text-center">

                        <p
                            className="
                                font-[Outfit]
                                text-[17px]
                                text-[#555555]
                            "
                        >
                            We sent a 6-digit code to
                        </p>

                        <p
                            className="
                                mt-1
                                font-[Outfit]
                                font-medium
                                text-[#222222]
                            "
                        >
                            {email}
                        </p>

                    </div>

                    {/* OTP */}

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
                        disabled={loading}
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
                            disabled:opacity-50
                        "
                    />

                    {/* NEW PASSWORD */}

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        placeholder="New Password"
                        minLength={8}
                        disabled={loading}
                        className="
                            h-[61px]
                            w-full
                            border
                            border-[#000000]
                            bg-white
                            px-[25px]
                            font-[Outfit]
                            text-[17px]
                            text-[#333333]
                            outline-none
                            disabled:opacity-50
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
                            onClick={handleResetPassword}
                            disabled={
                                loading ||
                                otp.length !== 6 ||
                                password.length < 8
                            }
                            className="
                                h-[59px]
                                w-[220px]
                                border
                                border-[#222222]
                                bg-[#0b0606]
                                font-[Outfit]
                                text-[20px]
                                text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {loading
                                ? "Resetting..."
                                : "Reset Password"}
                        </button>

                    </div>

                    <div className="text-center pt-2">

                        <button
                            type="button"
                            onClick={() => {
                                setStep("email");
                                setOtp("");
                                setPassword("");
                                setError("");
                            }}
                            disabled={loading}
                            className="
                                font-[Outfit]
                                text-[16px]
                                text-[#555555]
                                underline
                                disabled:opacity-50
                            "
                        >
                            Use a different email
                        </button>

                    </div>

                </div>
            )}
        </div>
    );
}