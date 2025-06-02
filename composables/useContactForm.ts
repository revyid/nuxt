import type { ContactFormData, ApiResponse } from '~/types/contact'

export const useContactForm = () => {
  const isSubmitting = ref(false)
  const showSuccess = ref(false)
  const showError = ref(false)
  const errorMessage = ref('')

  const submitForm = async (formData: ContactFormData): Promise<boolean> => {
    if (!validateForm(formData)) {
      errorMessage.value = 'Please fill in all required fields with valid data.'
      showError.value = true
      return false
    }

    isSubmitting.value = true
    showError.value = false
    showSuccess.value = false

    try {
      const { data } = await $fetch<ApiResponse>('/api/send-email', {
        method: 'POST',
        body: {
          from: `"${formData.name}" <${formData.email}>`,
          to: '', // Will be set by server from env
          subject: `Portfolio Contact: ${formData.subject}`,
          html: generateEmailHTML(formData),
          text: generateEmailText(formData),
          replyTo: formData.email
        }
      })

      if (data?.success) {
        showSuccess.value = true
        // Auto-hide success message
        setTimeout(() => {
          showSuccess.value = false
        }, 5000)
        return true
      } else {
        throw new Error(data?.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      errorMessage.value = error instanceof Error 
        ? error.message 
        : 'Network error. Please check your connection and try again.'
      showError.value = true
      
      // Auto-hide error message
      setTimeout(() => {
        showError.value = false
      }, 5000)
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  const validateForm = (form: ContactFormData): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    return !!(
      form.name?.trim() &&
      form.email?.trim() &&
      emailRegex.test(form.email) &&
      form.subject?.trim() &&
      form.message?.trim() &&
      form.message.length >= 10 // Minimum message length
    )
  }

  const generateEmailHTML = (form: ContactFormData): string => {
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleString('en-US', {
      timeZone: 'Asia/Jakarta',
      dateStyle: 'full',
      timeStyle: 'medium'
    })

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Message</title>
        <style>
          * { box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            line-height: 1.6;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 16px; 
            overflow: hidden; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #42b883 0%, #369870 100%); 
            padding: 40px 30px; 
            text-align: center; 
            position: relative;
            overflow: hidden;
          }
          .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.05) 10px,
              rgba(255,255,255,0.05) 20px
            );
            animation: slide 20s linear infinite;
          }
          @keyframes slide {
            0% { transform: translateX(-50px) translateY(-50px); }
            100% { transform: translateX(50px) translateY(50px); }
          }
          .header h1 { 
            color: white; 
            margin: 0; 
            font-size: 28px; 
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            position: relative;
            z-index: 1;
          }
          .header p {
            color: rgba(255,255,255,0.9);
            font-size: 16px;
            margin: 10px 0 0 0;
            position: relative;
            z-index: 1;
          }
          .content { 
            padding: 40px 30px; 
          }
          .field { 
            margin-bottom: 25px; 
            background: #f8fafb;
            border-radius: 12px;
            padding: 20px;
            border-left: 4px solid #42b883;
            transition: all 0.3s ease;
          }
          .field:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(66, 184, 131, 0.1);
          }
          .field-label { 
            font-weight: 700; 
            color: #2d3748; 
            margin-bottom: 8px; 
            font-size: 14px; 
            text-transform: uppercase; 
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .field-value { 
            color: #4a5568;
            font-size: 16px;
            word-wrap: break-word;
          }
          .message-content { 
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); 
            padding: 25px; 
            border-radius: 12px; 
            border: 2px solid #bae6fd; 
            line-height: 1.8;
            font-size: 16px;
            color: #0c4a6e;
            position: relative;
          }
          .message-content::before {
            content: '"';
            font-size: 60px;
            color: #42b883;
            position: absolute;
            top: -10px;
            left: 10px;
            font-family: Georgia, serif;
            opacity: 0.3;
          }
          .footer { 
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); 
            padding: 30px; 
            text-align: center; 
            border-top: 1px solid #e2e8f0; 
          }
          .footer p { 
            margin: 0; 
            color: #64748b; 
            font-size: 14px; 
          }
          .timestamp { 
            color: #94a3b8; 
            font-size: 13px; 
            margin-top: 20px;
            text-align: center;
            padding: 15px;
            background: rgba(66, 184, 131, 0.05);
            border-radius: 8px;
            border: 1px dashed #42b883;
          }
          .badge {
            display: inline-block;
            background: #42b883;
            color: white;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            margin-left: 8px;
          }
          .contact-info {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .icon {
            width: 20px;
            height: 20px;
            display: inline-block;
          }
          
          @media (max-width: 600px) {
            body { padding: 10px; }
            .content, .header { padding: 20px; }
            .field { padding: 15px; }
            .message-content { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Message</h1>
            <p>Someone reached out through your portfolio</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">
                <span class="icon">👤</span> Sender Information
              </div>
              <div class="field-value contact-info">
                <strong>${escapeHtml(form.name)}</strong>
                <span class="badge">NEW</span>
                <br>
                <a href="mailto:${escapeHtml(form.email)}" style="color: #42b883; text-decoration: none;">
                  ${escapeHtml(form.email)}
                </a>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">
                <span class="icon">📋</span> Subject
              </div>
              <div class="field-value">${escapeHtml(form.subject)}</div>
            </div>
            
            <div class="field">
              <div class="field-label">
                <span class="icon">💬</span> Message
              </div>
              <div class="message-content">
                ${escapeHtml(form.message).replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="timestamp">
              📅 Received: ${formattedDate} (Jakarta Time)
            </div>
          </div>
          <div class="footer">
            <p>
              This message was sent from your portfolio contact form.<br>
              <strong>Reply directly to this email</strong> to respond to ${escapeHtml(form.name)}.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  const generateEmailText = (form: ContactFormData): string => {
    return `
New Contact Form Message
========================

From: ${form.name} <${form.email}>
Subject: ${form.subject}

Message:
${form.message}

---
Received: ${new Date().toLocaleString('en-US', { 
  timeZone: 'Asia/Jakarta',
  dateStyle: 'full',
  timeStyle: 'medium'
})} (Jakarta Time)

This message was sent from your portfolio contact form.
Reply directly to this email to respond to ${form.name}.
    `
  }

  const escapeHtml = (text: string): string => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }
    return text.replace(/[&<>"']/g, (m) => map[m])
  }

  return {
    isSubmitting: readonly(isSubmitting),
    showSuccess: readonly(showSuccess),
    showError: readonly(showError),
    errorMessage: readonly(errorMessage),
    submitForm,
    validateForm
  }
}
