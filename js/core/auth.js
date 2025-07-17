// js/core/auth.js - User Authentication Module

export async function initializeAuth() {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    await requestAnonymousToken();
  }
  console.log('[Auth] Initialized with token:', localStorage.getItem('auth_token'));
}

async function requestAnonymousToken() {
  try {
    const res = await fetch('https://api.future-tracker.ai/auth/anon', {
      method: 'POST',
    });
    const data = await res.json();
    localStorage.setItem('auth_token', data.token);
    console.log('[Auth] Anonymous token granted');
  } catch (err) {
    console.error('[Auth] Token fetch failed:', err);
  }
}
