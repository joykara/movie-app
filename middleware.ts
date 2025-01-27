import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const res = NextResponse.next();

    const supabase = createMiddlewareClient({
        req: request,
        res
    }
    );

    try {
        // Check auth state
        const { data: { session }, error } = await supabase.auth.getSession();

        // Protected routes
        // if (request.nextUrl.pathname.startsWith('/favourite-list')) {
        //     if (!session) {
        //         return NextResponse.redirect(new URL('/login', request.url));
        //     }
        // }

        // Redirect to dashboard if already logged in
        if (request.nextUrl.pathname.startsWith('/login') ||
            request.nextUrl.pathname.startsWith('/sign-up')) {
            if (session) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }

        return res;
    } catch (e) {
        console.error('Middleware error:', e);
        return res;
    }
}

export const config = {
    matcher: ['/favourite-list/:path*', '/login', '/sign-up']
};
