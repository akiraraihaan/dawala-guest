import { NextRequest, NextResponse } from 'next/server'

const locales = ['id', 'en']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Only redirect if not already at a locale route
  const isLocaleRoute = locales.some(locale => pathname.startsWith(`/${locale}`))
  if (pathname === '/' || pathname === '') {
    request.nextUrl.pathname = '/id'
    return NextResponse.redirect(request.nextUrl)
  }
  // If not a locale route and not an API/static file, redirect to default
  if (!isLocaleRoute && !pathname.startsWith('/api') && !pathname.includes('.')) {
    request.nextUrl.pathname = '/id' + pathname
    return NextResponse.redirect(request.nextUrl)
  }
}

export const config = {
  matcher: ['/', '/((?!_next|favicon.ico|api|static|images|public).*)']
}
