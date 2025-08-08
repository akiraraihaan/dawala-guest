import { NextResponse } from 'next/server'
import pool from '@/lib/postgres'

export async function GET() {
  try {
    console.log('API jenis-paket called - using direct PostgreSQL connection')
    console.log('Database URL exists:', !!process.env.DATABASE_URL)
    
    const client = await pool.connect()
    
    try {
      const result = await client.query(`
        SELECT id, nama_paket, "createdAt", "updatedAt"
        FROM jenis_paket 
        ORDER BY nama_paket ASC
      `)
      
      console.log('Successfully fetched jenis paket:', result.rows.length, 'items')
      return NextResponse.json(result.rows)
    } finally {
      client.release()
    }
  } catch (error: any) {
    console.error('Database error in jenis-paket:', {
      message: error.message,
      name: error.name,
      code: error.code,
      detail: error.detail
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch jenis paket', 
        details: error instanceof Error ? error.message : 'Unknown error',
        type: error.name || 'Unknown'
      },
      { status: 500 }
    )
  }
}
