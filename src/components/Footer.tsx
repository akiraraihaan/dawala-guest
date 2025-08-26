export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">DAWALA VILLAGE</h3>
            <p className="text-gray-300 mb-4">
              Desa wisata yang menawarkan pengalaman kuliner dan wisata terbaik dengan berbagai paket wisata dan kuliner yang menarik.
            </p>
            <p className="text-gray-300 text-sm">
              Nikmati keindahan alam dan cita rasa kuliner lokal yang autentik.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Informasi Kontak</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: dawaladev@gmail.com</p>
              <p>Phone: +62 xxx-xxxx-xxxx</p>
              <p>Lokasi: Desa Wisata Alamendah, Kab. Bandung, Indonesia</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Menu Cepat</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-300 hover:text-white transition-colors">
                Beranda
              </a>
              <a href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Hubungi Kami
              </a>
              <a href="mailto:dawaladev@gmail.com" className="block text-gray-300 hover:text-white transition-colors">
                Reservasi
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 DAWALA VILLAGE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
