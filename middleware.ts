// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';


// const allowedHosts = [
//   'localhost:3000',
//   '127.0.0.1:5500',
//   'connect.punjab.gov.in',
//   'nextjs-bot-ten.vercel.app',
//   'github.com',
//   'github.io',
//   'anmolbenipal.github.io'
// ];

// export function middleware(request: NextRequest) {
  
//   const referer = request.headers.get('referer');
//   const origin = request.headers.get('origin');
  
//   let fullHost = '';
  
//   try {
   
//     if (referer) {
//       fullHost = new URL(referer).host;
//     } else if (origin) {
//       fullHost = new URL(origin).host;
//     }
//   } catch {
//     return NextResponse.redirect(new URL('/unauthorized', request.url));
//   }

//   const isAllowed = allowedHosts.some(allowed => 
//     fullHost === allowed || fullHost.endsWith(`.${allowed}`)
//   );

 
//   if (request.nextUrl.pathname.startsWith('/widget') && !isAllowed) {
//     return NextResponse.redirect(new URL('/unauthorized', request.url));
//   }
 
//   return NextResponse.next();
// }


// export const config = {
//   matcher: ['/widget/:path*', '/embed.js']
// };










// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';

// const allowedHosts = [
//   'localhost:3000',
//   '127.0.0.1:5500',
//   'connect.punjab.gov.in',
//   'nextjs-bot-ten.vercel.app',
//   'github.com',
//   'github.io',
//   'anmolbenipal.github.io',
//   'vercel.com'
// ];

// export function middleware(request: NextRequest) {
 
//   if (request.nextUrl.pathname === '/') {
//     const referer = request.headers.get('referer');
//     const origin = request.headers.get('origin');
    
//     let fullHost = '';
    
//     try {
//       if (referer) {
//         fullHost = new URL(referer).host;
//       } else if (origin) {
//         fullHost = new URL(origin).host;
//       }
//     } catch {
   
//       return NextResponse.rewrite(new URL('/unauthorized', request.url));
//     }

//     const isAllowed = allowedHosts.some(allowed => 
//       fullHost === allowed || fullHost.endsWith(`.${allowed}`)
//     );

//     if (!isAllowed) {
//       return NextResponse.rewrite(new URL('/unauthorized', request.url));
//     }
//   }
  
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/', '/embed.js']
// };

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const allowedDomains = [
  'localhost:3000', 
  'connect.punjab.gov.in', 
  'anmolbenipal.github.io', 
  'nextjs-bot-ten.vercel.app',
];

export function middleware(request: NextRequest) {
 
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname === '/unauthorized'
  ) {
    return NextResponse.next();
  }


  const referer = request.headers.get('referer');
  const origin = request.headers.get('origin');
  const host = request.nextUrl.host;

  let requestDomain = host; 

 
  if (referer || origin) {
    try {
      requestDomain = new URL(referer || origin!).hostname;
    } catch {
     
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
  }

  if (process.env.NODE_ENV === 'development') {
    if (requestDomain !== 'localhost:3000') {
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
    return NextResponse.next();
  }


  const isAllowed = allowedDomains.some(
    (domain) =>
      requestDomain === domain || requestDomain.endsWith(`.${domain}`)
  );

  if (!isAllowed) {
    return NextResponse.rewrite(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/embed.js'], 
};

