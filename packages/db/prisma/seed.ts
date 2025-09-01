import { PrismaClient } from "../generated/prisma"
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main(){
    const alice = await prisma.user.upsert({
        where: {
            number: '1111111111',
        },
        update: {},
        create:{
            number: '1111111111',
            password: await bcrypt.hash('alice', 10),
            name: 'alice',
            Balance: {
                create: {
                    amount: 20000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 20000,
                    token: "token_1",
                    provider: "HDFC Bank"
                },
            },
        },
    })

    const bob = await prisma.user.upsert({
        where: { 
            number: '2222222222',
        },
        update: {},
        create: {
            number: '2222222222',
            password: await bcrypt.hash('bob', 10),
            name: 'bob',
            Balance: {
                create: {
                    amount: 2000,
                    locked: 0,
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    amount: 2000,
                    status: "Failure",
                    token: 'token_2',
                    provider: "HDFC Bank"
                },
            },
        },
    })

    const john = await prisma.user.upsert({
        where: {
            number: '3333333333',
        },
        update: {},
        create: {
            number: '3333333333',
            password: await bcrypt.hash('john', 10),
            name: 'john',
            Balance: {
                create: {
                    amount: 25000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    amount: 25000,
                    status: "Processing",
                    token: "token_3",
                    provider: "HDFC Bank"
                }
            }
        }
    })
    console.log({john});
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.log(e);
    await prisma.$disconnect()
    process.exit(1)
})