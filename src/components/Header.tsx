"use client"
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] === 'en' ? 'en' : 'id';
  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex justify-center lg:justify-start">
            <Link href={`/${currentLocale}`} className="flex items-center">
              <img
                src="/Dawala.png"
                alt="Logo Dawala"
                className="h-12 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link 
              href={`/${currentLocale}`} 
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              {t('home')}
            </Link>
            <Link 
              href={`/${currentLocale}/menu`} 
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              {t('menu')}
            </Link>
            <Link 
              href={`/${currentLocale}/contact`} 
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              {t('contact')}
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => switchLocale('id')}
              className={`px-2 py-1 rounded ${currentLocale === 'id' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >ID</button>
            <button
              onClick={() => switchLocale('en')}
              className={`px-2 py-1 rounded ${currentLocale === 'en' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >EN</button>
            <a 
              href="mailto:dawaladev@gmail.com"
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              {t('contact_us')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
