import { NextResponse } from 'next/server';
import { destroySession,getSession } from '@/lib/session';
import { sql } from '@/lib/db';

// Ensure this runs on Node.js runtime
export const runtime = 'nodejs';

export async function POST(request: Request) {
    const session = await getSession(request);
    if(session){
        await sql(`DELETE from sessions where token = $1`, [session.token]);
    }
    return NextResponse.json({ success: true }, {
    status: 200,
    headers: { "Set-Cookie": destroySession() },
  });
}