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

// 😭😭😭😭😭😭



import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_EMBED_DOMAINS = [
   'localhost:3000',
  '127.0.0.1:5500',
  'connect.punjab.gov.in',
  'github.com',
  'github.io',
  'anmolbenipal.github.io',
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const referer = request.headers.get('referer');
  const origin = request.headers.get('origin');

  // Allow direct access in development
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // Block direct access to root path in production
  if (url.pathname === '/') {
    // Check if coming from allowed embed domain
    if (referer || origin) {
      try {
        const host = referer ? new URL(referer).host : new URL(origin!).host;
        const isAllowed = ALLOWED_EMBED_DOMAINS.some(domain => 
          host === domain || host.endsWith(`.${domain}`)
        );
        if (isAllowed) return NextResponse.next();
      } catch {}
    }
    
    // Redirect to unauthorized for direct access
    return NextResponse.redirect(new URL('/unauthorized', url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/']
};
