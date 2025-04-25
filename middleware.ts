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

const allowedLocalHosts = [
  'localhost:3000',
  '127.0.0.1:5500'
]

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const referer = request.headers.get('referer') || ''
  const origin = request.headers.get('origin') || ''
  
  // Check if it's an allowed local host
  const isLocalAllowed = allowedLocalHosts.includes(host)
  
  // For non-local requests, check referer/origin against allowed domains
  let isAllowedRemote = false
  
  if (!isLocalAllowed) {
    let domain = ''
    
    try {
      if (referer) {
        const url = new URL(referer)
        domain = url.hostname
      } else if (origin) {
        const url = new URL(origin)
        domain = url.hostname
      }
    } catch (e) {
      console.error('Error parsing referer/origin:', e)
    }
    
    // More precise domain matching
    isAllowedRemote = allowedDomains.some(allowed => 
      domain === allowed || 
      domain.endsWith(`.${allowed}`) ||
      (domain === `www.${allowed}`)
    )
  }
  
  const isAllowed = isLocalAllowed || isAllowedRemote
  
  // If trying to access /widget but not allowed, redirect to /unauthorized
  if (request.nextUrl.pathname.startsWith('/widget') && !isAllowed) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }
  
  // If on root path and allowed, redirect to /widget
  if (request.nextUrl.pathname === '/' && isAllowed) {
    return NextResponse.redirect(new URL('/widget', request.url))
  }
  
  // Add security headers to all responses
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return response
}

export const config = {
  matcher: ['/widget/:path*', '/embed.js', '/']
}



