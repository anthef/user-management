import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { hashPassword, getSession } from '@/lib/session';

export const runtime = 'nodejs';

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

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const validation = await validateAdminRole(request);
        if (validation.error) return validation.error;
        
        const { email, password, role } = await request.json();
        const userId = params.id;

        if (!email || !role) {
            return NextResponse.json({ 
                success: false, 
                error: 'Email and role are required' 
            }, { status: 400 });
        }

        if (!['user', 'admin'].includes(role)) {
            return NextResponse.json({ 
                success: false, 
                error: 'Invalid role. Must be user or admin' 
            }, { status: 400 });
        }

        const existingUser = await sql(
            `SELECT id FROM siuser.users WHERE id = $1`, 
            [userId]
        );

        if (existingUser.length === 0) {
            return NextResponse.json({ 
                success: false, 
                error: 'User not found' 
            }, { status: 404 });
        }

        if (password) {
            const hashedPassword = await hashPassword(password);
            await sql(
                `UPDATE siuser.users SET email = $1, role = $2, password = $3 WHERE id = $4`,
                [email, role, hashedPassword, userId]
            );
        } else {
            await sql(
                `UPDATE siuser.users SET email = $1, role = $2 WHERE id = $3`,
                [email, role, userId]
            );
        }

        return NextResponse.json({ 
            success: true, 
            message: 'User updated successfully' 
        });

    } catch (error: any) {
        console.error('Error updating user:', error);
        
        if (error.code === '23505') {
            return NextResponse.json({ 
                success: false, 
                error: 'Email already exists' 
            }, { status: 409 });
        }
        
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to update user' 
        }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const validation = await validateAdminRole(request);
        if (validation.error) return validation.error;
        
        const userId = params.id;

        const existingUser = await sql(
            `SELECT id FROM siuser.users WHERE id = $1`, 
            [userId]
        );

        if (existingUser.length === 0) {
            return NextResponse.json({ 
                success: false, 
                error: 'User not found' 
            }, { status: 404 });
        }

        await sql(
            `DELETE FROM siuser.users WHERE id = $1`,
            [userId]
        );

        return NextResponse.json({ 
            success: true, 
            message: 'User deleted successfully' 
        });

    } catch (error: any) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to delete user' 
        }, { status: 500 });
    }
}
