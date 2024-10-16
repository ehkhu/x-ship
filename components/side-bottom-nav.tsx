'use client';
import { cn } from '@/lib/utils';
import { UserCog } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function SideBottonNav() {
  const navs = [
    {
      link: '/users',
      name: 'Users',
      icon: <UserCog className="w-4 h-4" />,
    },
  ];
  const pathname = usePathname();
  return (
    <>
      {/*  <Link
              href="/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <UserCog className="h-4 w-4" />
              Users
            </Link> */}
      {navs.map(({ link, name, icon }) => (
        <Link
          key={link}
          href={pathname === link ? '#' : link}
          // className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          className={cn(
            // buttonVariants({ variant: "ghost" }),
            pathname === link
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline  text-muted-foreground',
            'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary'
          )}
        >
          {icon}
          {name}
        </Link>
      ))}
    </>
  );
}

//for active
//remove class 'text-muted-foreground'
//add calss 'bg-muted'
