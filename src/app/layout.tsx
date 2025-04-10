import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../components/CartContext';
import CartCounter from '../components/CartCounter';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jummai Store',
  description: 'Browse our amazing products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="flex items-center cursor-pointer hover:transform hover:scale-105 transition-transform duration-300">
                <h1 className="text-3xl font-bold text-green-950">Jummai (J)</h1>
              </Link>
              <nav className="flex items-center gap-6">
                <Link href="/products" className="hover:text-blue-600">
                  Products
                </Link>{' '}
                <CartCounter />
              </nav>
            </div>
          </header>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
