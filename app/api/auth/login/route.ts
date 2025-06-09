import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyPassword, createSession } from '@/lib/session';

export const runtime = 'nodejs';

export async function POST(request: Request) {
    const { email, password } = await request.json();
    if(!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    const rows = await sql(`SELECT * FROM users where email = $1`,[email]);
    const user = rows[0];
    if(!user){
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const ok = await verifyPassword(password, user.password);
    if(!ok) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const cookie = await createSession(user.id);
    return NextResponse.json({ message: 'Login successful' }, { status: 200, headers: { 'Set-Cookie': cookie } });
}