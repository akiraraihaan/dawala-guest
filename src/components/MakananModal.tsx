'use client'

import { useState } from 'react'
import { Makanan } from '@/types'
import Image from 'next/image'

interface MakananModalProps {
  makanan: Makanan | null
  isOpen: boolean
  onClose: () => void
}

export default function MakananModal({ makanan, isOpen, onClose }: MakananModalProps) {
  // Support single image or array of images from makanan.foto
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  if (!isOpen || !makanan) return null

  // Supabase Storage public base URL for 'gastronomi' bucket
  const SUPABASE_BASE_URL =
    'https://iroaauayoqlfsetgtlec.supabase.co/storage/v1/object/public/gastronomi';

  // Helper to get correct image src
  const getImageUrl = (fotoStr: string) => {
    if (!fotoStr) return '/placeholder-food.jpg';
    if (fotoStr.startsWith('data:image')) return fotoStr;
    if (fotoStr.startsWith('http')) return fotoStr;
    // If fotoStr is just a filename, build Supabase public URL
    return `${SUPABASE_BASE_URL}/${fotoStr}`;
  };

  // Helper: parse foto field (same as in MakananCard)
  const parsePhotoArray = (foto: any) => {
    if (!foto) return [];
    
    // If it's a string that looks like JSON, try to parse it
    if (typeof foto === 'string') {
      // Check if it's a JSON string
      if (foto.startsWith('[') && foto.endsWith(']')) {
        try {
          const parsed = JSON.parse(foto);
          if (Array.isArray(parsed)) {
            return parsed.filter((f: any) => 
              typeof f === 'string' && (f.startsWith('http') || f.startsWith('data:image'))
            );
          }
          return [];
        } catch (e) {
          console.log('Error parsing foto JSON in modal:', e);
          return [];
        }
      }
      // If it's a direct URL string
      if (foto.startsWith('http') || foto.startsWith('data:image')) {
        return [foto];
      }
      return [];
    }
    
    if (Array.isArray(foto)) {
      return foto.filter((f: any) => 
        typeof f === 'string' && (f.startsWith('http') || f.startsWith('data:image'))
      );
    }
    
    return [];
  };

  const photoUrls = parsePhotoArray(makanan.foto);
  const images: string[] = photoUrls.length > 0 
    ? photoUrls.map(getImageUrl) 
    : ['/placeholder-food.jpg'];

  console.log('Modal foto raw:', makanan.foto);
  console.log('Modal parsed photos:', photoUrls);
  console.log('Modal final images:', images);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{makanan.nama_makanan}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-semibold cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Slider */}
          <div className="relative mb-6">
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src={images[currentImageIndex] || '/placeholder-food.jpg'}
                alt={makanan.nama_makanan || 'Gambar makanan'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e: any) => {
                  e.target.src = '/placeholder-food.jpg';
                }}
              />
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all cursor-pointer"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all cursor-pointer"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            {/* Image Dots Indicator */}
            {images.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-green-600">
                Rp {makanan.harga.toLocaleString('id-ID')}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Deskripsi</h3>
              <div className="text-gray-600 leading-relaxed">
                <p>{makanan.deskripsi}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Informasi & Reservasi</h4>
              <a 
                href={`mailto:dawaladev@gmail.com?subject=Reservasi Paket Wisata&body=Saya tertarik dengan paket: ${makanan.nama_makanan}`}
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Reservasi Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
