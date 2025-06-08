import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import DiscordProvider from 'next-auth/providers/discord'
import { NuxtAuthHandler } from '#auth'
import { UserService, type OAuthProfile } from '~/server/services/userService'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    GoogleProvider({
      clientId: useRuntimeConfig().googleClientId,
      clientSecret: useRuntimeConfig().googleClientSecret,
    }),
    GitHubProvider({
      clientId: useRuntimeConfig().githubClientId,
      clientSecret: useRuntimeConfig().githubClientSecret,
    }),
    DiscordProvider({
      clientId: useRuntimeConfig().discordClientId,
      clientSecret: useRuntimeConfig().discordClientSecret,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !profile || !user.email) return false

      const provider = account.provider
      const providerId = account.providerAccountId

      // Check email availability
      const emailCheck = await UserService.validateEmailAvailability(user.email, provider)
      
      if (!emailCheck.available) {
        throw new Error(`Email sudah terdaftar dengan provider ${emailCheck.conflictProvider}`)
      }

      // Create OAuth profile
      let username = user.name || user.email.split('@')[0]
      let avatarUrl = user.image || null

      // Provider-specific data extraction
      if (provider === 'discord') {
        username = (profile as any).username || username
        avatarUrl = (profile as any).avatar 
          ? `https://cdn.discordapp.com/avatars/${providerId}/${(profile as any).avatar}.png`
          : avatarUrl
      } else if (provider === 'github') {
        username = (profile as any).login || username
        avatarUrl = (profile as any).avatar_url || avatarUrl
      }

      const oauthProfile: OAuthProfile = {
        email: user.email,
        username,
        avatar_url: avatarUrl,
        provider,
        provider_id: providerId
      }

      // Check if user exists by provider
      const existingUser = await UserService.findUserByProvider(provider, providerId)

      if (existingUser) {
        // Update existing user data
        await UserService.updateUser(user.email, {
          username: oauthProfile.username,
          avatar_url: oauthProfile.avatar_url
        })
      } else {
        // Create new user
        await UserService.createUser(oauthProfile)
      }

      return true
    },
    async session({ session, token }) {
      if (session.user?.email) {
        const user = await UserService.findUserByEmail(session.user.email)
        if (user) {
          session.user.username = user.username
          session.user.image = user.avatar_url
          session.user.provider = user.provider
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  }
})
