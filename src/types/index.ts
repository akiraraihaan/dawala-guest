export interface JenisPaket {
  id: number
  nama_paket: string
  createdAt: Date
  updatedAt: Date
}

export interface Makanan {
  id: number
  nama_makanan: string
  deskripsi: string
  foto: string
  harga: number
  jenis_paket_id: number
  createdAt: Date
  updatedAt: Date
  jenisPaket?: JenisPaket
}
