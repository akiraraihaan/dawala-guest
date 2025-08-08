import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Check if super admin already exists
  const existingSuperAdmin = await prisma.user.findFirst({
    where: { role: 'SUPER_ADMIN' }
  })

  if (!existingSuperAdmin) {
    // Create super admin - Note: You'll need to create this user in Supabase Auth first
    const superAdmin = await prisma.user.create({
      data: {
        id: 'super-admin-id', // This should be replaced with actual Supabase Auth ID
        email: process.env.SUPER_ADMIN_EMAIL || 'dawaladev@gmail.com',
        role: 'SUPER_ADMIN'
      }
    })
    console.log('✅ Super admin created:', superAdmin.email)
  } else {
    console.log('ℹ️ Super admin already exists')
  }

  // Seed sample data for JenisPaket
  const jenisNasi = await prisma.jenisPaket.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nama_paket: 'Nasi Box'
    }
  })

  const jenisSnack = await prisma.jenisPaket.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nama_paket: 'Snack Box'
    }
  })

  const jenisMinuman = await prisma.jenisPaket.upsert({
    where: { id: 3 },
    update: {},
    create: {
      nama_paket: 'Minuman'
    }
  })

  // Seed sample data for Makanan
  await prisma.makanan.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nama_makanan: 'Nasi Gudeg',
      deskripsi: 'Nasi gudeg khas Yogyakarta dengan lauk ayam dan telur',
      foto: '/images/nasi-gudeg.jpg',
      harga: 15000,
      jenis_paket_id: jenisNasi.id
    }
  })

  await prisma.makanan.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nama_makanan: 'Nasi Rendang',
      deskripsi: 'Nasi dengan rendang daging sapi yang empuk dan bumbu rica',
      foto: '/images/nasi-rendang.jpg',
      harga: 18000,
      jenis_paket_id: jenisNasi.id
    }
  })

  await prisma.makanan.upsert({
    where: { id: 3 },
    update: {},
    create: {
      nama_makanan: 'Risoles Mayo',
      deskripsi: 'Risoles isi sayuran dengan mayonaise segar',
      foto: '/images/risoles.jpg',
      harga: 5000,
      jenis_paket_id: jenisSnack.id
    }
  })

  await prisma.makanan.upsert({
    where: { id: 4 },
    update: {},
    create: {
      nama_makanan: 'Es Teh Manis',
      deskripsi: 'Es teh manis segar',
      foto: '/images/es-teh.jpg',
      harga: 3000,
      jenis_paket_id: jenisMinuman.id
    }
  })

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
