import { config } from './config'

// Type definition for the texts structure
export interface Texts {
  header: {
    logoAlt: string
    navigation: {
      home: string
      menu: string
      contact: string
    }
    contactButton: string
  }
  footer: {
    companyName: string
    description: string
    subDescription: string
    contactInfo: {
      title: string
      email: string
      phone: string
      location: string
    }
    quickLinks: {
      title: string
      home: string
      contact: string
      reservation: string
    }
    copyright: string
  }
  home: {
    hero: {
      title: string
      subtitle: string
      ctaButton: string
    }
    featured: {
      badge: string
      title: string
      description: string
    }
    about: {
      title: string
      description1: string
      description2: string
    }
    activities: {
      title: string
      subtitle: string
      culture: {
        title: string
        description: string
      }
      nature: {
        title: string
        description: string
      }
      education: {
        title: string
        description: string
      }
    }
    accommodation: {
      title: string
      description: string
      features: string[]
    }
    cta: {
      title: string
      subtitle: string
      emailButton: string
      contactButton: string
    }
    errors: {
      noPackages: string
    }
  }
  contact: {
    title: string
    subtitle: string
    contactInfo: {
      title: string
      email: {
        label: string
        value: string
        link: string
      }
      phone: {
        label: string
        value: string
        hours: string
      }
      location: {
        label: string
        value: string
        note: string
      }
    }
  }
  menu: {
    header: {
      title: string
      subtitle: string
    }
    content: {
      noPackages: string
      noPackagesSubtitle: string
      showingPackages: string
      inCategory: string
    }
    cta: {
      title: string
      subtitle: string
      button: string
    }
  }
  modal: {
    description: string
    reservation: {
      title: string
      button: string
      emailSubject: string
      emailBody: string
    }
  }
  common: {
    loading: string
    error: string
    retry: string
  }
  images: {
    logo: string
    hero: string
    about: string
    activities: {
      culture: string
      nature: string
      education: string
    }
    accommodation: string
  }
}

