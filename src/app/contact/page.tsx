import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16 pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Hubungi Kami
            </h1>
            <p className="text-lg text-gray-600">
              Hubungi kami untuk informasi lebih lanjut tentang paket wisata dan kuliner
            </p>
          </div>

          <div className="w-full">
            {/* Contact Information */}
            <div className='w-fit mx-auto'>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Informasi Kontak
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
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
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Telepon</h3>
                    <p className="text-gray-600">+62 xxx-xxxx-xxxx</p>
                    <p className="text-gray-500 text-sm">Tersedia 08.00 - 17.00 WIB</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Lokasi</h3>
                    <p className="text-gray-600">Desa Dawala, Indonesia</p>
                    <p className="text-gray-500 text-sm">Melayani wisatawan dari berbagai daerah</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
