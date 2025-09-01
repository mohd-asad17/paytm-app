import prisma from "@repo/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { AddmoneyCard } from "../../../components/AddmoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransaction } from "../../../components/OnRampTransaction";


async function getBalance(){
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransaction() {
    const session = await getServerSession(authOptions);
    const transaction = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session.user?.id)
        }
    });
    return transaction.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function TransferComponent() {
    const balance = await getBalance();
    const transactions = await getOnRampTransaction();

    return <div>
        <div>
            Transfer
        </div>
        <div>
            <div>
                <AddmoneyCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div>
                    <OnRampTransaction transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}