# Database Setup Guide

## Overview
This application uses **SQLite3** database to store:
- Contact form submissions
- Chatbot conversations

## Installation

### 1. Install Required Dependencies

Run the following command to install SQLite packages:

```bash
npm install sqlite sqlite3
```

Or with yarn:

```bash
yarn add sqlite sqlite3
```

### 2. Create Data Directory

The database will be automatically created in the `data/` folder when the app first runs. The folder structure will be:

```
/data
  └── educore.db
```

### 3. Database Schema

The database contains two tables:

#### **contact_submissions**
```sql
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT)
- phone (TEXT)
- subject (TEXT)
- message (TEXT)
- source (TEXT) - 'contact-form', 'chatbot', etc.
- created_at (DATETIME)
```

#### **chatbot_conversations**
```sql
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT)
- phone (TEXT)
- course_interest (TEXT)
- student_type (TEXT)
- message (TEXT)
- created_at (DATETIME)
```

## API Endpoints

### Submit Contact/Chatbot Data
```
POST /api/contact
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+971501234567",
  "subject": "Course Inquiry",
  "message": "I want to know more about AI Consultancy",
  "source": "contact-form" // or "chatbot"
}
```

For chatbot submissions, include:
```json
{
  "courseInterest": "AI Consultancy",
  "studentType": "Working Professional"
}
```

### View Submissions (Direct Database Access)

Access your data directly using SQLite commands:

**View all contact submissions:**
```bash
sqlite3 data/educore.db "SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 50;"
```

**View all chatbot conversations:**
```bash
sqlite3 data/educore.db "SELECT * FROM chatbot_conversations ORDER BY created_at DESC LIMIT 50;"
```

**Get statistics:**
```bash
sqlite3 data/educore.db "SELECT COUNT(*) as total FROM contact_submissions;"
sqlite3 data/educore.db "SELECT COUNT(*) as total FROM chatbot_conversations;"
```

**Search by email:**
```bash
sqlite3 data/educore.db "SELECT * FROM contact_submissions WHERE email LIKE '%example.com%';"
```

**Export to CSV:**
```bash
sqlite3 data/educore.db -header -csv "SELECT * FROM contact_submissions;" > contacts.csv
sqlite3 data/educore.db -header -csv "SELECT * FROM chatbot_conversations;" > chats.csv
```

## Testing the Database

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Submit Test Data via Chatbot
- Open the website
- Click the chatbot button (bottom right)
- Complete the conversation flow
- Data will be saved to the database

### 3. View Saved Data
Use SQLite command line:
```bash
# View all chatbot conversations
sqlite3 data/educore.db "SELECT * FROM chatbot_conversations;"

# View all contact submissions
sqlite3 data/educore.db "SELECT * FROM contact_submissions;"

# View with formatted output
sqlite3 data/educore.db -header -column "SELECT * FROM chatbot_conversations;"
```

## Database Location

The SQLite database file is located at:
```
/data/educore.db
```

**Note:** This folder is added to `.gitignore` and will NOT be committed to version control.

## Backup Database

To backup your database:
```bash
cp data/educore.db data/educore_backup_$(date +%Y%m%d).db
```

## Reset Database

To reset the database (delete all data):
```bash
rm -rf data/
```

The database will be recreated automatically on next API call.

## Database Utilities Available

The `lib/db.ts` file provides these functions:

- `saveContactSubmission(data)` - Save contact form submission
- `saveChatbotConversation(data)` - Save chatbot conversation
- `getAllContactSubmissions(limit)` - Get all contact submissions
- `getAllChatbotConversations(limit)` - Get all chatbot conversations
- `getSubmissionById(id)` - Get specific submission
- `getConversationById(id)` - Get specific conversation
- `searchSubmissionsByEmail(email)` - Search by email
- `getRecentSubmissions(days)` - Get submissions from last N days
- `getStatistics()` - Get overall statistics

## Troubleshooting

### Database locked error
If you get a "database is locked" error, make sure:
1. Only one instance of the app is running
2. Close any SQLite database viewers

### Permission errors
If you get permission errors:
```bash
mkdir -p data
chmod 755 data
```

### Reset everything
```bash
rm -rf data/
rm -rf node_modules/
npm install
npm run dev
```

## Production Deployment

For production:
1. Ensure `data/` directory exists with proper permissions
2. Set up automated database backups (daily recommended)
3. Consider using a more robust database (PostgreSQL, MySQL) for high traffic
4. Build your own secure admin interface to view submissions

## Security Notes

✅ **Current Security:**
- No public admin endpoints - data only accessible via direct database access
- Contact API has basic validation (email format, required fields)
- Database file is not publicly accessible (outside /public folder)

⚠️ **Production Recommendations:**
- Add rate limiting for the contact API to prevent spam
- Implement CAPTCHA on contact form
- Set up automated database backups
- Use HTTPS in production
- Monitor for suspicious submission patterns
