import { Pool } from 'pg'

const pool = new Pool({
  connectionString: useRuntimeConfig().databaseUrl,
  ssl: {
    rejectUnauthorized: false
  }
})

export { pool }

// Database initialization
export async function initDatabase() {
  const client = await pool.connect()
  
  try {
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        email VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        avatar_url TEXT,
        provider VARCHAR(50) NOT NULL,
        provider_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(provider, provider_id)
      )
    `)

    // Create index for faster queries
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id)
    `)

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Database initialization error:', error)
  } finally {
    client.release()
  }
}
