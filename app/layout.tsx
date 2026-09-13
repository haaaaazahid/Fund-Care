import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoIntro from '@/components/LogoIntro';

export const metadata: Metadata = {
  title: 'Fund Care — Invest today for better tomorrow.',
  description: 'Fund Care is a financial advisory platform for investment, retirement, insurance, tax, and estate planning.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ThemeProvider>
          <LogoIntro />
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[1000] bg-gold text-navy px-4 py-2.5 text-sm">
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
