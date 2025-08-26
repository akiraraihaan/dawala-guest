"use client"
import Link from 'next/link';


export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex justify-center lg:justify-start">
            <Link href="/" className="flex items-center">
              <img
                src="/Dawala.png"
                alt="Logo Dawala"
                className="h-12 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Beranda
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Kontak
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <a 
              href="mailto:dawaladev@gmail.com"
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
