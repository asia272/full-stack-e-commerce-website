"use server";

import prisma from "@/lib/prisma";

export async function checkEmailExists(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
        select: {
            id: true,
        },
    });

    return {
        exists: !!user,
    };
}