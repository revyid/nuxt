export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface EmailConfig {
  host: string
  port: number
  user: string
  pass: string
  to: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  messageId?: string
}

export interface ContactMethod {
  title: string
  value: string
  icon: string
}

