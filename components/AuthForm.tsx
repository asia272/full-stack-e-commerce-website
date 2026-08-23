"use client";

import { authClient, signIn, signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "signup";

export default function AuthForm() {
    const router = useRouter();

    const [mode, setMode] = useState<AuthMode>("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [verificationEmail, setVerificationEmail] = useState("");

    const isLogin = mode === "login";

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;

        try {
            if (isLogin) {
                const { error } = await signIn.email({
                    email,
                    password,
                });

                if (error) {
                    setError(
                        error.message ||
                        "Invalid email or password"
                    );
                    return;
                }

                router.push("/");
                router.refresh();
                return;
            }

            const { error } = await signUp.email({
                name,
                email,
                password,
            });

            if (error) {
                setError(
                    error.message || "Signup failed"
                );
                return;
            }

            setVerificationEmail(email);
            setShowOtp(true);
        } catch (error) {
            console.error(error);

            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    function toggleMode() {
        setMode((currentMode) =>
            currentMode === "login"
                ? "signup"
                : "login"
        );

        setError("");
    }

    async function handleVerifyOtp() {
        if (otp.length !== 6) {
            setError("Please enter the 6-digit code.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const { error } =
                await authClient.emailOtp.verifyEmail({
                    email: verificationEmail,
                    otp,
                });

            if (error) {
                setError(
                    error.message ||
                    "Invalid verification code."
                );
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error(error);

            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto w-full max-w-[585px]">
            {showOtp ? (
                /* ================= OTP UI ================= */
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
                                        .replace(
                                            /\D/g,
                                            ""
                                        )
                                        .slice(
                                            0,
                                            6
                                        );

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
                                onClick={() => {
                                    setShowOtp(false);
                                    setOtp("");
                                    setError("");
                                }}
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
            ) : (
                /* ================= LOGIN / SIGNUP UI ================= */
                <>
                    {/* ================= TITLE ================= */}
                    <div className="mb-[55px] text-center">
                        <h1
                            className="
                                font-serif
                                font-normal
                                tracking-[-0.03em]
                                text-[#414141]
                                text-[52px]
                                leading-[1]
                            "
                        >
                            {isLogin
                                ? "Login"
                                : "Sign Up"}

                            <span className="ml-3">
                                —
                            </span>
                        </h1>
                    </div>

                    {/* ================= FORM ================= */}
                    <form
                        onSubmit={handleSubmit}
                        className={
                            isLogin
                                ? "space-y-[35px]"
                                : "space-y-[27px]"
                        }
                    >
                        {/* NAME - SIGNUP ONLY */}
                        {!isLogin && (
                            <div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    required={!isLogin}
                                    autoComplete="name"
                                    className="
                                        h-[61px]
                                        w-full
                                        border
                                        border-[#000000]
                                        bg-white
                                        px-[20px]
                                        font-[Outfit]
                                        text-[17px]
                                        font-normal
                                        text-[#333333]
                                        outline-none
                                        placeholder:text-[#707070]
                                        focus:border-[#222222]
                                    "
                                />
                            </div>
                        )}

                        {/* EMAIL */}
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                                autoComplete="email"
                                className="
                                    h-[61px]
                                    w-full
                                    border
                                    border-[#000000]
                                    bg-white
                                    px-[25px]
                                    font-[Outfit]
                                    text-[17px]
                                    font-normal
                                    text-[#333333]
                                    outline-none
                                    placeholder:text-[#707070]
                                    focus:border-[#222222]
                                "
                            />
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                minLength={8}
                                autoComplete={
                                    isLogin
                                        ? "current-password"
                                        : "new-password"
                                }
                                className="
                                    h-[61px]
                                    w-full
                                    border
                                    border-[#000000]
                                    bg-white
                                    px-[25px]
                                    font-[Outfit]
                                    text-[17px]
                                    font-normal
                                    text-[#333333]
                                    outline-none
                                    placeholder:text-[#707070]
                                    focus:border-[#222222]
                                "
                            />
                        </div>

                        {/* ERROR */}
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

                        {/* ================= LOGIN LINKS ================= */}
                        {isLogin && (
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    font-[Outfit]
                                    text-[20px]
                                    font-normal
                                    text-[#333333]
                                "
                            >
                                <button
                                    type="button"
                                    className="
                                        cursor-pointer
                                        bg-transparent
                                        p-0
                                    "
                                >
                                    Forgot your password?
                                </button>

                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="
                                        cursor-pointer
                                        bg-transparent
                                        p-0
                                    "
                                >
                                    Create account
                                </button>
                            </div>
                        )}

                        {/* ================= SUBMIT BUTTON ================= */}
                        <div
                            className={
                                isLogin
                                    ? "flex justify-center pt-[30px]"
                                    : "flex justify-center pt-[18px]"
                            }
                        >
                            <button
                                type="submit"
                                disabled={loading}
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
                                    ? isLogin
                                        ? "Signing in..."
                                        : "Creating..."
                                    : isLogin
                                        ? "Sign in"
                                        : "Create"}
                            </button>
                        </div>
                    </form>

                    {/* ================= SIGNUP → LOGIN ================= */}
                    {!isLogin && (
                        <div
                            className="
                                mt-[35px]
                                text-center
                                font-[Outfit]
                                text-[16px]
                                text-[#555555]
                            "
                        >
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="
                                    font-medium
                                    text-black
                                    underline
                                "
                            >
                                Login
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}