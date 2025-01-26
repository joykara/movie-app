import { NextRequest, NextResponse } from 'next/server';
import { supabase } from './lib/supabaseClient';

export function middleware(request: NextRequest) {
    const protectedRoutes = ['/favourite-list'];

    if (protectedRoutes.includes(request.nextUrl.pathname)) {
        const token = request.cookies.get('sb-access-token')?.value;

        if (!token) {
            // Redirect to login page if not authenticated
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    const url = request.nextUrl;

    // Remove access_token if present
    if (url.hash && url.hash.includes('access_token')) {
        url.hash = '';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
