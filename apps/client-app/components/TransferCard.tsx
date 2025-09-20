
import { Card } from "@repo/ui/card";


export const P2PTransferCard = ({transactions}: {
    transactions: {
        timestamp: Date;
        amount: number
    }[]
}) => {
    if(!transactions.length){
        return <Card title={"Recent Transactions"}>
            <div className="text-center pb-8 pt-8">
                No Recent Transaction
            </div>
        </Card>
    }
    return <Card title={"Recent Transactions"}>
        <div className="pt-2">
            {transactions.map(t => <div key={t.amount} className="flex justify-between">
                <div >
                    <div className="text-sm">
                        Recieved INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.timestamp.toDateString()}
                    </div>
                </div>
                <div  className="flex flex-col justify-between">
                    -Rs {t.amount/100}
                </div>
            </div>)}
            
        </div>
    </Card>
}