import {signIn, signOut} from 'next-auth/react'
import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null
    },
    onSignin: typeof signIn
    onSignout: typeof signOut
}

export const Appbar = ({user, onSignin, onSignout}: AppbarProps) => {
    return <div className='flex justify-between border-b px-4'>
        <div className='flex flex-col text-lg justify-center'>
            payTM
        </div>
        <div className='flex flex-col justify-center pt-2'>
          <Button onClick={user? onSignout: onSignin}>{user? "Log out" : "Log in"}</Button>
        </div>
    </div>
}