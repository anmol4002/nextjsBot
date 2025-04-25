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

// Define allowed hosts including specific local development ports
const allowedHosts = [
  'localhost:3000',      // Local development with Next.js
  '127.0.0.1:5500',      // Live Server in VS Code
  'connect.punjab.gov.in',
  'nextjs-bot-ten.vercel.app',
  'github.com',
  'github.io',
  'anmolbenipal.github.io'
];

// Define hosts that can embed the widget
const allowedEmbedders = [
  'localhost:3000',
  '127.0.0.1:5500',
  'connect.punjab.gov.in',
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
    if (referer) {
      fullHost = new URL(referer).host;
    } else if (origin) {
      fullHost = new URL(origin).host;
    }
  } catch {
    // Silent fail if URL parsing fails
  }
  

  const isWidgetRequest = request.nextUrl.pathname.startsWith('/widget');
  const isEmbedRequest = request.nextUrl.pathname === '/embed.js';
  

  if (isWidgetRequest) {
    const isAllowed = allowedHosts.some(allowed => 
      fullHost === allowed || fullHost.endsWith(`.${allowed}`)
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  if (isEmbedRequest) {
    const isAllowedEmbedder = allowedEmbedders.some(allowed => 
      fullHost === allowed || fullHost.endsWith(`.${allowed}`)
    );

    if (!isAllowedEmbedder) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/widget/:path*', '/embed.js']
};
