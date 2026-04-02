import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Only run this check if the user is trying to access the /admin folder
  if (req.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Look for the authorization header
    const basicAuth = req.headers.get('authorization');
    
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // 3. Check against your secure .env variables
      if (user === process.env.ADMIN_USERNAME && pwd === process.env.ADMIN_PASSWORD) {
        return NextResponse.next(); // Access Granted
      }
    }

    // 4. Access Denied - Trigger the browser's native login popup
    return new NextResponse('Authentication Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="StacklabX Secure Nerve Center"',
      },
    });
  }

  // Allow access to all other public pages (Home, Services, Academy)
  return NextResponse.next();
}

// 5. Configure the middleware to only protect specific routes
export const config = {
  matcher: ['/admin/:path*'],
};