
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MakananCard from '@/components/MakananCard'
import MakananModal from '@/components/MakananModal'
import FilterPaket from '@/components/FilterPaket'
import { LoadingCards } from '@/components/LoadingSpinner'
import { JenisPaket, Makanan } from '@/types'


export default function Home() {
  const [makanan, setMakanan] = useState<Makanan[]>([])
  const [jenisPaket, setJenisPaket] = useState<JenisPaket[]>([])
  const [selectedPaket, setSelectedPaket] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMakanan, setSelectedMakanan] = useState<Makanan | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Fetching data from APIs...')
        
        const [makananRes, jenisPaketRes] = await Promise.all([
          fetch('/api/makanan'),
          fetch('/api/jenis-paket')
        ])

        console.log('API Response status:', {
          makanan: makananRes.status,
          jenisPaket: jenisPaketRes.status
        })

        if (!makananRes.ok || !jenisPaketRes.ok) {
          throw new Error(`API Error: makanan=${makananRes.status}, jenisPaket=${jenisPaketRes.status}`)
        }

        const [makananData, jenisPaketData] = await Promise.all([
          makananRes.json(),
          jenisPaketRes.json()
        ])

        console.log('Data received:', {
          makananCount: makananData.length,
          jenisPaketCount: jenisPaketData.length
        })

        setMakanan(makananData)
        setJenisPaket(jenisPaketData)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(`Failed to load data: ${error instanceof Error ? error.message : 'Unknown error'}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredMakanan = selectedPaket
    ? makanan.filter(item => item.jenis_paket_id === selectedPaket)
    : makanan

  const openModal = (item: Makanan) => {
    setSelectedMakanan(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedMakanan(null)
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section dengan Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/DSC06062.JPG"
            alt="Pemandangan Desa Wisata Alamendah"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Selamat Datang di Desa Wisata Alamendah
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
            Jelajahi keindahan alam Kabupaten Bandung, nikmati kuliner autentik, dan rasakan pengalaman wisata yang tak terlupakan
          </p>
          <a 
            href="mailto:dawaladev@gmail.com"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
          >
            Rencanakan Kunjungan
          </a>
        </div>
      </section>

      {/* Featured Menu Section - Highlighted */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-blue-50/30"></div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block">
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-4 inline-block">
                  Unggulan Kami
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Paket Wisata & Kuliner
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Temukan berbagai pilihan paket wisata dan kuliner yang telah kami siapkan khusus untuk pengalaman yang berkesan di Desa Wisata Alamendah, Kabupaten Bandung
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
                {error}
              </div>
            )}

            {loading ? (
              <LoadingCards />
            ) : (
              <>
                <div className="mb-12">
                  <FilterPaket 
                    jenisPaket={jenisPaket}
                    selectedPaket={selectedPaket}
                    onSelectPaket={setSelectedPaket}
                  />
                </div>

                {filteredMakanan.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">Tidak ada paket yang ditemukan.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMakanan.map((item) => (
                      <div key={item.id} className="transform hover:scale-105 transition-all duration-300">
                        <MakananCard 
                          makanan={item} 
                          onClick={() => openModal(item)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Tentang Desa Wisata Alamendah
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Desa Wisata Alamendah di Kabupaten Bandung menawarkan pengalaman autentik kehidupan pedesaan dengan keindahan alam yang menakjubkan. 
                Nikmati aktivitas wisata yang beragam, mulai dari wisata alam, budaya, hingga kuliner tradisional yang lezat.
              </p>
              <p className="text-lg text-gray-600">
                Dengan pemandangan pegunungan yang indah dan udara yang sejuk, Alamendah adalah destinasi sempurna untuk 
                melepas penat dari kehidupan kota yang sibuk.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/Desa Wisata Alamendah (118).JPG"
                alt="Suasana Desa Wisata Alamendah"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Activities Gallery */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Aktivitas & Pengalaman
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Berbagai kegiatan menarik menanti Anda di Desa Wisata Alamendah, Kabupaten Bandung
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Budaya */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/images/12.jpg"
                  alt="Wisata Budaya"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Wisata Budaya</h3>
                <p className="text-gray-600">
                  Saksikan pertunjukan seni budaya lokal dan pelajari tradisi yang telah turun temurun
                </p>
              </div>
            </div>

            {/* Card 2 - Alam */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/images/DSC01831.JPG"
                  alt="Wisata Alam"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Wisata Alam</h3>
                <p className="text-gray-600">
                  Jelajahi keindahan alam dengan tracking, bird watching, dan aktivitas outdoor lainnya
                </p>
              </div>
            </div>

            {/* Card 3 - Edukasi */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/images/5.jpg"
                  alt="Wisata Edukasi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Wisata Edukasi</h3>
                <p className="text-gray-600">
                  Program edukasi dan workshop untuk mengenal lebih dekat kehidupan pedesaan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comfort & Accommodation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/WhatsApp Image 2022-12-01 at 15.37.06.jpeg"
                alt="Pemandangan dari Akomodasi"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Akomodasi yang Nyaman
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Menginaplah dengan pemandangan yang menakjubkan langsung dari jendela kamar Anda. 
                Rasakan kenyamanan fasilitas modern dengan nuansa tradisional yang autentik.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Pemandangan pegunungan yang indah</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Udara segar dan sejuk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Fasilitas lengkap dan modern</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap untuk Petualangan yang Tak Terlupakan?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Hubungi kami sekarang dan rencanakan kunjungan Anda ke Desa Wisata Alamendah, Kabupaten Bandung
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:dawaladev@gmail.com"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Email Kami
            </a>
            <a 
              href="tel:+62123456789"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Modal */}
      <MakananModal
        makanan={selectedMakanan}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  )
}
