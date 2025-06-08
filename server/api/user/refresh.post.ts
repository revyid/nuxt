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

  // Here you would typically fetch fresh data from the OAuth provider
  // and update the user record. This is a simplified version.
  
  return {
    message: 'Profile refreshed successfully',
    user: {
      email: user.email,
      username: user.username,
      avatar_url: user.avatar_url,
      provider: user.provider
    }
  }
})
