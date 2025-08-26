import { JenisPaket, Makanan } from '@/types'

export const sampleJenisPaket: JenisPaket[] = [
  {
    id: 1,
    nama_paket: "Paket Wisata Alam",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    nama_paket: "Paket Kuliner Tradisional",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    nama_paket: "Paket Wisata Budaya",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    nama_paket: "Paket Adventure",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const sampleMakanan: Makanan[] = [
  {
    id: 1,
    nama_makanan: "Nasi Gudeg Alamendah",
    deskripsi: "Gudeg khas Desa Wisata Alamendah dengan cita rasa autentik, disajikan dengan ayam kampung dan sambal krecek pedas.",
    foto: "https://images.unsplash.com/photo-1596040033229-a8a1b99afd77?w=500&h=300&fit=crop",
    harga: 25000,
    jenis_paket_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    jenisPaket: sampleJenisPaket[1]
  },
  {
    id: 2,
    nama_makanan: "Sate Ayam Kampung",
    deskripsi: "Sate ayam kampung dengan bumbu kacang khas desa, daging empuk dan aroma rempah yang menggoda.",
    foto: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&h=300&fit=crop",
    harga: 30000,
    jenis_paket_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    jenisPaket: sampleJenisPaket[1]
  },
  {
    id: 3,
    nama_makanan: "Paket Hiking Bukit Alamendah",
    deskripsi: "Nikmati pemandangan sunrise dari puncak bukit dengan guide lokal berpengalaman. Termasuk sarapan tradisional.",
    foto: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=300&fit=crop",
    harga: 75000,
    jenis_paket_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    jenisPaket: sampleJenisPaket[0]
  },
  {
    id: 4,
    nama_makanan: "Wisata Air Terjun Sekumpul",
    deskripsi: "Jelajahi keindahan air terjun tersembunyi dengan tracking ringan melalui hutan bambu yang sejuk.",
    foto: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    harga: 50000,
    jenis_paket_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    jenisPaket: sampleJenisPaket[0]
  },
  {
    id: 5,
    nama_makanan: "Gado-gado Alamendah",
    deskripsi: "Gado-gado dengan sayuran segar dari kebun desa dan bumbu kacang rahasia keluarga turun temurun.",
    foto: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=300&fit=crop",
    harga: 20000,
    jenis_paket_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    jenisPaket: sampleJenisPaket[1]
  },
  {
    id: 6,
    nama_makanan: "Workshop Batik Tradisional",
    deskripsi: "Belajar membuat batik tradisional dari pengrajin lokal, termasuk alat dan bahan yang diperlukan.",
    foto: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    harga: 100000,
    jenis_paket_id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    jenisPaket: sampleJenisPaket[2]
  },
  {
    id: 7,
    nama_makanan: "Tari Kecak & Dinner",
    deskripsi: "Pertunjukan tari kecak tradisional sambil menikmati dinner dengan menu lokal di bawah bintang.",
    foto: "https://images.unsplash.com/photo-1544531545-4d850ab7d4d9?w=500&h=300&fit=crop",
    harga: 85000,
    jenis_paket_id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    jenisPaket: sampleJenisPaket[2]
  },
  {
    id: 8,
    nama_makanan: "River Tubing Adventure",
    deskripsi: "Serunya mengarungi sungai dengan ban pelampung melalui trek sepanjang 3km dengan pemandangan eksotis.",
    foto: "https://images.unsplash.com/photo-1554979879-fdf9fb22e6b3?w=500&h=300&fit=crop",
    harga: 90000,
    jenis_paket_id: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    jenisPaket: sampleJenisPaket[3]
  },
  {
    id: 9,
    nama_makanan: "Cycling Tour Desa",
    deskripsi: "Berkeliling desa dengan sepeda sambil menikmati pemandangan sawah dan berinteraksi dengan warga lokal.",
    foto: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=300&fit=crop",
    harga: 45000,
    jenis_paket_id: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    jenisPaket: sampleJenisPaket[3]
  }
]
