'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
  execute(input: unknown): Promise<unknown>;
};

type ModelContext = {
  registerTool(tool: ToolDefinition, options?: { signal?: AbortSignal }): void | Promise<void>;
};

function modelContext(): ModelContext | undefined {
  return (document as Document & { modelContext?: ModelContext }).modelContext;
}

async function postJson(url: string, payload: Record<string, unknown>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json() as { ok: boolean; message: string };
  if (!response.ok || !result.ok) throw new Error(result.message || 'Please try again.');
  return result;
}

function SubmitButton({ busy, label }: { busy: boolean; label: string }) {
  return (
    <button className="form-submit" type="submit" disabled={busy}>
      {busy ? <LoaderCircle className="spin" size={17} /> : null}
      {busy ? 'Sending…' : label}
      {!busy ? <ArrowRight size={17} /> : null}
    </button>
  );
}

export function NewsletterForm() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const subscribe = useCallback(async (name: string, email: string) => {
    setBusy(true);
    setMessage('');
    try {
      const result = await postJson('/api/subscribers', { name, email });
      setMessage(result.message);
      return { ok: true, message: result.message };
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Please try again.';
      setMessage(text);
      throw error;
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    const context = modelContext();
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'subscribe_to_lab_signals',
      title: 'Subscribe to Lab Signals',
      description: 'Subscribe a named email address to research updates from the two laboratories.',
      inputSchema: {
        type: 'object',
        properties: { name: { type: 'string' }, email: { type: 'string', format: 'email' } },
        required: ['name', 'email'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      async execute(input) {
        const value = input as { name?: unknown; email?: unknown };
        if (typeof value.name !== 'string' || typeof value.email !== 'string') throw new Error('A name and email are required.');
        return subscribe(value.name, value.email);
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, [subscribe]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      await subscribe(String(data.get('name') || ''), String(data.get('email') || ''));
      form.reset();
    } catch { /* Status is visible to the visitor. */ }
  }

  return (
    <form className="newsletter-form" onSubmit={onSubmit}>
      <label><span>Name</span><input name="name" autoComplete="name" required placeholder="Your name" /></label>
      <label><span>Email</span><input name="email" type="email" autoComplete="email" required placeholder="you@institution.edu" /></label>
      <SubmitButton busy={busy} label="Subscribe" />
      {message ? <output className="form-message"><Check size={14} /> {message}</output> : null}
    </form>
  );
}

type InquiryType = 'research' | 'consulting' | 'courses' | 'general';

export function InquiryForm({ initialType = 'general' }: { initialType?: InquiryType }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const send = useCallback(async (payload: Record<string, unknown>) => {
    setBusy(true);
    setMessage('');
    try {
      const result = await postJson('/api/inquiries', payload);
      setMessage(result.message);
      return { ok: true, message: result.message };
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Please try again.';
      setMessage(text);
      throw error;
    } finally { setBusy(false); }
  }, []);

  useEffect(() => {
    const context = modelContext();
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'submit_lab_inquiry',
      title: 'Submit a lab inquiry',
      description: 'Send a research, consulting, course or general inquiry to ResearchBuddy AI.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string' }, email: { type: 'string', format: 'email' },
          organization: { type: 'string' }, inquiryType: { enum: ['research', 'consulting', 'courses', 'general'] },
          academicBackground: { type: 'string' }, researchInterest: { type: 'string' },
          experience: { type: 'string' }, proposedTopic: { type: 'string' }, message: { type: 'string' },
        },
        required: ['name', 'email', 'inquiryType', 'message'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: true },
      async execute(input) {
        if (!input || typeof input !== 'object') throw new Error('Inquiry details are required.');
        return send(input as Record<string, unknown>);
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, [send]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try { await send(data); form.reset(); } catch { /* Status is visible. */ }
  }

  return (
    <form className="inquiry-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label><span>Name</span><input name="name" autoComplete="name" required /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
      </div>
      <div className="form-row">
        <label><span>Institution / organization</span><input name="organization" autoComplete="organization" /></label>
        <label><span>Inquiry type</span><NativeSelect name="inquiryType" defaultValue={initialType}><NativeSelectOption value="research">Research mentorship</NativeSelectOption><NativeSelectOption value="consulting">Consulting</NativeSelectOption><NativeSelectOption value="courses">Courses & learning</NativeSelectOption><NativeSelectOption value="general">General inquiry</NativeSelectOption></NativeSelect></label>
      </div>
      {initialType === 'research' ? (
        <>
          <div className="form-row"><label><span>Academic background</span><input name="academicBackground" /></label><label><span>Research interest</span><input name="researchInterest" required /></label></div>
          <div className="form-row"><label><span>Research experience</span><input name="experience" /></label><label><span>Proposed topic</span><input name="proposedTopic" /></label></div>
        </>
      ) : null}
      <label><span>Message</span><textarea name="message" rows={6} required placeholder="Tell us enough to understand the question, context and desired outcome." /></label>
      <SubmitButton busy={busy} label={initialType === 'research' ? 'Start your research journey' : initialType === 'consulting' ? 'Discuss your project' : 'Send inquiry'} />
      {message ? <output className="form-message"><Check size={14} /> {message}</output> : null}
    </form>
  );
}

export function EnrollmentForm({ courseSlug }: { courseSlug: string }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const requestPlace = useCallback(async (payload: Record<string, unknown>) => {
    setBusy(true); setMessage('');
    try {
      const result = await postJson('/api/enrollments', { ...payload, courseSlug });
      setMessage(result.message);
      return { ok: true, message: result.message };
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Please try again.';
      setMessage(text); throw error;
    } finally { setBusy(false); }
  }, [courseSlug]);

  useEffect(() => {
    const context = modelContext();
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'request_course_enrollment', title: 'Request course enrollment',
      description: 'Request a place in the course shown on this page.',
      inputSchema: { type: 'object', properties: { name: { type: 'string' }, email: { type: 'string', format: 'email' }, institution: { type: 'string' }, message: { type: 'string' } }, required: ['name', 'email'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: true },
      async execute(input) { if (!input || typeof input !== 'object') throw new Error('Enrollment details are required.'); return requestPlace(input as Record<string, unknown>); },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, [requestPlace]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try { await requestPlace(data); form.reset(); } catch { /* Status is visible. */ }
  }
  return (
    <form className="inquiry-form compact-form" onSubmit={onSubmit}>
      <div className="form-row"><label><span>Name</span><input name="name" required /></label><label><span>Email</span><input name="email" type="email" required /></label></div>
      <label><span>Institution</span><input name="institution" /></label>
      <label><span>Note</span><textarea name="message" rows={3} placeholder="Anything we should know about your background or schedule?" /></label>
      <SubmitButton busy={busy} label="Request enrollment" />
      {message ? <output className="form-message"><Check size={14} /> {message}</output> : null}
    </form>
  );
}
