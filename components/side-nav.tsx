'use client';
import { cn } from '@/lib/utils';
import {
  Baby,
  BookHeart,
  Dna,
  Home,
  Mailbox,
  PillBottle,
  SmilePlus,
  UserCircle,
  Worm,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideNav() {
  const navs = [
    {
      link: '/',
      name: 'Dashboard',
      icon: <Home className="w-4 h-4" />,
    },
    {
      link: '/patients',
      name: 'Patients',
      icon: <UserCircle className="w-4 h-4" />,
    },
    {
      title: 'Maternal Health',
      items: [
        {
          link: '/ancs',
          name: 'ANC Service',
          icon: <Baby className="w-4 h-4" />,
        },
        {
          link: '/deliverys',
          name: 'Del Service',
          icon: <SmilePlus className="w-4 h-4" />,
        },
        {
          link: '/pncs',
          name: 'PNC Service',
          icon: <PillBottle className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'SHR Services',
      items: [
        {
          link: '/fps',
          name: 'FP Service',
          icon: <BookHeart className="w-4 h-4" />,
        },
        {
          link: '/rhs',
          name: 'RH Service',
          icon: <Dna className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'General Services',
      items: [
        {
          link: '/gms',
          name: 'GM Service',
          icon: <Worm className="w-4 h-4" />,
        },
        // {
        //   link: '/soon',
        //   name: 'soon Service',
        //   icon: <Dna className="w-4 h-4" />,
        // },
      ],
    },
    {
      title: 'Cross Cutting',
      items: [
        {
          link: '/cfrms',
          name: 'CFRM',
          icon: <Mailbox className="w-4 h-4" />,
        },
      ],
    },
  ];
  const pathname = usePathname();
  return (
    <>
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {navs.map((nav) => {
          if (nav.title) {
            return (
              <div key={nav.title}>
                <h4 className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                  {nav.title}
                </h4>
                {nav.items.map(({ link, name, icon }) => (
                  <Link
                    key={link}
                    href={pathname === link ? '#' : link}
                    className={cn(
                      pathname === link || pathname.startsWith(`${link}/`)
                        ? 'bg-muted hover:bg-muted'
                        : 'hover:bg-transparent hover:underline text-muted-foreground',
                      'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary'
                    )}
                  >
                    {icon}
                    {name}
                  </Link>
                ))}
              </div>
            );
          }

          return (
            <Link
              key={nav.link}
              href={nav.link ? (pathname === nav.link ? '#' : nav.link) : '#'} // Fallback to '#' if nav.link is undefined
              className={cn(
                pathname === nav.link || pathname.startsWith(`${nav.link}/`)
                  ? 'bg-muted hover:bg-muted'
                  : 'hover:bg-transparent hover:underline text-muted-foreground',
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary'
              )}
            >
              {nav.icon}
              {nav.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

//for active
//remove class 'text-muted-foreground'
//add calss 'bg-muted'
