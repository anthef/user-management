import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});


pool.on('connect', async (client) => {
    try {
        await client.query('SET search_path TO siuser, public');
        console.log('Search path set to siuser, public');
    } catch (error) {
        console.error('Error setting search path:', error);
    }
});

export async function sql(query: string, params: any[] = []){
    try {
        console.log('Executing query:', query, 'with params:', params);
        const { rows } = await pool.query(query, params);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}