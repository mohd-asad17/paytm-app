import express from "express";
import db from "@repo/db";

const app = express();

// This is the endpoint which hit to the hdfc bank server which tells the bank server that this is the userId in my db and amount to be credit in the wallet from the bank so that transaction is happened and bank server tells our backend that payment has been done you need to update  and increase the amount in your db.

app.post("/hdfcWebhook", async (req, res) => {

    const paymentInfo = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    // both the request should be happens together either one of the request failure it will make the db inconsistent
    // For example , you update the balance database it increment the amount in the db and after onRamp req fails then the payment will not be success it refund the amount to user but the increment balance remains same so either both the request will be succesfully happen or both the request failue

//    await db.balance.update({
//         where: {
//             userId: paymentInfo.userId
//         },
//         data:{
//             amount: {
//                 increment: paymentInfo.amount
//             }
//         }
//     })

//     await db.onRampTransaction.update({
//         where: {
//             token: paymentInfo.token,
//         },
//         data: {
//             status: "Success"
//         }
//     })

// it can be done like this in prisma 
try {
await db.$transaction([
    db.balance.update({
        where: {
            userId: paymentInfo.userId
        },
        data:{
            amount: {
                increment: paymentInfo.amount
            }
        }
    }),
    db.onRampTransaction.update({
        where: {
            token: paymentInfo.token,
        },
        data: {
            status: "Success"
        }
    })
]);

res.status(200).json({
    message: "captured"
})
} catch(e){
    console.log(e);
    res.status(411).json({
        message: "Error while processing the payment and payment becomes failed"
    })
}
})

app.listen(3003);