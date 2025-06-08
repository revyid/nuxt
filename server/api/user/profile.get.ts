import { getServerSession } from '#auth'
import { UserService } from '~/server/services/userService'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  
  if (!session?.user?.email) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const user = await UserService.findUserByEmail(session.user.email)
  
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  return {
    email: user.email,
    username: user.username,
    avatar_url: user.avatar_url,
    provider: user.provider,
    created_at: user.created_at,
    updated_at: user.updated_at
  }
})
