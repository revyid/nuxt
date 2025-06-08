import { pool } from '~/server/utils/db'

export interface User {
  email: string
  username: string
  avatar_url: string | null
  provider: string
  provider_id: string
  created_at: Date
  updated_at: Date
}

export interface OAuthProfile {
  email: string
  username: string
  avatar_url: string | null
  provider: string
  provider_id: string
}

export class UserService {
  static async findUserByEmail(email: string): Promise<User | null> {
    const client = await pool.connect()
    
    try {
      const result = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      )
      
      return result.rows[0] || null
    } finally {
      client.release()
    }
  }

  static async findUserByProvider(provider: string, providerId: string): Promise<User | null> {
    const client = await pool.connect()
    
    try {
      const result = await client.query(
        'SELECT * FROM users WHERE provider = $1 AND provider_id = $2',
        [provider, providerId]
      )
      
      return result.rows[0] || null
    } finally {
      client.release()
    }
  }

  static async createUser(profile: OAuthProfile): Promise<User> {
    const client = await pool.connect()
    
    try {
      const result = await client.query(`
        INSERT INTO users (email, username, avatar_url, provider, provider_id, updated_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
        RETURNING *
      `, [
        profile.email,
        profile.username,
        profile.avatar_url,
        profile.provider,
        profile.provider_id
      ])
      
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  static async updateUser(email: string, updates: Partial<OAuthProfile>): Promise<User> {
    const client = await pool.connect()
    
    try {
      const setClause = []
      const values = []
      let paramIndex = 1

      if (updates.username) {
        setClause.push(`username = $${paramIndex++}`)
        values.push(updates.username)
      }

      if (updates.avatar_url !== undefined) {
        setClause.push(`avatar_url = $${paramIndex++}`)
        values.push(updates.avatar_url)
      }

      if (setClause.length === 0) {
        throw new Error('No updates provided')
      }

      setClause.push(`updated_at = CURRENT_TIMESTAMP`)
      values.push(email)

      const result = await client.query(`
        UPDATE users 
        SET ${setClause.join(', ')}
        WHERE email = $${paramIndex}
        RETURNING *
      `, values)

      return result.rows[0]
    } finally {
      client.release()
    }
  }

  static async validateEmailAvailability(email: string, provider: string): Promise<{
    available: boolean
    conflictProvider?: string
  }> {
    const existingUser = await this.findUserByEmail(email)
    
    if (!existingUser) {
      return { available: true }
    }

    if (existingUser.provider === provider) {
      return { available: true }
    }

    return { 
      available: false, 
      conflictProvider: existingUser.provider 
    }
  }
}
