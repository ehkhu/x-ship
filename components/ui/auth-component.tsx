import { signOut } from '@/auth';
import { Button } from './button';
import Link from 'next/link';

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
      // className="w-full"
    >
      <Button size={'sm'} variant="ghost" className="w-full h-1 p-0" {...props}>
        Log Out
      </Button>
    </form>
  );
}

export function Guest() {
  return (
    <>
      <Link href={'/login'}>Login</Link> /
      <Link href={'/register'}>Register</Link>
    </>
  );
}
