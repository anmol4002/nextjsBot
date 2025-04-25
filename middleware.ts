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














import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Define allowed hosts
const allowedHosts = [
  'localhost:3000',
  '127.0.0.1:5500',
  'connect.punjab.gov.in',
  'nextjs-bot-ten.vercel.app',
  'github.com',
  'github.io',
  'anmolbenipal.github.io'
];

export function middleware(request: NextRequest) {
  // Get referer and origin headers
  const referer = request.headers.get('referer');
  const origin = request.headers.get('origin');
  
  let fullHost = '';
  
  try {
    // Try to extract host from referer or origin
    if (referer) {
      fullHost = new URL(referer).host;
    } else if (origin) {
      fullHost = new URL(origin).host;
    }
  } catch {
    // If URL parsing fails, treat as unauthorized
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  
  // Check if the host is in the allowed list
  const isAllowed = allowedHosts.some(allowed => 
    fullHost === allowed || fullHost.endsWith(`.${allowed}`)
  );

  // If requesting widget path and not allowed, redirect to unauthorized
  if (request.nextUrl.pathname.startsWith('/widget') && !isAllowed) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  
  // Otherwise proceed with the request
  return NextResponse.next();
}

// Apply middleware only to widget paths and embed.js
export const config = {
  matcher: ['/widget/:path*', '/embed.js']
};
