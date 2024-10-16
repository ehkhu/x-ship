import { auth } from '@/auth';
import { Guest, SignOut } from '@/components/ui/auth-component';
import Image from 'next/image';
import Dashboard from './(authenticated)/dashboard/page';
import LoginPage from './(guest)/login/page';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return redirect('/dashboard');
  }
  return (
    <main className="items-centerp-24">
      {/* <div className="flex justify-end p-4"> */}
      {/* {session?.user ? <SignOut /> : <Guest />} */}
      {/* </div> */}
      {/* <div className="relative z-[-1] flex justify-center place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"> */}
      {!session?.user && <LoginPage />}
      {/* </div> */}
    </main>
  );
}
