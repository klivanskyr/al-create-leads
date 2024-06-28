import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest): Promise<NextResponse> {

  const sessionid = req.cookies.getAll();
  console.log('path: ', req.nextUrl.pathname, 'sessionid: ', sessionid);

  if (!sessionid && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.nextUrl), { status: 302, statusText: 'Not Authenticated, Redirecting to /login' });
  } else {
    return NextResponse.next();
  }
}

export const config = {
    matcher: ['/', '/login']
}