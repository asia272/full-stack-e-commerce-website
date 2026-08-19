// "use client";

// import { signIn, signUp } from "@/lib/auth-client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// type AuthMode = "login" | "signup";

// export default function AuthForm() {
//     const router = useRouter();

//     const [mode, setMode] = useState<AuthMode>("login");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const isLogin = mode === "login";

//     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault();

//         setLoading(true);
//         setError("");

//         const formData = new FormData(e.currentTarget);

//         const email = formData.get("email") as string;
//         const password = formData.get("password") as string;
//         const name = formData.get("name") as string;

//         try {
//             if (isLogin) {
//                 const { error } = await signIn.email({
//                     email,
//                     password,
//                 });

//                 if (error) {
//                     setError(error.message || "Invalid email or password");
//                     return;
//                 }
//             } else {
//                 const { error } = await signUp.email({
//                     name,
//                     email,
//                     password,
//                 });

//                 if (error) {
//                     setError(error.message || "Signup failed");
//                     console.log(error)
//                     return;
//                 }
//             }

//             router.push("/");
//             router.refresh();
//         } catch (error) {
//             console.error(error);
//             setError("Something went wrong. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     }

//     function toggleMode() {
//         setMode((currentMode) =>
//             currentMode === "login" ? "signup" : "login"
//         );

//         setError("");
//     }

//     return (
//         <div className="w-full max-w-md">
//             <div className="mb-8">
//                 <h1 className="text-3xl font-semibold">
//                     {isLogin ? "Login" : "Create Account"}
//                 </h1>

//                 <p className="mt-2 text-sm text-gray-500">
//                     {isLogin
//                         ? "Login to continue to your account."
//                         : "Create an account to get started."}
//                 </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 {!isLogin && (
//                     <div>
//                         <label
//                             htmlFor="name"
//                             className="mb-1 block text-sm font-medium"
//                         >
//                             Name
//                         </label>

//                         <input
//                             id="name"
//                             name="name"
//                             type="text"
//                             placeholder="Enter your name"
//                             required={!isLogin}
//                             autoComplete="name"
//                             className="w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
//                         />
//                     </div>
//                 )}

//                 <div>
//                     <label
//                         htmlFor="email"
//                         className="mb-1 block text-sm font-medium"
//                     >
//                         Email
//                     </label>

//                     <input
//                         id="email"
//                         name="email"
//                         type="email"
//                         placeholder="Enter your email"
//                         required
//                         autoComplete="email"
//                         className="w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
//                     />
//                 </div>

//                 <div>
//                     <label
//                         htmlFor="password"
//                         className="mb-1 block text-sm font-medium"
//                     >
//                         Password
//                     </label>

//                     <input
//                         id="password"
//                         name="password"
//                         type="password"
//                         placeholder="Enter your password"
//                         required
//                         minLength={8}
//                         autoComplete={
//                             isLogin ? "current-password" : "new-password"
//                         }
//                         className="w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
//                     />
//                 </div>

//                 {error && (
//                     <p className="text-sm text-red-500">
//                         {error}
//                     </p>
//                 )}

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full rounded-md bg-black px-4 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                     {loading
//                         ? isLogin
//                             ? "Signing in..."
//                             : "Creating account..."
//                         : isLogin
//                             ? "Login"
//                             : "Sign Up"}
//                 </button>
//             </form>

//             <div className="mt-6 text-center text-sm text-gray-500">
//                 {isLogin ? (
//                     <>
//                         Don't have an account?{" "}
//                         <button
//                             type="button"
//                             onClick={toggleMode}
//                             className="font-medium text-black underline"
//                         >
//                             Sign Up
//                         </button>
//                     </>
//                 ) : (
//                     <>
//                         Already have an account?{" "}
//                         <button
//                             type="button"
//                             onClick={toggleMode}
//                             className="font-medium text-black underline"
//                         >
//                             Login
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

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
                    console.log(error);
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
        <div
            className={`mx-auto w-full ${isLogin ? "max-w-[765px]" : "max-w-[585px]"
                }`}
        >
            {/* ================= TITLE ================= */}
            <div
                className={`text-center ${isLogin ? "mb-[70px]" : "mb-[55px]"
                    }`}
            >
                <h1
                    className={`
                        font-serif
                        font-normal
                        tracking-[-0.03em]
                        text-[#414141]
                        ${isLogin
                            ? "text-[64px] leading-[1]"
                            : "text-[52px] leading-[1]"
                        }
                    `}
                >
                    {isLogin ? "Login" : "Sign Up"}
                    <span className="ml-3">—</span>
                </h1>
            </div>

            {/* ================= FORM ================= */}
            <form
                onSubmit={handleSubmit}
                className={isLogin ? "space-y-[35px]" : "space-y-[27px]"}
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
                                border-[#222222]
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
                        className={`
                            w-full
                            border
                            border-[#222222]
                            bg-white
                            px-[25px]
                            font-[Outfit]
                            font-normal
                            text-[#333333]
                            outline-none
                            placeholder:text-[#707070]
                            focus:border-[#222222]
                            ${isLogin
                                ? "h-[80px] text-[24px]"
                                : "h-[61px] text-[17px]"
                            }
                        `}
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
                            isLogin ? "current-password" : "new-password"
                        }
                        className={`
                            w-full
                            border
                            border-[#222222]
                            bg-white
                            px-[25px]
                            font-[Outfit]
                            font-normal
                            text-[#333333]
                            outline-none
                            placeholder:text-[#707070]
                            focus:border-[#222222]
                            ${isLogin
                                ? "h-[80px] text-[24px]"
                                : "h-[61px] text-[17px]"
                            }
                        `}
                    />
                </div>

                {/* ERROR */}
                {error && (
                    <p className="font-[Outfit] text-sm text-red-500">
                        {error}
                    </p>
                )}

                {/* ================= LOGIN LINKS ================= */}
                {isLogin && (
                    <div className="flex items-center justify-between font-[Outfit] text-[20px] font-normal text-[#333333]">
                        <button
                            type="button"
                            className="cursor-pointer bg-transparent p-0"
                        >
                            Forgot your password?
                        </button>

                        <button
                            type="button"
                            onClick={toggleMode}
                            className="cursor-pointer bg-transparent p-0"
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
                            h-[79px]
                            w-[224px]
                            border
                            border-[#222222]
                            bg-[#222222]
                            font-[Outfit]
                            text-[23px]
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
                <div className="mt-[35px] text-center font-[Outfit] text-[16px] text-[#555555]">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={toggleMode}
                        className="font-medium text-black underline"
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}