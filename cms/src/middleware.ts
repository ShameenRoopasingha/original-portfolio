import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');
    const isLoginPage = request.nextUrl.pathname === '/login';
    const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
    const isRoot = request.nextUrl.pathname === '/';

    if (isRoot) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If trying to access dashboard without token, redirect to login
    if (isDashboard && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If already logged in and trying to access login, redirect to dashboard
    if (isLoginPage && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/dashboard/:path*'],
};
