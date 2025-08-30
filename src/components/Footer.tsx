import { getTexts } from '@/lib/texts'

export default function Footer() {
  const texts = getTexts()
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{texts.footer.companyName}</h3>
            <p className="text-gray-300 mb-4">
              {texts.footer.description}
            </p>
            <p className="text-gray-300 text-sm">
              {texts.footer.subDescription}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{texts.footer.contactInfo.title}</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: {texts.footer.contactInfo.email}</p>
              <p>Phone: {texts.footer.contactInfo.phone}</p>
              <p>Lokasi: {texts.footer.contactInfo.location}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{texts.footer.quickLinks.title}</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-300 hover:text-white transition-colors">
                {texts.footer.quickLinks.home}
              </a>
              <a href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                {texts.footer.quickLinks.contact}
              </a>
              <a href={`mailto:${texts.footer.contactInfo.email}`} className="block text-gray-300 hover:text-white transition-colors">
                {texts.footer.quickLinks.reservation}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            {texts.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
