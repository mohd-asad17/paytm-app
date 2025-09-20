import { P2PTransferCard } from "../../../components/TransferCard";
import { SendCard } from "../../../components/SendCard";
import db from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getP2PTransfer() {
    const session = await getServerSession(authOptions);
    const transaction = await db.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    })
    return transaction.map(t =>({
        timestamp: t.timestamp,
        amount: t.amount,
    }));
}

export  default async function p2pTransfer(){
    const transaction = await getP2PTransfer();
    return <div className="w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendCard />
            </div>
           <P2PTransferCard transactions={transaction} />
        </div>
    </div>
}