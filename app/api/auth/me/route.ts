import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/session';

// Ensure this runs on Node.js runtime
export const runtime = 'nodejs';

export async function GET(request: Request) {
    try {
        const session = await getSession(request);
        
        if (!session) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const rows = await sql(`SELECT id, email, created_at FROM users WHERE id = $1`, [session.user_id]);
        const user = rows[0];
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: user.id,
            email: user.email,
            created_at: user.created_at
        });
    } catch (error) {
        console.error('Error in /api/auth/me:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
