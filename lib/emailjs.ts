export async function sendOTPEmail({
    email,
    otp,
    type,
}: {
    email: string;
    otp: string;
    type:
    | "email-verification"
    | "sign-in"
    | "forget-password"
    | "change-email";
}) {
    let otpTitle = "Your verification code";

    if (type === "email-verification") {
        otpTitle = "Verify your email";
    }

    if (type === "sign-in") {
        otpTitle = "Sign in to Your Store";
    }

    if (type === "forget-password") {
        otpTitle = "Reset your password";
    }

    const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                service_id: process.env.EMAILJS_SERVICE_ID,
                template_id: process.env.EMAILJS_TEMPLATE_ID,
                user_id: process.env.EMAILJS_PUBLIC_KEY,
                accessToken: process.env.EMAILJS_PRIVATE_KEY,

                template_params: {
                    to_email: email,
                    otpCode: otp,
                    appName: "Your Store | Feshion & Clothing ",
                    expirationMinutes: "5",
                    otpTitle,
                },
            }),
        }
    );

    if (!response.ok) {
        const error = await response.text();

        console.error("EmailJS error:", error);

        throw new Error("Failed to send OTP email");
    }

    console.log("✅ OTP email sent to:", email);
}