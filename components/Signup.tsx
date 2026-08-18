"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "signup";

export default function AuthForm() {
    const router = useRouter();

    const [mode, setMode] = useState<AuthMode>("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isLogin = mode === "login";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
                    setError(error.message || "Invalid email or password");
                    return;
                }
            } else {
                const { error } = await signUp.email({
                    name,
                    email,
                    password,
                });

                if (error) {
                    setError(error.message || "Signup failed");
                    console.log(error)
                    return;
                }
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    function toggleMode() {
        setMode((currentMode) =>
            currentMode === "login" ? "signup" : "login"
        );

        setError("");
    }

    return (
        <div className="w-full max-w-md">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold">
                    {isLogin ? "Login" : "Create Account"}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    {isLogin
                        ? "Login to continue to your account."
                        : "Create an account to get started."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1 block text-sm font-medium"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            required={!isLogin}
                            autoComplete="name"
                            className="w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
                        />
                    </div>
                )}

                <div>
                    <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        autoComplete="email"
                        className="w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-1 block text-sm font-medium"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        minLength={8}
                        autoComplete={
                            isLogin ? "current-password" : "new-password"
                        }
                        className="w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-black px-4 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? isLogin
                            ? "Signing in..."
                            : "Creating account..."
                        : isLogin
                            ? "Login"
                            : "Sign Up"}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
                {isLogin ? (
                    <>
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="font-medium text-black underline"
                        >
                            Sign Up
                        </button>
                    </>
                ) : (
                    <>
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="font-medium text-black underline"
                        >
                            Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}