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

const allowedHosts = [
  'localhost:5000',    // Only this exact host:port
  '127.0.0.1:5500',    // Only this exact host:port
  'connect.punjab.gov.in',
  'nextjs-bot-ten.vercel.app',
  'github.com',
  'github.io',  
  'anmolbenipal.github.io'  
]

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') || request.headers.get('referer') || '';
  
  let requestHost = '';
  try {
    if (origin) {
      const url = new URL(origin);
      requestHost = url.host; // Gets "domain:port"
    }
  } catch (e) {
    console.error('Error parsing origin:', e);
  }

  // Check if the request host is allowed
  const isAllowed = allowedHosts.some(allowed => 
    requestHost === allowed || 
    requestHost.endsWith(`.${allowed}`)
  );

  // Block ALL requests from unauthorized hosts
  if (!isAllowed) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Applies to ALL routes except:
  // - Next.js internal routes (_next, _vercel)
  // - The unauthorized page itself
  matcher: ['/((?!_next|_vercel|unauthorized).*)']
}







