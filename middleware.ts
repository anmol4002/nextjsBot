// import { NextResponse } from 'next/server'
// import { NextRequest } from 'next/server'

// const allowedDomains = [
//   'localhost:3000',
//   '127.0.0.1:5500',
//   'connect.punjab.gov.in',
//   'nextjs-bot-ten.vercel.app',
//   'github.com',
//   'github.io',  
//   'anmolbenipal.github.io'  
// ]

// export function middleware(request: NextRequest) {
//   const referer = request.headers.get('referer') || ''
//   const origin = request.headers.get('origin') || ''
  
//   let domain = '';
//   try {
//     if (referer) {
//       domain = new URL(referer).hostname
//     } else if (origin) {
//       domain = new URL(origin).hostname
//     }
//   } catch (e) {
//     console.error('Error parsing referer/origin:', e)
//   }
 
//   const isAllowed = allowedDomains.some(allowed => 
//     domain === allowed || 
//     domain.endsWith(`.${allowed}`) ||
//   domain.endsWith(`${allowed}`)
//   )
  
//   if (request.nextUrl.pathname.startsWith('/widget') && !isAllowed) {
//     return NextResponse.redirect(new URL('/unauthorized', request.url))
//   }
  
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/widget/:path*', '/embed.js']
// }





import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const allowedDomains = [
  'connect.punjab.gov.in',
  'nextjs-bot-ten.vercel.app',
  'github.com',
  'github.io',  
  'anmolbenipal.github.io',
  'vercel.com'
]

// Local hosts are handled separately
const localHosts = [
  'localhost:3000',
  '127.0.0.1:5500'
]

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const referer = request.headers.get('referer') || ''
  const origin = request.headers.get('origin') || ''
  
  // Check if it's a local environment first
  const isLocalAllowed = localHosts.includes(host)
  
  // If not local, check remote domains
  let domain = '';
  try {
    if (referer) {
      const url = new URL(referer)
      domain = url.hostname || url.host
    } else if (origin) {
      const url = new URL(origin)
      domain = url.hostname || url.host
    }
  } catch (e) {
    console.error('Error parsing referer/origin:', e)
  }
 
  const isAllowedRemoteDomain = allowedDomains.some(allowed => 
    domain === allowed || 
    domain.endsWith(`.${allowed}`) ||
    domain.includes(allowed)
  )
  
  const isAllowed = isLocalAllowed || isAllowedRemoteDomain

  // If trying to access /widget but not allowed, redirect to /unauthorized
  if (request.nextUrl.pathname.startsWith('/widget') && !isAllowed) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }
  
  // If on root path and allowed, redirect to /widget
  if (request.nextUrl.pathname === '/' && isAllowed) {
    return NextResponse.redirect(new URL('/widget', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/widget/:path*', '/embed.js', '/']
}







