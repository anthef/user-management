import bcrypt from 'bcrypt';
import { randomBytes } from "crypto";
import { sql } from './db';
import { serialize, parse } from 'cookie';


const COOKIE_NAME = "session_token";
const COOKIE_OPTS = {
    httpOnly: true,
    path : '/',
    sameSite: "lax" as const,
    secure : process.env.NODE_ENV === 'production',
};

export async function hashPassword(pw: string){
    return await bcrypt.hash(pw, 10);
}

export async function verifyPassword(pw: string, hash:string){
    return await bcrypt.compare(pw, hash);
}

export async function createSession(userId: string){
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    await sql(`INSERT INTO sessions (token,user_id,expires_at) VALUES ($1,$2,$3)`,[token, userId, expiresAt]);
    return serialize(COOKIE_NAME, token, {
        ...COOKIE_OPTS,
        expires:expiresAt
    })
}

export async function getSession(request: Request){
    const cookie = request.headers.get("cookie") || '';
    const { session_token } = parse(cookie);
    if(!session_token){
        return null;
    } 
    const rows = await sql(
        `SELECT s.token, s.expires_at, s.user_id, u.id, u.email
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token = $1 AND s.expires_at > NOW()`
        , 
        [session_token]);
    
        const session = rows[0];
        if(!session || new Date(session.expires_at) < new Date()){
            return null;
        }
        return {
            token: session.token,
            user_id: session.user_id,
            user: {
                id: session.id,
                email: session.email
            }
        };
}

export function destroySession(){
    return serialize(COOKIE_NAME, '', {
        ...COOKIE_OPTS,
        expires: new Date(0),
        maxAge: 0
    });
}