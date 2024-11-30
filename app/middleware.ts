// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; // Import getToken from next-auth/jwt

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Session Token:', token);
  // Check if the user is authenticated
  if (!token && req.nextUrl.pathname !== "/api/auth/login") {
    // If not authenticated, redirect to the login page
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  // Allow the request to continue if the user is authenticated or trying to access the login page
//   return NextResponse.next();
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
}

// Specify which routes to protect
export const config = {
  matcher: ['/((?!login|_next|favicon.ico).*)'], // Protect all pages except login, _next, and static files
};
