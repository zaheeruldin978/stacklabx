import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. CHANGED: Function is now named 'proxy' for Next.js 16+ compatibility
export function proxy(request: NextRequest) {
  // Get the path the user is trying to access
  const path = request.nextUrl.pathname;

  // IS THIS AN ADMIN ROUTE? Check if path starts with /admin
  const isAdminRoute = path.startsWith('/admin');

  if (isAdminRoute) {
    // CHECK FOR THE SECURITY KEY (COOKIE)
    const sessionCookie = request.cookies.get('stacklabx_session');

    // VALIDATION
    // If no cookie, OR the cookie value doesn't exactly match our .env secret
    if (!sessionCookie || sessionCookie.value !== process.env.ADMIN_SESSION_SECRET) {
      
      // CREATE REDIRECT URL TO LOGIN
      const loginUrl = new URL('/login', request.url);
      
      // Save where they were trying to go so we can bounce them back later
      loginUrl.searchParams.set('from', path);
      
      // FIRE REDIRECT (This bounces them instantly to /login)
      return NextResponse.redirect(loginUrl);
    }
  }

  // ALLOW PASS-THROUGH
  // If it's not an admin route, or if they passed the validation, let them in.
  return NextResponse.next();
}

// CONFIGURATION
// This ensures Next.js runs this script for every request so the logic above works flawlessly.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};