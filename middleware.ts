import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const allowedDomains = [
  'localhost',
  'connect.punjab.gov.in',
  'nextjs-bot-ten.vercel.app',
  'github.com',
  'github.io',  
  'anmolbenipal.github.io'  
]

export function middleware(request: NextRequest) {
  const referer = request.headers.get('referer') || ''
  const origin = request.headers.get('origin') || ''
  
  let domain = '';
  try {
    if (referer) {
      domain = new URL(referer).hostname
    } else if (origin) {
      domain = new URL(origin).hostname
    }
  } catch (e) {
    console.error('Error parsing referer/origin:', e)
  }
 
  const isAllowed = allowedDomains.some(allowed => 
    domain === allowed || 
    domain.endsWith(`.${allowed}`) ||
  domain.endsWith(`${allowed}`)
  )
  
  if (request.nextUrl.pathname.startsWith('/widget') && !isAllowed) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/widget/:path*', '/embed.js']
}
