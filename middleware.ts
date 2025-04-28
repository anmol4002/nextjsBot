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
  
 
  const isDev = devHosts.some(host => currentHost.includes(host));
  
  if (url.pathname.startsWith('/images/') || 
      url.pathname.startsWith('/_next/') ||
      url.pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }
  
  
  if (url.pathname === '/embed.js') {
    return NextResponse.next();
  }
  

  if (url.pathname !== '/unauthorized') {
    const referer = request.headers.get('referer');
    const origin = request.headers.get('origin');
    
 
    if (isDev && (!referer && !origin)) {
      return NextResponse.next();
    }
    
    
    if (!isDev && (!referer && !origin)) {
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
    
   
    if (isDev) {
      return NextResponse.next();
    }
    
  
    let sourceHost = '';
    let fullSourceHost = ''; 
    
    try {
      if (referer) {
        const refererURL = new URL(referer);
        sourceHost = refererURL.hostname;
        fullSourceHost = refererURL.host; 
      } else if (origin) {
        const originURL = new URL(origin);
        sourceHost = originURL.hostname;
        fullSourceHost = originURL.host; 
      }
    } catch (error) {
   
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
 
    const isAllowed = allowedDomains.some(domain => 
      sourceHost === domain || 
      fullSourceHost === domain || 
      sourceHost.endsWith(`.${domain}`) || 
      fullSourceHost.endsWith(`.${domain}`)
    );
  
    const isLocalFile = sourceHost === '' || referer?.startsWith('file://');
    
    if (!isAllowed && !isLocalFile) {
      console.log(`Unauthorized access from: ${fullSourceHost} (or ${sourceHost})`);
    
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
  }
  
 
  return NextResponse.next();
}

export const config = {
  matcher: [
   
    '/((?!api|favicon.ico).*)'
  ]
};
