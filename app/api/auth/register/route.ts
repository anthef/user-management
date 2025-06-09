import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { hashPassword } from '@/lib/session';

// Ensure this runs on Node.js runtime
export const runtime = 'nodejs';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const pwHash = await hashPassword(password);
        try {
            await sql(`INSERT INTO users (email, password) VALUES ($1,$2)`, [email, pwHash]);
            return NextResponse.json({ message: 'Account created successfully' }, { status: 201 });
        } catch( err: any){
            console.error('Database error in register:', err);
            if(err.code === '23505') {
                return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
            } 
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in register route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}