// Function to get texts with type safety
export const getTexts = (): Texts => {
  // Import JSON data directly to avoid Turbopack HMR issues
  const textsData = {
    "header": {
      "logoAlt": "Logo Alamendah",
      "navigation": {
        "home": "Beranda",
        "menu": "Menu",
        "contact": "Kontak"
      },
      "contactButton": "Hubungi Kami"
    },
    "footer": {
      "companyName": "DESA WISATA ALAMENDAH",
      "description": "Desa wisata yang menawarkan pengalaman kuliner dan wisata terbaik di Kabupaten Bandung dengan berbagai paket wisata dan kuliner yang menarik.",
      "subDescription": "Nikmati keindahan alam dan cita rasa kuliner lokal yang autentik di Jawa Barat.",
      "contactInfo": {
        "title": "Informasi Kontak",
        "email": config.contact.email,
        "phone": config.contact.phone,
        "location": "Desa Wisata Alamendah, Kab. Bandung, Indonesia"
      },
      "quickLinks": {
        "title": "Menu Cepat",
        "home": "Beranda",
        "contact": "Hubungi Kami",
        "reservation": "Reservasi"
      },
      "copyright": "© 2025 DESA WISATA ALAMENDAH. All rights reserved."
    },
    "home": {
      "hero": {
        "title": "Selamat Datang di Desa Wisata Alamendah hahah",
        "subtitle": "Jelajahi keindahan alam Kabupaten Bandung, nikmati kuliner autentik, dan rasakan pengalaman wisata yang tak terlupakan",
        "ctaButton": "Rencanakan Kunjungan"
      },
      "featured": {
        "badge": "Unggulan Kami",
        "title": "Paket Wisata & Kuliner",
        "description": "Temukan berbagai pilihan paket wisata dan kuliner yang telah kami siapkan khusus untuk pengalaman yang berkesan di Desa Wisata Alamendah, Kabupaten Bandung"
      },
      "about": {
        "title": "Tentang Desa Wisata Alamendah",
        "description1": "Desa Wisata Alamendah di Kabupaten Bandung menawarkan pengalaman autentik kehidupan pedesaan dengan keindahan alam yang menakjubkan. Nikmati aktivitas wisata yang beragam, mulai dari wisata alam, budaya, hingga kuliner tradisional yang lezat.",
        "description2": "Dengan pemandangan pegunungan yang indah dan udara yang sejuk, Alamendah adalah destinasi sempurna untuk melepas penat dari kehidupan kota yang sibuk."
      },
      "activities": {
        "title": "Aktivitas & Pengalaman",
        "subtitle": "Berbagai kegiatan menarik menanti Anda di Desa Wisata Alamendah, Kabupaten Bandung",
        "culture": {
          "title": "Wisata Budaya",
          "description": "Saksikan pertunjukan seni budaya lokal dan pelajari tradisi yang telah turun temurun"
        },
        "nature": {
          "title": "Wisata Alam",
          "description": "Jelajahi keindahan alam dengan tracking, bird watching, dan aktivitas outdoor lainnya"
        },
        "education": {
          "title": "Wisata Edukasi",
          "description": "Program edukasi dan workshop untuk mengenal lebih dekat kehidupan pedesaan"
        }
      },
      "accommodation": {
        "title": "Akomodasi yang Nyaman",
        "description": "Menginaplah dengan pemandangan yang menakjubkan langsung dari jendela kamar Anda. Rasakan kenyamanan fasilitas modern dengan nuansa tradisional yang autentik.",
        "features": [
          "Pemandangan pegunungan yang indah",
          "Udara segar dan sejuk",
          "Fasilitas lengkap dan modern"
        ]
      },
      "cta": {
        "title": "Siap untuk Petualangan yang Tak Terlupakan?",
        "subtitle": "Hubungi kami sekarang dan rencanakan kunjungan Anda ke Desa Wisata Alamendah, Kabupaten Bandung",
        "emailButton": "Email Kami",
        "contactButton": "Hubungi Kami"
      },
      "errors": {
        "noPackages": "Tidak ada paket yang ditemukan."
      }
    },
    "contact": {
      "title": "Hubungi Kami",
      "subtitle": "Hubungi kami untuk informasi lebih lanjut tentang paket wisata dan kuliner",
      "contactInfo": {
        "title": "Informasi Kontak",
        "email": {
          "label": "Email",
          "value": config.contact.email,
          "link": "Kirim email ke kami"
        },
        "phone": {
          "label": "Telepon",
          "value": config.contact.phone,
          "hours": "Tersedia 08.00 - 17.00 WIB"
        },
        "location": {
          "label": "Lokasi",
          "value": "Desa Wisata Alamendah, Kabupaten Bandung, Jawa Barat, Indonesia",
          "note": "Melayani wisatawan dari berbagai daerah"
        }
      }
    },
    "menu": {
      "header": {
        "title": "Paket Wisata & Kuliner Lengkap",
        "subtitle": "Jelajahi semua pilihan paket wisata dan kuliner yang tersedia di Desa Wisata Alamendah, Kabupaten Bandung"
      },
      "content": {
        "noPackages": "Tidak ada paket yang ditemukan.",
        "noPackagesSubtitle": "Coba pilih kategori paket yang berbeda.",
        "showingPackages": "Menampilkan {count} paket",
        "inCategory": "dalam kategori {category}"
      },
      "cta": {
        "title": "Siap untuk Berwisata?",
        "subtitle": "Hubungi tim kami untuk merencanakan kunjungan dan mendapatkan penawaran khusus",
        "button": "Hubungi Kami Sekarang"
      }
    },
    "modal": {
      "description": "Deskripsi",
      "reservation": {
        "title": "Informasi & Reservasi",
        "button": "Reservasi Sekarang",
        "emailSubject": "Reservasi Paket Wisata",
        "emailBody": "Saya tertarik dengan paket: {packageName}"
      }
    },
    "common": {
      "loading": "Memuat...",
      "error": "Terjadi kesalahan",
      "retry": "Coba lagi"
    },
    "images": {
      "logo": "/Dawala.png",
      "hero": "/images/DSC06062.JPG",
      "about": "/images/Desa Wisata Alamendah (118).JPG",
      "activities": {
        "culture": "/images/12.jpg",
        "nature": "/images/DSC01831.JPG",
        "education": "/images/5.jpg"
      },
      "accommodation": "/images/WhatsApp Image 2022-12-01 at 15.37.06.jpeg"
    }
  }
  
  return textsData as Texts
}

// Helper function to replace placeholders in strings
export const replacePlaceholders = (text: string, replacements: Record<string, string | number>): string => {
  let result = text
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value))
  })
  return result
}
