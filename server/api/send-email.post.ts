// server/api/send-email.post.ts
import nodemailer from 'nodemailer'
import type { Mail } from 'nodemailer/lib/mailer'

interface EmailRequest {
  from: string
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
}

interface EmailResponse {
  success: boolean
  error?: string
  messageId?: string
}

export default defineEventHandler(async (event): Promise<EmailResponse> => {
  try {
    // Only allow POST requests
    if (getMethod(event) !== 'POST') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }

    // Parse request body
    const body = await readBody<EmailRequest>(event)
    
    // Validate required fields
    if (!body.from || !body.to || !body.subject || !body.html) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }

    // Get environment variables
    const config = useRuntimeConfig()
    
    const {
      zohoSmtpHost = 'smtp.zoho.com',
      zohoSmtpPort = 587,
      zohoEmail,
      zohoPassword,
      contactEmail
    } = config

    // Validate environment variables
    if (!zohoEmail || !zohoPassword) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Email configuration missing'
      })
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: zohoSmtpHost,
      port: parseInt(zohoSmtpPort as string),
      secure: false, // true for 465, false for other ports
      auth: {
        user: zohoEmail,
        pass: zohoPassword,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    })

    // Verify transporter configuration
    await transporter.verify()

    // Prepare email options
    const mailOptions: Mail.Options = {
      from: `"Portfolio Contact" <${zohoEmail}>`,
      to: contactEmail || body.to,
      subject: body.subject,
      html: body.html,
      text: body.text,
      replyTo: body.replyTo,
      // Add headers for better deliverability
      headers: {
        'X-Mailer': 'Portfolio Contact Form',
        'X-Priority': '3',
      },
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    // Log success (remove in production)
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    })

    return {
      success: true,
      messageId: info.messageId,
    }

  } catch (error) {
    // Log error for debugging (remove sensitive info in production)
    console.error('Email sending failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })

    // Return appropriate error response
    if (error instanceof Error) {
      // Handle specific nodemailer errors
      if (error.message.includes('Authentication failed')) {
        return {
          success: false,
          error: 'Email authentication failed. Please check credentials.',
        }
      }
      
      if (error.message.includes('Invalid login')) {
        return {
          success: false,
          error: 'Invalid email credentials.',
        }
      }
      
      if (error.message.includes('Connection timeout')) {
        return {
          success: false,
          error: 'Email server connection timeout. Please try again.',
        }
      }

      return {
        success: false,
        error: 'Failed to send email. Please try again later.',
      }
    }

    return {
      success: false,
      error: 'An unexpected error occurred.',
    }
  }
})
