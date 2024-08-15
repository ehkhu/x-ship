import Link from 'next/link';
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from '@/components/layouts/mode-toggle';

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-2xl font-bold">Under Construction</h1>
        <p className="text-sm text-muted-foreground">
          This page is currently under construction and will be available soon.
        </p>
      </div>
    </div>
  );
}
