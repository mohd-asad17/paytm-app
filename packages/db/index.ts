import { PrismaClient } from "./generated/prisma";

const prismaClientSignleton = ()=>{
    return new PrismaClient();
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSignleton>
}

const prisma: ReturnType<typeof prismaClientSignleton> = globalThis.prismaGlobal ?? prismaClientSignleton()

export default prisma;

if(process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma