import { Pool } from 'pg'

// Create pool instance without immediate configuration
let pool: Pool | null = null

// Initialize pool with runtime config
export function createPool(databaseUrl: string) {
  if (!pool) {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false
      }
    })
  }
  return pool
}

// Get existing pool (must be initialized first)
export function getPool() {
  if (!pool) {
    throw new Error('Database pool not initialized. Call createPool() first.')
  }
  return pool
}

// Database initialization
export async function initDatabase(databaseUrl: string) {
  const dbPool = createPool(databaseUrl)
  const client = await dbPool.connect()
  
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
    throw error
  } finally {
    client.release()
  }
}

// Export pool for backward compatibility (will be null initially)
export { pool }
