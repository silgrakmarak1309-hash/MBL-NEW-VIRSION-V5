import { createClient } from '@supabase/supabase-js';

const FALLBACK_PROJECT_ID = 'qljyucqxgpzfehqwggbv';
const FALLBACK_URL = `https://${FALLBACK_PROJECT_ID}.supabase.co`;
const FALLBACK_ANON_KEY = 'sb_publishable_suwaB7Frskcl5QBa004Xig_3umP58N9';

function normalizeSupabaseUrl(url?: string): string {
  if (!url || typeof url !== 'string') return FALLBACK_URL;
  let trimmed = url.trim();
  if (!trimmed) return FALLBACK_URL;

  // If user provided just project ref (e.g. "qljyucqxgpzfehqwggbv")
  if (!trimmed.includes('.') && !trimmed.startsWith('http')) {
    return `https://${trimmed}.supabase.co`;
  }

  // If user omitted http:// or https:// (e.g. "qljyucqxgpzfehqwggbv.supabase.co")
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = `https://${trimmed}`;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.origin;
  } catch (_) {
    return FALLBACK_URL;
  }
}

const envUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : undefined;
const envKey = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_ANON_KEY : undefined;

const finalUrl = normalizeSupabaseUrl(envUrl);
const finalKey =
  typeof envKey === 'string' && envKey.trim().length > 10 ? envKey.trim() : FALLBACK_ANON_KEY;

export const supabase = createClient(finalUrl, finalKey);

