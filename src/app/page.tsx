
'use client'
import { useState, useEffect } from 'react'
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
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Selamat Datang di Desa Wisata Dawala
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Jelajahi keindahan alam, nikmati kuliner autentik, dan rasakan pengalaman wisata yang tak terlupakan
          </p>
          <a 
            href="mailto:dawaladev@gmail.com"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Rencanakan Kunjungan
          </a>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Paket Wisata & Kuliner
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan berbagai pilihan paket wisata dan kuliner yang telah kami siapkan khusus untuk pengalaman yang berkesan
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
              <FilterPaket 
                jenisPaket={jenisPaket}
                selectedPaket={selectedPaket}
                onSelectPaket={setSelectedPaket}
              />

              {filteredMakanan.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Tidak ada paket yang ditemukan.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMakanan.map((item) => (
                    <MakananCard 
                      key={item.id} 
                      makanan={item} 
                      onClick={() => openModal(item)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
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
