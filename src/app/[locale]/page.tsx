import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold mb-4">{t('home')}</h1>
        <p className="text-lg text-gray-600 mb-8">Desa Wisata Dawala</p>
      </main>
      <Footer />
    </div>
  );
}
