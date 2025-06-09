import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
}

// Create pool with minimal configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on('connect', async (client) => {
    try {
        await client.query('SET search_path TO siuser, public');
        console.log('Search path set to siuser, public');
    } catch (error) {
        console.error('Error setting search path:', error);
    }
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

export async function sql(query: string, params: any[] = []){
    const client = await pool.connect();
    try {
        console.log('Executing query:', query, 'with params:', params);
        const { rows } = await client.query(query, params);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    } finally {
        client.release();
    }
}

export { pool };