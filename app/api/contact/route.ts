import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

// Input validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().trim().email('Invalid email address').max(150, 'Email cannot exceed 150 characters'),
  subject: z.string().trim().max(150, 'Subject cannot exceed 150 characters').optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(3000, 'Message cannot exceed 3000 characters'),
  // Honeypot spam trap: must remain empty!
  website_field: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
});

// Simple in-memory rate limiter per IP (max 5 requests per 10 minutes)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'anonymous';

    // 1. Rate limiting check
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes before sending another message.' },
        { status: 429 }
      );
    }

    // 2. Parse & validate body
    const body = await req.json();
    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMessage = parseResult.error.errors[0]?.message || 'Invalid input data.';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { name, email, subject, message, website_field } = parseResult.data;

    // 3. Honeypot verification
    if (website_field && website_field.length > 0) {
      console.warn(`[Spam Guard] Bot caught in honeypot trap from IP: ${clientIp}`);
      return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 });
    }

    // 4. Check for Resend credentials
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'andrewoppong123@gmail.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

    if (!apiKey) {
      console.warn(
        '[Contact Route] RESEND_API_KEY is not defined in environment variables. Email mock simulated successfully.'
      );
      // Mock successful delivery locally if no key is configured yet
      return NextResponse.json(
        {
          success: true,
          message: 'Message received! (Local test simulation: configure RESEND_API_KEY for live delivery).',
        },
        { status: 200 }
      );
    }

    // 5. Send via Resend client
    const resend = new Resend(apiKey);
    const emailSubject = subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: emailSubject,
      text: `From: ${name} <${email}>\n\nMessage:\n${message}\n\nClient IP: ${clientIp}`,
      html: `
        <div style="font-family: monospace, sans-serif; padding: 20px; background-color: #0b0d0e; color: #f0f6fc; border-radius: 8px;">
          <h2 style="color: #4ade80; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
            New Portfolio Message
          </h2>
          <p><strong>Sender:</strong> ${name} &lt;<a href="mailto:${email}" style="color: #86efac;">${email}</a>&gt;</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          <div style="margin-top: 20px; padding: 15px; background-color: #121619; border-left: 3px solid #4ade80; border-radius: 4px;">
            <p style="white-space: pre-wrap; margin: 0; color: #e6edf3;">${message}</p>
          </div>
          <p style="font-size: 11px; color: #6b7280; margin-top: 25px;">
            Delivered via Andrews Oppong Portfolio Contact Gateway • Reply to this email to respond directly to the sender.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend Error]', error);
      return NextResponse.json(
        { error: 'Failed to dispatch email via provider. Please try emailing directly.' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message delivered successfully! I will get back to you shortly.' },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error('[Contact Error]', err);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred. Please try again or email directly.' },
      { status: 500 }
    );
  }
}
