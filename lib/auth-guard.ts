

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "./utils";

export async function requireAdmin() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    if (!user.emailVerified) {
        redirect("/login");
    }

    if (user.role !== "ADMIN") {
        redirect("/");
    }

    return user;
}
export async function requireUser() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    if (!user.emailVerified) {
        redirect("/login");
    }

    if (user.role !== "USER") {
        redirect("/admin");
    }

    return user;
}