# Telegram Notifications Setup

## Overview

Your website now sends beautiful formatted notifications to your Telegram group whenever:
- Someone submits the contact form
- Someone completes a chatbot conversation

**Flow:** Form Submit → Save to Database → Send to Telegram ✅

## Setup Instructions

### 1. Add Credentials to `.env.local` and `.env`

Open both `.env.local` and `.env` files and add:

```bash
TELEGRAM_BOT_TOKEN=8523506491:AAFU7ysb4OwgZQA-HeR2iXAyp-q9bKockUU
TELEGRAM_CHAT_ID=-5087350776
```

### 2. Restart Development Server

After adding the credentials, restart your server:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### 3. Test Telegram Notifications

Simply submit a form or use the chatbot to test:

**Option A: Use Contact Form**
1. Go to http://localhost:3000/contact
2. Fill out and submit the form
3. Check your Telegram group for the notification

**Option B: Use Chatbot**
1. Click the chatbot button (bottom right)
2. Complete the conversation
3. Check your Telegram group for the notification

**What to check in console:**
```bash
✅ Contact submission saved to database
✅ Telegram notification sent successfully
```

**If notifications don't appear:**
- Check bot token and chat ID are correct in `.env.local`
- Ensure bot was added to the group as admin
- Verify group ID is correct (should start with `-`)
- Check console for error messages

## Message Formats

### Contact Form Notification
```
🔔 New Contact Form Submission

👤 Name: John Doe
📧 Email: john@example.com
📱 Phone: +971501234567
📋 Subject: Course Information

💬 Message:
I would like to know more about your AI Consultancy course.

📍 Source: Contact Form
⏰ Time: May 10, 2026, 1:45 AM

━━━━━━━━━━━━━━━━━
```

### Chatbot Conversation Notification
```
🤖 New Chatbot Conversation

👤 Name: Jane Smith
📧 Email: jane@example.com
📱 Phone: +971501234567
🎓 Course Interest: German Language
👔 Student Type: Working Professional

💬 Additional Message:
I want to start in June

📍 Source: Chatbot
⏰ Time: May 10, 2026, 1:45 AM

━━━━━━━━━━━━━━━━━
```

## Features

✅ **Clean Formatting**
- HTML formatted messages
- Emoji indicators for easy reading
- Organized layout with sections

✅ **Smart Delivery**
- Only sends after successful database save
- Non-blocking (doesn't slow down user response)
- Error handling (won't break if Telegram is down)

✅ **Security**
- Escapes HTML to prevent injection
- Bot token stored in environment variables
- Not exposed to frontend

## Testing

### Test Contact Form
1. Go to: http://localhost:3000/contact
2. Fill out and submit the form
3. Check Telegram group for notification

### Test Chatbot
1. Click chatbot button (bottom right)
2. Complete the conversation
3. Check Telegram group for notification

### Check Console Logs
```bash
✅ Contact submission saved to database: { name: 'John', email: 'john@example.com' }
✅ Telegram notification sent successfully
```

Or if Telegram fails (non-critical):
```bash
⚠️ Telegram notification failed (non-critical): Error message
```

## Troubleshooting

### Issue: No messages in Telegram

**Check:**
1. ✅ Bot token is correct
2. ✅ Chat ID is correct (includes the `-` sign)
3. ✅ Bot is added to the group as admin
4. ✅ `.env.local` file exists and has the credentials
5. ✅ Server was restarted after adding credentials

**Test:**
- Submit the contact form or use the chatbot
- Check the terminal/console for Telegram success/error logs

### Issue: Messages appear but formatting is broken

**Cause:** HTML special characters not escaped properly

**Fix:** The system automatically escapes HTML. If you see raw HTML tags, check Telegram parse mode.

### Issue: Rate limit errors in Telegram

**Cause:** Telegram API has rate limits (20 messages/minute to group)

**Solution:** 
- This shouldn't happen with normal usage
- If testing heavily, wait a minute between tests

## Bot Information

**Bot Token:** `8523506491:AAFU7ysb4OwgZQA-HeR2iXAyp-q9bKockUU`
**Chat ID:** `-5087350776`

### How to Get Your Own (Optional)

If you want to create a new bot:

1. **Create Bot:**
   - Message @BotFather on Telegram
   - Send `/newbot`
   - Follow instructions
   - Copy the bot token

2. **Get Chat ID:**
   - Add bot to your group
   - Send a message in the group
   - Visit: `https://api.telegram.org/bot{BOT_TOKEN}/getUpdates`
   - Look for `"chat":{"id":-123456789}`

3. **Update .env:**
   ```bash
   TELEGRAM_BOT_TOKEN=your_new_token
   TELEGRAM_CHAT_ID=your_chat_id
   ```

## Production Deployment

### Vercel / Netlify
Add environment variables in the dashboard:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### Other Platforms
Ensure environment variables are set in your hosting platform's configuration.

### Security
✅ Never commit `.env.local` or `.env` to git (already in `.gitignore`)
✅ Use environment variables for secrets
✅ Bot token gives full access to your bot - keep it secret

## Advanced Configuration

### Change Message Format

Edit `/lib/telegram.ts`:

```typescript
function formatContactMessage(data: ContactSubmission): string {
  // Customize your message format here
  return `Your custom format`;
}
```

### Add More Fields

To include additional data in notifications:

1. Update interface in `/lib/telegram.ts`
2. Update format function
3. Pass additional data from API route

### Disable Telegram Notifications

Comment out in `/app/api/contact/route.ts`:

```typescript
// await notifyContactSubmission(...).catch(...);
```

### Send to Multiple Groups

```typescript
const TELEGRAM_GROUPS = [
  { token: 'xxx', chatId: '-111' },  // Sales team
  { token: 'xxx', chatId: '-222' },  // Support team
];

// Send to all groups
await Promise.all(
  TELEGRAM_GROUPS.map(group => 
    notifyContactSubmission(data, group)
  )
);
```

## Files Involved

- `/lib/telegram.ts` - Telegram notification logic
- `/app/api/contact/route.ts` - Integration point (sends notifications)
- `.env.local` - Environment variables (local dev)
- `.env` - Environment variables (production/other configs)

## API Endpoints

### Contact API (with Telegram)
```
POST /api/contact
```
Saves to database, then sends Telegram notification automatically

## Summary

✅ **What happens when a user submits:**
1. Data passes rate limiting check
2. Data is validated
3. **Data saved to database** (SQLite)
4. **Telegram notification sent** (non-blocking)
5. Success response sent to user

✅ **Telegram notification includes:**
- All form fields
- Timestamp
- Source (Contact Form or Chatbot)
- Beautiful formatting with emojis

✅ **Error Handling:**
- If database fails → User gets error, no Telegram sent
- If Telegram fails → User still gets success, error logged
- Telegram failure doesn't affect user experience

**Your notifications are ready! 🎉**
