import Image from 'next/image'
import { Makanan } from '@/types'

interface MakananCardProps {
  makanan: Makanan
  onClick?: () => void
}

export default function MakananCard({ makanan, onClick }: MakananCardProps) {
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        <Image
          src={makanan.foto && (makanan.foto.startsWith('http') || makanan.foto.startsWith('/')) ? makanan.foto : '/placeholder.png'}
          alt={makanan.nama_makanan}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          {makanan.nama_makanan}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {makanan.deskripsi}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            {formatRupiah(makanan.harga)}
          </span>
          {makanan.jenisPaket && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {makanan.jenisPaket.nama_paket}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
