import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function requireAdmin() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Not logged in → login
    if (!session?.user) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    // Logged in but not admin → home
    if (!user || user.role !== "ADMIN") {
        redirect("/");
    }

    return user;
}