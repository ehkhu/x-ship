import {
  Briefcase,
  Home,
  LineChart,
  MapPin,
  Package,
  ShoppingCart,
  Users,
  Users2,
} from 'lucide-react';
import Link from 'next/link';
export default function SideNav() {
  const navs = [
    {
      link: '/',
      name: 'Dashboard',
      icon: <Home className="w-4 h-4" />,
    },
    {
      link: '/jobs',
      name: 'Jobs',
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      link: '/locations',
      name: 'Locations',
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      link: '/departments',
      name: 'Departments',
      icon: <Users2 className="w-4 h-4" />,
    },
    {
      link: '/employees',
      name: 'Employees',
      icon: <Users className="w-4 h-4" />,
    },
    {
      link: '/analytics',
      name: 'Analytics',
      icon: <LineChart className="w-4 h-4" />,
    },
  ];
  return (
    <>
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {navs.map(({ link, name, icon }) => (
          <Link
            key={link}
            href={link}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            {icon}
            {name}
          </Link>
        ))}
      </nav>
    </>
  );
}
