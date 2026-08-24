"use client";

import { authClient, signIn } from "@/lib/auth-client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type UseOtpVerificationProps = {
    otp: string;
    verificationEmail: string;
    signupPassword: string;

    setLoading: (value: boolean) => void;
    setError: (value: string) => void;
    setSignupPassword: (value: string) => void;
    setVerificationEmail: (value: string) => void;
    setOtp: (value: string) => void;
    setShowOtp: (value: boolean) => void;
};

export function useOtpVerification({
    otp,
    verificationEmail,
    signupPassword,
    setLoading,
    setError,
    setSignupPassword,
    setVerificationEmail,
    setOtp,
    setShowOtp,
}: UseOtpVerificationProps) {
    const router = useRouter();

    const handleVerifyOtp = useCallback(async () => {
        if (otp.length !== 6) {
            setError("Please enter the 6-digit code.");
            return;
        }

        if (!verificationEmail) {
            setError("Verification email is missing.");
            return;
        }

        if (!signupPassword) {
            setError(
                "Your signup session has expired. Please sign up again."
            );
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Verify OTP
            const { error: verifyError } =
                await authClient.emailOtp.verifyEmail({
                    email: verificationEmail,
                    otp,
                });

            if (verifyError) {

                setError(
                    verifyError.message ||
                    "Invalid or expired verification code."
                );

                return;
            }


            // Automatic login
            const { error: signInError } =
                await signIn.email({
                    email: verificationEmail,
                    password: signupPassword,
                });

            if (signInError) {


                setError(
                    signInError.message ||
                    "Email verified, but automatic login failed."
                );

                return;
            }

            console.log("✅ AUTOMATIC LOGIN SUCCESSFUL");

            // Confirm session
            const {
                data: session,
                error: sessionError,
            } = await authClient.getSession();

            console.log(
                "========== SESSION AFTER OTP =========="
            );
            console.log("SESSION:", session);
            console.log("SESSION ERROR:", sessionError);
            console.log(
                "======================================="
            );

            if (!session?.user) {
                console.error(
                    "❌ SESSION WAS NOT CREATED"
                );

                setError(
                    "Authentication failed. Please try logging in."
                );

                return;
            }

            console.log(
                "✅ AUTHENTICATED USER:",
                session.user.email
            );

            // Clear temporary signup state
            setSignupPassword("");
            setVerificationEmail("");
            setOtp("");
            setShowOtp(false);
            setError("");

            // Redirect
            router.push("/");
            router.refresh();

        } catch (error) {
            console.error(
                "❌ COMPLETE OTP FLOW ERROR:",
                error
            );

            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, [
        otp,
        verificationEmail,
        signupPassword,
        setLoading,
        setError,
        setSignupPassword,
        setVerificationEmail,
        setOtp,
        setShowOtp,
        router,
    ]);

    return {
        handleVerifyOtp,
    };
}