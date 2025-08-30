'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getTexts } from '@/lib/texts'
import { usePathname } from 'next/navigation'
import { getCurrentLocale } from '@/lib/locale'

export default function Contact() {
  const pathname = usePathname()
  const locale = getCurrentLocale(pathname)
  const [texts, setTexts] = useState<any>(null)

  useEffect(() => {
    const loadTexts = async () => {
      const loadedTexts = await getTexts(locale)
      setTexts(loadedTexts)
    }
    loadTexts()
  }, [locale])
  if (!texts) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading translations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16 pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {texts.contact.title}
            </h1>
            <p className="text-lg text-gray-600">
              {texts.contact.subtitle}
            </p>
          </div>

          <div className="w-full">
            {/* Contact Information */}
            <div className='w-fit mx-auto'>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {texts.contact.contactInfo.title}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">{texts.contact.contactInfo.email.label}</h3>
                    <p className="text-gray-600">{texts.contact.contactInfo.email.value}</p>
                    <a 
                      href={`mailto:${texts.contact.contactInfo.email.value}`}
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      {texts.contact.contactInfo.email.link}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">{texts.contact.contactInfo.phone.label}</h3>
                    <p className="text-gray-600">{texts.contact.contactInfo.phone.value}</p>
                    <p className="text-gray-500 text-sm">{texts.contact.contactInfo.phone.hours}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">{texts.contact.contactInfo.location.label}</h3>
                    <p className="text-gray-600">{texts.contact.contactInfo.location.value}</p>
                    <p className="text-gray-500 text-sm">{texts.contact.contactInfo.location.note}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </div>
  )
}
