import Link from 'next/link';
import {
  Briefcase,
  Home,
  LineChart,
  MapPin,
  Package,
  Package2,
  ShoppingCart,
  Users,
  Users2,
} from 'lucide-react';
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
export default function MobileSideNav() {
  return (
    <>
      <nav className="grid gap-2 text-lg font-medium">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">{process.env.APP_NAME}</span>
        </Link>
        {navs.map(({ link, name, icon }) => (
          <Link
            key={link}
            href={link}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            {icon}
            {name}
          </Link>
        ))}
        {/* <Link
          href="#"
          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          Orders
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </Badge>
        </Link>
        <Link
          href="#"
          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Package className="h-5 w-5" />
          Products
        </Link>
        <Link
          href="#"
          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Users className="h-5 w-5" />
          Customers
        </Link>
        <Link
          href="#"
          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <LineChart className="h-5 w-5" />
          Analytics
        </Link> */}
      </nav>
    </>
  );
}
