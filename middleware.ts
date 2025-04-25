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





import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_LOCAL_HOSTS = ["localhost:3000"];
const PRODUCTION_DOMAINS = [
  '127.0.0.1:3000',
  'localhost:3000',
  'connect.punjab.gov.in',
  'github.com',
  'github.io',
  'anmolbenipal.github.io',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  if (pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  if (process.env.NODE_ENV === "development") {
    if (!ALLOWED_LOCAL_HOSTS.includes(host)) {
      const unauthorizedUrl = request.nextUrl.clone();
      unauthorizedUrl.pathname = "/unauthorized";
      return NextResponse.rewrite(unauthorizedUrl);
    }
    return NextResponse.next();
  }

  if (pathname === "/embed.js") {
    const referer = request.headers.get("referer");
    if (!referer) return blockRequest(request);

    try {
      const refererHost = new URL(referer).host;
      const isAllowed = PRODUCTION_DOMAINS.some(
        (domain) => refererHost === domain || refererHost.endsWith(`.${domain}`)
      );
      if (!isAllowed) return blockRequest(request);
    } catch {
      return blockRequest(request);
    }
  }

  return NextResponse.next();
}

function blockRequest(request: NextRequest) {
  if (request.nextUrl.pathname === "/embed.js") {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const unauthorizedUrl = request.nextUrl.clone();
  unauthorizedUrl.pathname = "/unauthorized";
  return NextResponse.rewrite(unauthorizedUrl);
}

export const config = {
  matcher: ["/", "/embed.js"],
};

