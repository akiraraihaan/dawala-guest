
export interface JenisPaket {
  id: number;
  nama_paket: string;
}


export interface Makanan {
  id: number;
  nama_makanan: string;
  deskripsi: string;
  foto: string[];
  harga: number;
  jenis_paket_id: number;
  jenisPaket?: JenisPaket;
}
