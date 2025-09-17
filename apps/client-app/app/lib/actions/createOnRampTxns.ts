"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db";


export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const token =  Math.random().toString();
     if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    await db.onRampTransaction.create({
        data: {
            userId: Number(session?.user?.id),
            amount : amount * 100,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    })

    return {
        message: "on Ramp Transaction added"
    }
}