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

const allowedOrigins = [
  'connect.punjab.gov.in',
  'nextjs-bot-ten.vercel.app',
  'anmolbenipal.github.io',
  'localhost:3000',
  '127.0.0.1:5500'
]

export function middleware(request: NextRequest) {
  const referer = request.headers.get('referer') || ''
  const origin = request.headers.get('origin') || ''
  
  let hostname = '';
  let port = '';
  let isAllowed = false;
  
  try {
    // Check referer
    if (referer) {
      const url = new URL(referer);
      hostname = url.hostname;
      port = url.port;
      const fullOrigin = port ? `${hostname}:${port}` : hostname;
      
      isAllowed = allowedOrigins.some(allowed => 
        fullOrigin === allowed || 
        hostname === allowed
      );
    }
    

    if (!isAllowed && origin) {
      const url = new URL(origin);
      hostname = url.hostname;
      port = url.port;
      const fullOrigin = port ? `${hostname}:${port}` : hostname;
      
      isAllowed = allowedOrigins.some(allowed => 
        fullOrigin === allowed || 
        hostname === allowed
      );
    }
    

    if (request.nextUrl.pathname.startsWith('/widget') && !isAllowed) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } catch (e) {
    console.error('Error parsing referer/origin:', e);
 
    if (request.nextUrl.pathname.startsWith('/widget')) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/widget/:path*']
}
