import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Skip middleware for API routes to avoid recursion
    if (pathname.startsWith('/api/')) {
        return NextResponse.next();
    }
    
    // Protect admin routes - check for session cookie
    if (pathname.startsWith("/admin")) {
        const sessionCookie = request.cookies.get('session_token');
        
        if (!sessionCookie) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
        
        // Note: Role validation will be done on the admin page itself
        // to avoid recursion issues with API calls in middleware
    }
    
    return NextResponse.next();
}

export const config = { 
    matcher: ["/admin/:path*", "/api/admin/:path*"]
};