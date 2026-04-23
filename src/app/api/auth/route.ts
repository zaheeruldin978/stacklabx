import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Verify BOTH against the environment variables
    if (
      username === process.env.ADMIN_USERNAME && 
      password === process.env.ADMIN_PASSWORD
    ) {
      // Set a secure, HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set('stacklabx_session', process.env.ADMIN_SESSION_SECRET || 'fallback_secret_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        // FIX: 'maxAge' is intentionally removed here. 
        // This forces the browser to treat it as a temporary Session Cookie.
        // It will automatically self-destruct when the browser is closed.
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}