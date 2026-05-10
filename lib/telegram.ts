// Telegram notification service
// Sends formatted messages to Telegram group after successful database save

interface TelegramConfig {
  botToken: string;
  chatId: string;
}

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source: string;
}

interface ChatbotConversation {
  name: string;
  email: string;
  phone?: string;
  courseInterest?: string;
  studentType?: string;
  message?: string;
}

// Get Telegram config from environment variables
function getTelegramConfig(): TelegramConfig {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || '';
  const chatId = process.env.TELEGRAM_CHAT_ID || '';

  if (!botToken || !chatId) {
    throw new Error('Telegram configuration missing. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in environment variables.');
  }

  return { botToken, chatId };
}

// Format contact form submission for Telegram
function formatContactMessage(data: ContactSubmission): string {
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `
🔔 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${escapeHtml(data.name)}
📧 <b>Email:</b> ${escapeHtml(data.email)}
${data.phone ? `📱 <b>Phone:</b> ${escapeHtml(data.phone)}\n` : ''}${data.subject ? `📋 <b>Subject:</b> ${escapeHtml(data.subject)}\n` : ''}
💬 <b>Message:</b>
${escapeHtml(data.message)}

📍 <b>Source:</b> ${data.source === 'contact-form' ? 'Contact Form' : 'Other'}
⏰ <b>Time:</b> ${timestamp}

━━━━━━━━━━━━━━━━━
`.trim();
}

// Format chatbot conversation for Telegram
function formatChatbotMessage(data: ChatbotConversation): string {
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `
🤖 <b>New Chatbot Conversation</b>

👤 <b>Name:</b> ${escapeHtml(data.name)}
📧 <b>Email:</b> ${escapeHtml(data.email)}
${data.phone ? `📱 <b>Phone:</b> ${escapeHtml(data.phone)}\n` : ''}
🎓 <b>Course Interest:</b> ${data.courseInterest ? escapeHtml(data.courseInterest) : 'Not specified'}
👔 <b>Student Type:</b> ${data.studentType ? escapeHtml(data.studentType) : 'Not specified'}

💬 <b>Additional Message:</b>
${data.message ? escapeHtml(data.message) : 'No additional message'}

📍 <b>Source:</b> Chatbot
⏰ <b>Time:</b> ${timestamp}

━━━━━━━━━━━━━━━━━
`.trim();
}

// Escape HTML special characters for Telegram
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Send message to Telegram
async function sendTelegramMessage(text: string): Promise<boolean> {
  try {
    const config = getTelegramConfig();
    const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Telegram API error:', error);
      return false;
    }

    console.log('✅ Telegram notification sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send Telegram notification:', error);
    return false;
  }
}

// Public API: Send contact form notification
export async function notifyContactSubmission(data: ContactSubmission): Promise<boolean> {
  try {
    const message = formatContactMessage(data);
    return await sendTelegramMessage(message);
  } catch (error) {
    console.error('❌ Error notifying contact submission:', error);
    return false;
  }
}

// Public API: Send chatbot conversation notification
export async function notifyChatbotConversation(data: ChatbotConversation): Promise<boolean> {
  try {
    const message = formatChatbotMessage(data);
    return await sendTelegramMessage(message);
  } catch (error) {
    console.error('❌ Error notifying chatbot conversation:', error);
    return false;
  }
}

// Test function to verify Telegram configuration
export async function testTelegramConnection(): Promise<boolean> {
  try {
    const testMessage = `
🧪 <b>Telegram Test Message</b>

✅ Connection successful!
⏰ ${new Date().toLocaleString('en-US')}

Your EduCore notification system is working correctly.
`.trim();

    return await sendTelegramMessage(testMessage);
  } catch (error) {
    console.error('❌ Telegram test failed:', error);
    return false;
  }
}
