import { MongoClient, Db, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://educore-db.educorenextgen.svc.cluster.local:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'educorenextgen-website';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(MONGODB_DB);

  await initializeDatabase(db);

  return db;
}

async function initializeDatabase(database: Db) {
  const contacts = database.collection('contact_submissions');
  const chatbot = database.collection('chatbot_conversations');

  await contacts.createIndex({ email: 1 });
  await contacts.createIndex({ created_at: -1 });
  await chatbot.createIndex({ email: 1 });
  await chatbot.createIndex({ created_at: -1 });

  console.log('✅ MongoDB initialized successfully');
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

  const result = await database.collection('contact_submissions').insertOne({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    subject: data.subject || 'General Inquiry',
    message: data.message,
    source: data.source || 'contact-form',
    created_at: new Date(),
  });

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

  const result = await database.collection('chatbot_conversations').insertOne({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    course_interest: data.courseInterest || null,
    student_type: data.studentType || null,
    message: data.message || null,
    created_at: new Date(),
  });

  return result;
}

export async function getAllContactSubmissions(limit = 100) {
  const database = await getDatabase();

  const submissions = await database.collection('contact_submissions')
    .find()
    .sort({ created_at: -1 })
    .limit(limit)
    .toArray();

  return submissions;
}

export async function getAllChatbotConversations(limit = 100) {
  const database = await getDatabase();

  const conversations = await database.collection('chatbot_conversations')
    .find()
    .sort({ created_at: -1 })
    .limit(limit)
    .toArray();

  return conversations;
}

export async function getSubmissionById(id: string) {
  const database = await getDatabase();

  const submission = await database.collection('contact_submissions')
    .findOne({ _id: new ObjectId(id) });

  return submission;
}

export async function getConversationById(id: string) {
  const database = await getDatabase();

  const conversation = await database.collection('chatbot_conversations')
    .findOne({ _id: new ObjectId(id) });

  return conversation;
}

export async function searchSubmissionsByEmail(email: string) {
  const database = await getDatabase();

  const submissions = await database.collection('contact_submissions')
    .find({ email: { $regex: email, $options: 'i' } })
    .sort({ created_at: -1 })
    .toArray();

  return submissions;
}

export async function getRecentSubmissions(days = 7) {
  const database = await getDatabase();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const submissions = await database.collection('contact_submissions')
    .find({ created_at: { $gte: since } })
    .sort({ created_at: -1 })
    .toArray();

  return submissions;
}

export async function getStatistics() {
  const database = await getDatabase();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [totalContacts, totalChats, contactsLast7, chatsLast7] = await Promise.all([
    database.collection('contact_submissions').countDocuments(),
    database.collection('chatbot_conversations').countDocuments(),
    database.collection('contact_submissions').countDocuments({ created_at: { $gte: sevenDaysAgo } }),
    database.collection('chatbot_conversations').countDocuments({ created_at: { $gte: sevenDaysAgo } }),
  ]);

  return {
    total_contacts: totalContacts,
    total_chats: totalChats,
    contacts_last_7_days: contactsLast7,
    chats_last_7_days: chatsLast7,
  };
}
