import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Amatic_SC, Cabin } from 'next/font/google';
import { Recycle, Sprout } from 'lucide-react';
import './globals.css';

const amatic = Amatic_SC({
  subsets: ['latin'], weight: ['400', '700'],
  variable: '--font-amatic', display: 'swap',
});

const cabin = Cabin({
  subsets: ['latin'], weight: ['400', '500', '600', '700'],
  variable: '--font-cabin', display: 'swap',
});

export const metadata: Metadata = {
  title: 'Trash Treasure — Waste Bank Digital',
  description: 'Sampah punya nilai. Setor, kumpulkan poin, lindungi bumi.',
};

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/setor', label: 'Setor' },
  { href: '/jemput', label: 'Jemput' },
  { href: '/edukasi', label: 'Edukasi' },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className={`${amatic.variable} ${cabin.variable} bg-[#0A1A0E] text-[#E8F0E6] antialiased`}>
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-4 sm:px-6">
          <header className="sticky top-3 z-40 mb-8 rounded-2xl border border-[#1E3D26] bg-[#0F2414]/90 px-5 py-3 backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="flex items-center gap-3 no-underline">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#166534] text-white">
                  <Recycle size={20} />
                </span>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-[#E8F0E6]" style={{ fontFamily: "var(--font-amatic)" }}>
                    Trash Treasure
                  </h1>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#22C55E]">Waste bank digital</p>
                </div>
              </Link>
              <nav className="flex flex-wrap gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-[#7D9A7E] transition-all hover:bg-[#162E1C] hover:text-[#22C55E]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
