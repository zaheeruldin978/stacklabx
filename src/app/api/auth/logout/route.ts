import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Explicitly delete the session cookie
    cookieStore.delete('stacklabx_session');

    return NextResponse.json({ success: true, message: 'Session terminated' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to terminate session' }, { status: 500 });
  }
}