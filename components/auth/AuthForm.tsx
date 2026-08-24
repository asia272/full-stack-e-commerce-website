"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPassword from "./ForgotPassword";
import OtpVerification from "./OtpVerification";
import { checkEmailExists } from "@/app/actions/auth";
import Title from "../Title";

type AuthMode = "login" | "signup" | "forgot-password";

export default function AuthForm() {
    const router = useRouter();

    const [mode, setMode] = useState<AuthMode>("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showOtp, setShowOtp] = useState(false);
    const [verificationEmail, setVerificationEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

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
            // =====================================================
            // LOGIN
            // =====================================================

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

            // =====================================================
            // SIGNUP
            // =====================================================

            setShowOtp(false);
            setVerificationEmail("");
            setSignupPassword("");

            const normalizedEmail =
                email.trim().toLowerCase();

            // =====================================================
            // STEP 1 — CHECK EMAIL
            // =====================================================

            const { exists } =
                await checkEmailExists(
                    normalizedEmail
                );

            if (exists) {
                console.log(
                    "❌ EMAIL ALREADY EXISTS"
                );

                setError(
                    "An account with this email already exists. Please login instead."
                );

                return;
            }

            // =====================================================
            // STEP 2 — CREATE ACCOUNT
            // =====================================================

            const { error } = await signUp.email({
                name,
                email: normalizedEmail,
                password,
            });

            if (error) {
                console.error(
                    "❌ SIGNUP ERROR:",
                    error
                );

                setShowOtp(false);

                setError(
                    error.message ||
                    "Signup failed. Please try again."
                );

                return;
            }

            // =====================================================
            // STEP 3 — SIGNUP SUCCESS
            // =====================================================

            console.log(
                "✅ SIGNUP SUCCESSFUL"
            );

            // Save temporary signup information
            setSignupPassword(password);
            setVerificationEmail(
                normalizedEmail
            );

            // ONLY HERE can OTP UI appear
            setShowOtp(true);

        } catch (error) {
            console.error(
                "❌ SIGNUP ERROR:",
                error
            );

            // Never show OTP when signup throws an exception.
            setShowOtp(false);

            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    // =====================================================
    // TOGGLE LOGIN / SIGNUP
    // =====================================================

    function toggleMode() {
        setMode((currentMode) =>
            currentMode === "login"
                ? "signup"
                : "login"
        );

        setError("");
    }

    return (
        <div className="mx-auto w-full max-w-[585px]">
            {showOtp ? (
                /* ================= OTP UI ================= */
                <OtpVerification
                    verificationEmail={
                        verificationEmail
                    }
                    signupPassword={
                        signupPassword
                    }
                    setVerificationEmail={
                        setVerificationEmail
                    }
                    setSignupPassword={
                        setSignupPassword
                    }
                    setShowOtp={setShowOtp}
                />
            ) : (
                <>
                    {mode === "forgot-password" ? (
                        <ForgotPassword
                            onBackToLogin={() => {
                                setMode("login");
                                setError("");
                            }}
                        />
                    ) : (
                        <>
                            {/* LOGIN/SIGNUP FORM */}

                            {/* ================= TITLE ================= */}

                            <div className="mb-[55px] text-center">

                                <Title title={isLogin
                                    ? "Login"
                                    : "Sign Up"}
                                    highlight="" />
                            </div>

                            {/* ================= FORM ================= */}

                            <form
                                onSubmit={
                                    handleSubmit
                                }
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
                                            required={
                                                !isLogin
                                            }
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
                                            onClick={() => {
                                                setMode(
                                                    "forgot-password"
                                                );
                                                setError(
                                                    ""
                                                );
                                            }}
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
                                            onClick={
                                                toggleMode
                                            }
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
                                        onClick={
                                            toggleMode
                                        }
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
                </>
            )}
        </div>
    );
}