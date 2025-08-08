import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Hubungi Kami
            </h1>
            <p className="text-lg text-gray-600">
              Hubungi kami untuk informasi lebih lanjut tentang paket wisata dan kuliner
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Informasi Kontak
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📧</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600">dawaladev@gmail.com</p>
                    <a 
                      href="mailto:dawaladev@gmail.com"
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Kirim email ke kami
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📱</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Telepon</h3>
                    <p className="text-gray-600">+62 xxx-xxxx-xxxx</p>
                    <p className="text-gray-500 text-sm">Tersedia 08.00 - 17.00 WIB</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📍</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Lokasi</h3>
                    <p className="text-gray-600">Desa Dawala, Indonesia</p>
                    <p className="text-gray-500 text-sm">Melayani wisatawan dari berbagai daerah</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Kirim Pesan
              </h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  <strong>Catatan:</strong> Ini adalah form tampilan. Untuk menghubungi kami, silakan kirim email langsung ke{' '}
                  <a href="mailto:dawaladev@gmail.com" className="underline">
                    dawaladev@gmail.com
                  </a>
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nama Anda"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="email.anda@contoh.com"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Subjek pesan Anda"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ceritakan tentang rencana wisata Anda..."
                    disabled
                  ></textarea>
                </div>

                <div className="text-center">
                  <a
                    href="mailto:dawaladev@gmail.com"
                    className="inline-block bg-green-600 text-white px-8 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
                  >
                    Kirim Email Langsung
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
