// src/app/layout.js
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Campaign Accountability',
  description: 'Track and verify campaign promises for political candidates',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
        <header className="bg-black text-white py-4">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">
              <Link href="/">Campaign Accountability</Link>
            </h1>
          </div>
        </header>
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <footer className="bg-black text-white py-4 text-center">
          <p>&copy; {new Date().getFullYear()} Campaign Accountability</p>
        </footer>
      </body>
    </html>
  );
}
