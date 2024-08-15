import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
      <div className="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left">
        <div className="-intro-x lg:mr-20">
          <Image
            alt="zake"
            className="h-48 lg:h-auto"
            width={300}
            height={200}
            src="error-illustration.svg"
          />
        </div>
        <div className="mt-10 lg:mt-0">
          <div className="intro-x text-8xl font-medium">404</div>
          <div className="intro-x text-xl lg:text-3xl font-medium mt-5">
            Oops. This page has gone missing.
          </div>
          <div className="intro-x text-lg mt-3">
            You may have mistyped the address or the page may have moved.
          </div>
          <Button className="intro-x btn py-3 px-4 border-white dark:border-darkmode-400 dark:text-slate-200 mt-10">
            <Link href="/dashboard">Back to Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
