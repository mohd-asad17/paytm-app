import db from '@repo/db';
import  CredentialsProvider  from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'

export const authOptions = {
    providers:[
         CredentialsProvider({
    name: 'Credentials',
    credentials: {
      phone: { label: "Phone number", type: "phone", placeholder: "123123123" },
      password: { label: "Password", type: "password" }
    },

    async authorize(credentials: any){
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
            where:{
                number: credentials.phone
            }
        });

        if(existingUser){
            const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
            if(passwordValidation){
                return {
                    id: existingUser.id.toString(),
                    name: existingUser.name,
                    email: existingUser.email
                }
            }
            return null;
        }
        try {
            const user = await db.user.create({
                data:{
                    number: credentials.number,
                    password: hashedPassword
                }
            });
            return {
                id: user.id.toString(),
                name: user.name,
                email: user.number
            }
        }
        catch(e){
            console.log(e);
        }
        return null;
    },
})
    ],
    secret:process.env.JWT_SECRET || "secret",
    callbacks:{
       async session({token, session}: any) {
        session.user.id = token.id
        return session
    }
    }
}
