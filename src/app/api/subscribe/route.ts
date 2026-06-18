import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export async function POST(req: Request) {
  let body: { name?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const email = (body.email || '').trim();
  const name = (body.name || '').trim();
  if (!/.+@.+\..+/.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  // No write token configured yet → accept gracefully (UI works), but not stored.
  if (!projectId || !token) {
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const writeClient = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
    await writeClient.create({
      _type: 'subscriber',
      name,
      email,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
