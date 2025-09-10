"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db";


export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const token =  Math.random().toString();
    const userId = session.user.id;
    if(!userId){
        return {
            message: "you are not logged in"
        }
    }

    await db.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount : amount,
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