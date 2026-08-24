
import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { emailOTP } from "better-auth/plugins";
import { dash } from "@better-auth/infra";
import { sendOTPEmail } from "./emailjs";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,

        // User must verify email before login
        requireEmailVerification: true,
        autoSignIn: false,
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "USER",
                input: false,
            },
        },
    },

    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },

    plugins: [
        dash({
            apiKey: process.env.BETTER_AUTH_API_KEY,
        }),

        emailOTP({
            overrideDefaultEmailVerification: true,

            sendVerificationOnSignUp: true,

            otpLength: 6,
            expiresIn: 300,
            allowedAttempts: 3,
            async sendVerificationOTP({ email, otp, type }) {


                try {
                    await sendOTPEmail({
                        email,
                        otp,
                        type,
                    });

                } catch (error) {
                    throw error;
                }
            }
        }),
    ],
});