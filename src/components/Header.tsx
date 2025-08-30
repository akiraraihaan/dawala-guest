"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTexts } from '@/lib/texts';
import { getCurrentLocale } from '@/lib/locale';
import LanguageSwitcher from './LanguageSwitcher';


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [texts, setTexts] = useState<any>(null);
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname);

  useEffect(() => {
    const loadTexts = async () => {
      const loadedTexts = await getTexts(locale);
      setTexts(loadedTexts);
    };
    loadTexts();
  }, [locale]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!texts) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

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
                alt={texts.header.logoAlt}
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
              {texts.header.navigation.home}
            </Link>
            <Link 
              href="/menu" 
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              {texts.header.navigation.menu}
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              {texts.header.navigation.contact}
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <a 
              href="mailto:dawaladev@gmail.com"
              className={`bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-all duration-300 ${
                isScrolled ? 'px-3 py-2' : 'px-4 py-2'
              }`}
            >
              {texts.header.contactButton}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
