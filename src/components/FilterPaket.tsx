import { JenisPaket } from '@/types'

interface FilterPaketProps {
  jenisPaket: JenisPaket[]
  selectedPaket: number | null
  onSelectPaket: (paketId: number | null) => void
}

export default function FilterPaket({ jenisPaket, selectedPaket, onSelectPaket }: FilterPaketProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter berdasarkan Kategori</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectPaket(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedPaket === null
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Semua Paket
        </button>
        {jenisPaket.map((paket) => (
          <button
            key={paket.id}
            onClick={() => onSelectPaket(paket.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedPaket === paket.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {paket.nama_paket}
          </button>
        ))}
      </div>
    </div>
  )
}
