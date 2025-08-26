"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-white/90 backdrop-blur-sm shadow-md py-6'
    }`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex justify-center lg:justify-start">
            <Link href="/" className="flex items-center">
              <img
                src="/Dawala.png"
                alt="Logo Alamendah"
                className={`w-auto transition-all duration-300 ${
                  isScrolled ? 'h-10' : 'h-12'
                }`}
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              Beranda
            </Link>
            <Link 
              href="/menu" 
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              Menu
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              Kontak
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <a 
              href="mailto:dawaladev@gmail.com"
              className={`bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-all duration-300 ${
                isScrolled ? 'px-3 py-2' : 'px-4 py-2'
              }`}
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
