import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/session';

// Ensure this runs on Node.js runtime
export const runtime = 'nodejs';

// Helper function to check admin role
async function validateAdminRole(request: Request) {
    const session = await getSession(request);
    
    if (!session) {
        return { error: NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 }) };
    }
    
    const userRows = await sql(`SELECT role FROM siuser.users WHERE id = $1`, [session.user_id]);
    const user = userRows[0];
    
    if (!user || user.role !== 'admin') {
        return { error: NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 }) };
    }
    
    return { session, user };
}

// Get all users
export async function GET(request: Request) {
    try {
        const validation = await validateAdminRole(request);
        if (validation.error) return validation.error;
        
        const users = await sql(`
            SELECT 
                id, 
                email, 
                role,
                created_at,
                (SELECT COUNT(*) FROM siuser.sessions WHERE user_id = users.id) as active_sessions
            FROM siuser.users 
            ORDER BY created_at DESC
        `);
        
        return NextResponse.json({ 
            success: true, 
            users: users 
        });
    } catch (error: any) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to fetch users' 
        }, { status: 500 });
    }
}
