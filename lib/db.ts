import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDatabase() {
  if (db) {
    return db;
  }

  const dbPath = path.join(process.cwd(), 'data', 'educore.db');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await initializeDatabase(db);
  
  return db;
}

async function initializeDatabase(database: Database) {
  await database.exec(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      source TEXT DEFAULT 'contact-form',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS chatbot_conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      course_interest TEXT,
      student_type TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
    CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at);
    CREATE INDEX IF NOT EXISTS idx_chatbot_email ON chatbot_conversations(email);
    CREATE INDEX IF NOT EXISTS idx_chatbot_created ON chatbot_conversations(created_at);
  `);

  console.log('✅ Database initialized successfully');
}

export async function saveContactSubmission(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: string;
}) {
  const database = await getDatabase();
  
  const result = await database.run(
    `INSERT INTO contact_submissions (name, email, phone, subject, message, source)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.email,
      data.phone || null,
      data.subject || 'General Inquiry',
      data.message,
      data.source || 'contact-form',
    ]
  );

  return result;
}

export async function saveChatbotConversation(data: {
  name: string;
  email: string;
  phone?: string;
  courseInterest?: string;
  studentType?: string;
  message?: string;
}) {
  const database = await getDatabase();
  
  const result = await database.run(
    `INSERT INTO chatbot_conversations (name, email, phone, course_interest, student_type, message)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.email,
      data.phone || null,
      data.courseInterest || null,
      data.studentType || null,
      data.message || null,
    ]
  );

  return result;
}

export async function getAllContactSubmissions(limit = 100) {
  const database = await getDatabase();
  
  const submissions = await database.all(
    `SELECT * FROM contact_submissions 
     ORDER BY created_at DESC 
     LIMIT ?`,
    [limit]
  );

  return submissions;
}

export async function getAllChatbotConversations(limit = 100) {
  const database = await getDatabase();
  
  const conversations = await database.all(
    `SELECT * FROM chatbot_conversations 
     ORDER BY created_at DESC 
     LIMIT ?`,
    [limit]
  );

  return conversations;
}

export async function getSubmissionById(id: number) {
  const database = await getDatabase();
  
  const submission = await database.get(
    `SELECT * FROM contact_submissions WHERE id = ?`,
    [id]
  );

  return submission;
}

export async function getConversationById(id: number) {
  const database = await getDatabase();
  
  const conversation = await database.get(
    `SELECT * FROM chatbot_conversations WHERE id = ?`,
    [id]
  );

  return conversation;
}

export async function searchSubmissionsByEmail(email: string) {
  const database = await getDatabase();
  
  const submissions = await database.all(
    `SELECT * FROM contact_submissions 
     WHERE email LIKE ? 
     ORDER BY created_at DESC`,
    [`%${email}%`]
  );

  return submissions;
}

export async function getRecentSubmissions(days = 7) {
  const database = await getDatabase();
  
  const submissions = await database.all(
    `SELECT * FROM contact_submissions 
     WHERE created_at >= datetime('now', '-${days} days')
     ORDER BY created_at DESC`
  );

  return submissions;
}

export async function getStatistics() {
  const database = await getDatabase();
  
  const stats = await database.get(`
    SELECT 
      (SELECT COUNT(*) FROM contact_submissions) as total_contacts,
      (SELECT COUNT(*) FROM chatbot_conversations) as total_chats,
      (SELECT COUNT(*) FROM contact_submissions WHERE created_at >= datetime('now', '-7 days')) as contacts_last_7_days,
      (SELECT COUNT(*) FROM chatbot_conversations WHERE created_at >= datetime('now', '-7 days')) as chats_last_7_days
  `);

  return stats;
}
