import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    // Remove access_token if present
    if (url.hash && url.hash.includes('access_token')) {
        url.hash = '';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
