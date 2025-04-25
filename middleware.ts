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
  'connect.punjab.gov.in',
  'nextjs-bot-ten.vercel.app',
  'anmolbenipal.github.io'
]

export function middleware(request: NextRequest) {
  const referer = request.headers.get('referer');
  
  if (!referer) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  try {
    const refererUrl = new URL(referer);
    const refererHost = refererUrl.host;
    const refererPort = refererUrl.port || (refererUrl.protocol === 'https:' ? '443' : '80');

   
    const isLocalAllowed = 
      (refererHost === 'localhost' && refererPort === '3000') ||
      (refererHost === '127.0.0.1' && refererPort === '5500');

   
    const isDomainAllowed = allowedHosts.some(host => 
      refererHost === host || refererHost.endsWith(`.${host}`)
    );

    const isAllowed = isLocalAllowed || isDomainAllowed;

    if ((request.nextUrl.pathname.startsWith('/widget') || 
         request.nextUrl.pathname === '/embed.js') && 
        !isAllowed) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } catch (e) {
    console.error('Error parsing referer:', e);
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/widget/:path*', '/embed.js'] 
};
