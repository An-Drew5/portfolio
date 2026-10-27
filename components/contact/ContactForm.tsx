'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Terminal, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website_field: '', // honeypot
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setStatus('success');
      setSuccessMessage(data.message || 'Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        website_field: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred while sending your message.'
      );
    }
  };

  return (
    <Card
      chrome
      title="buffer: new_message.txt"
      badge={<span className="font-mono text-xs text-text-muted">UTF-8</span>}
      className="bg-bg-secondary/80 border-border-strong shadow-lg"
    >
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 font-mono text-xs">
        {/* Honeypot field (hidden from view and screen readers) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_field">Website URL (leave empty)</label>
          <input
            type="text"
            id="website_field"
            name="website_field"
            value={formData.website_field}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="block text-text-secondary font-medium">
              --name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              placeholder="Your name or company"
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full px-3.5 py-2.5 rounded-lg bg-bg-tertiary border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="block text-text-secondary font-medium">
              --email <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              placeholder="you@domain.com"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full px-3.5 py-2.5 rounded-lg bg-bg-tertiary border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {/* Subject (optional) */}
        <div className="space-y-1.5">
          <label htmlFor="contact-subject" className="block text-text-secondary font-medium">
            --subject <span className="text-text-muted">(optional)</span>
          </label>
          <input
            type="text"
            id="contact-subject"
            name="subject"
            placeholder="e.g. Project consultation / DevOps opportunity"
            value={formData.subject}
            onChange={handleChange}
            disabled={status === 'loading'}
            className="w-full px-3.5 py-2.5 rounded-lg bg-bg-tertiary border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="block text-text-secondary font-medium">
            --body <span className="text-accent">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            disabled={status === 'loading'}
            className="w-full px-3.5 py-2.5 rounded-lg bg-bg-tertiary border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50 resize-y"
          />
        </div>

        {/* Live Feedback alerts */}
        <div aria-live="polite">
          {status === 'success' && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex items-center justify-between">
          <div className="text-[11px] text-text-muted">
            <span className="text-accent">$</span> ./transmit --method=POST
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={status === 'loading'}
            className="min-w-[140px]"
            id="contact-submit-btn"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 mr-1.5" />
                <span>Send Message</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
