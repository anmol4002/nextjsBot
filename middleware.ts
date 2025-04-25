// import { NextResponse } from 'next/server'
// import { NextRequest } from 'next/server'

// const allowedDomains = [
//   'localhost:5000',
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
  'anmolbenipal.github.io'
]

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  
  
  const allowedLocalPorts = [3000, 5500]
  const isLocalAllowed = allowedLocalPorts.some(port => 
    host === `localhost:${port}` || 
    host === `127.0.0.1:${port}`
  )

  const referer = request.headers.get('referer') || ''
  const origin = request.headers.get('origin') || ''
  
  let domain = ''
  try {
    if (referer) {
      const url = new URL(referer)
      domain = url.host
    } else if (origin) {
      const url = new URL(origin)
      domain = url.host
    }
  } catch (e) {
    console.error('Error parsing referer/origin:', e)
  }
 
  const isAllowedReferer = allowedDomains.some(allowed => 
    domain === allowed || 
    domain.endsWith(`.${allowed}`) ||
    domain.includes(allowed)
  )
  


  if (request.nextUrl.pathname.startsWith('/widget') && !isLocalAllowed && !isAllowedReferer) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  if (!request.nextUrl.pathname.startsWith('/widget') && (isLocalAllowed || isAllowedReferer)) {
    return NextResponse.redirect(new URL('/widget', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/widget/:path*', '/embed.js', '/']
}
}
