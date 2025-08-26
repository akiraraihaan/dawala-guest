'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MakananCard from '@/components/MakananCard'
import FilterPaket from '@/components/FilterPaket'
import { LoadingCards } from '@/components/LoadingSpinner'
import { JenisPaket, Makanan } from '@/types'

export default function Menu() {
  const [makanan, setMakanan] = useState<Makanan[]>([])
  const [jenisPaket, setJenisPaket] = useState<JenisPaket[]>([])
  const [selectedPaket, setSelectedPaket] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Menu: Fetching data from APIs...')
        
        const [makananRes, jenisPaketRes] = await Promise.all([
          fetch('/api/makanan'),
          fetch('/api/jenis-paket')
        ])

        console.log('Menu: API Response status:', {
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

        console.log('Menu: Data received:', {
          makananCount: makananData.length,
          jenisPaketCount: jenisPaketData.length
        })

        setMakanan(makananData)
        setJenisPaket(jenisPaketData)
      } catch (error) {
        console.error('Menu: Error fetching data:', error)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Menu Header */}
      <section className="min-h-[500px] bg-gradient-to-r from-green-600 to-green-800 text-white py-16 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-fit">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Paket Wisata & Kuliner Lengkap
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Jelajahi semua pilihan paket wisata dan kuliner yang tersedia di Desa Wisata Alamendah, Kabupaten Bandung
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <p className="text-gray-500 text-sm mt-2">Coba pilih kategori paket yang berbeda.</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <p className="text-gray-600">
                      Menampilkan {filteredMakanan.length} paket
                      {selectedPaket && (
                        <span className="ml-1">
                          dalam kategori {jenisPaket.find(p => p.id === selectedPaket)?.nama_paket}
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMakanan.map((item) => (
                      <MakananCard key={item.id} makanan={item} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap untuk Berwisata?
          </h2>
          <p className="text-xl mb-8">
            Hubungi tim kami untuk merencanakan kunjungan dan mendapatkan penawaran khusus
          </p>
          <a 
            href="mailto:dawaladev@gmail.com"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Hubungi Kami Sekarang
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
