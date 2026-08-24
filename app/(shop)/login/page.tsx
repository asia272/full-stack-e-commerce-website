import AuthForm from "@/components/auth/AuthForm";
import Subscription from "@/components/Subscription";


export default function AuthPage() {
    return (
        <> <div className="flex min-h-screen items-center justify-center px-4">
            <AuthForm />
        </div>
            <Subscription />
        </>

    );
}