
export interface JenisPaket {
  id: number;
  namaPaket: string;
}


export interface Makanan {
  id: number;
  namaMakanan: string;
  deskripsi: string;
  foto: string[];
  harga: number;
  jenisPaketId: number;
  jenisPaket?: JenisPaket;
}
