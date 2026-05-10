import { NextResponse } from 'next/server';
import { saveContactSubmission, saveChatbotConversation } from '@/lib/db';
import { rateLimit, getClientIdentifier, RateLimitPresets } from '@/lib/ratelimit';
import { notifyContactSubmission, notifyChatbotConversation } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    // Rate limiting - 5 requests per 10 minutes per IP
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimit(identifier, RateLimitPresets.standard);

    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.reset);
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          resetTime: resetDate.toISOString(),
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(RateLimitPresets.standard.maxRequests),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.reset),
            'Retry-After': String(Math.ceil((rateLimitResult.reset - Date.now()) / 1000)),
          }
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, subject, message, source, courseInterest, studentType } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (source === 'chatbot') {
      // Save to database first
      await saveChatbotConversation({
        name,
        email,
        phone,
        courseInterest,
        studentType,
        message,
      });
      
      console.log('✅ Chatbot conversation saved to database:', { name, email, courseInterest });
      
      // Send Telegram notification after successful database save
      await notifyChatbotConversation({
        name,
        email,
        phone,
        courseInterest,
        studentType,
        message,
      }).catch(err => {
        console.error('⚠️ Telegram notification failed (non-critical):', err);
      });
    } else {
      // Save to database first
      await saveContactSubmission({
        name,
        email,
        phone,
        subject,
        message,
        source: source || 'contact-form',
      });
      
      console.log('✅ Contact submission saved to database:', { name, email, subject });
      
      // Send Telegram notification after successful database save
      await notifyContactSubmission({
        name,
        email,
        phone,
        subject,
        message,
        source: source || 'contact-form',
      }).catch(err => {
        console.error('⚠️ Telegram notification failed (non-critical):', err);
      });
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been received. We will contact you soon!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
