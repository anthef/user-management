import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/session';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Protect admin routes - simple authentication check
    if (pathname.startsWith("/admin")) {
        const session = await getSession(request);
        if (!session) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }
    
    return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };