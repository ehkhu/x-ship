import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { fontMono, fontSans } from '@/lib/fonts';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/providers';
import { SiteHeader } from '@/components/layouts/site-header';
import { Toaster } from '@/components/ui/sonner';
// import { Toaster } from 'sonner';
// setting up font
// const fontSans = FontSans({
//   subsets: ['latin'],
//   variable: '--font-sans',
// });
const appName = process.env.APP_NAME;
export const metadata: Metadata = {
  title: appName,
  description: '',
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* <div className="relative flex min-h-screen flex-col"> */}
          {/* <SiteHeader /> */}
          {/* <main className="flex-1">{children}</main> */}
          {/* </div> */}
          {/* <TailwindIndicator /> */}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
