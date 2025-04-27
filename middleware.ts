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

















// worked well

// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';

// // Allowed domains that can embed the chatbot
// const allowedDomains = [
//     'localhost:3000',
//   '127.0.0.1:5500',
//   'connect.punjab.gov.in',
//   'github.com',
//   'github.io',
//   'anmolbenipal.github.io',
// ];

// // Local development hosts
// const devHosts = [
//   'localhost:3000',
// ];

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();
  
//   // Get current host from request
//   const currentHost = request.headers.get('host') || '';
  
//   // Check if we're in development environment
//   const isDev = devHosts.some(host => currentHost.includes(host));
  
//   if (isDev) {
   
//     return NextResponse.next();
//   }
  
  
//   if (url.pathname.startsWith('/images/') || 
//       url.pathname.startsWith('/_next/') ||
//       url.pathname.startsWith('/favicon.ico')) {
//     return NextResponse.next();
//   }
  
  
//   if (url.pathname !== '/unauthorized') {
//     const referer = request.headers.get('referer');
//     const origin = request.headers.get('origin');
    
    
//     if (!referer && !origin) {
//       return NextResponse.rewrite(new URL('/unauthorized', request.url));
//     }
    
//     // Process referer or origin to check domain
//     let sourceHost = '';
//     try {
//       if (referer) {
//         sourceHost = new URL(referer).hostname;
//       } else if (origin) {
//         sourceHost = new URL(origin).hostname;
//       }
//     } catch (error) {

//       console.error('Error parsing referer/origin:', error);
//       return NextResponse.rewrite(new URL('/unauthorized', request.url));
//     }
    
   
//     const isAllowed = allowedDomains.some(domain => 
//       sourceHost === domain || sourceHost.endsWith(`.${domain}`)
//     );
    
//     if (!isAllowed) {
    
//       return NextResponse.rewrite(new URL('/unauthorized', request.url));
//     }
//   }
  
  
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
 
//     '/((?!api|favicon.ico).*)'
//   ]
// };






    











import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';


const allowedDomains = [
    'localhost:3000',
 '127.0.0.1:5500',
  'connect.punjab.gov.in',
  'github.com',
  'github.io',
  'anmolbenipal.github.io',
];


const devHosts = [
 'localhost:3000',
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const currentHost = request.headers.get('host') || '';
  
  // Check if we're in development environment
  const isDev = devHosts.some(host => currentHost.includes(host));
  
  if (isDev) {
    // Allow all requests in development mode
    return NextResponse.next();
  }
  
  // Skip checks for static assets and images
  if (url.pathname.startsWith('/images/') || 
      url.pathname.startsWith('/_next/') ||
      url.pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }
  
  // For all paths except /unauthorized
  if (url.pathname !== '/unauthorized') {
    const referer = request.headers.get('referer');
    const origin = request.headers.get('origin');
    
    // Direct access without referer/origin is blocked
    if (!referer && !origin) {
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
    
    // Process referer or origin to check domain
    let sourceHost = '';
    try {
      if (referer) {
        sourceHost = new URL(referer).hostname;
      } else if (origin) {
        sourceHost = new URL(origin).hostname;
      }
    } catch (error) {
      // Invalid URL format in referer/origin
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
    
    // Check if the source domain is allowed
    const isAllowed = allowedDomains.some(domain => 
      sourceHost === domain || sourceHost.endsWith(`.${domain}`)
    );
    
    if (!isAllowed) {
      // For all unauthorized requests (including embed.js), redirect to unauthorized page
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
  }
  
  // Proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply to all routes except specific system paths
    '/((?!api|favicon.ico).*)'
  ]
};
