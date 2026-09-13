const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  service?: string;
  message?: string;
};

export type AppointmentPayload = {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes?: string;
};

async function request<T>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  if (!API_URL) throw new Error('Fund Care API is not configured. Add NEXT_PUBLIC_API_URL to .env.local.');
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...payload }),
  });
  if (!response.ok) throw new Error(`API request failed (${response.status}).`);
  const data = await response.json();
  if (!data?.ok) throw new Error(data?.error || 'API request failed.');
  return data as T;
}

export function submitLead(payload: LeadPayload) {
  return request<{ ok: true; id: string }>('createLead', payload as unknown as Record<string, unknown>);
}

export function submitAppointment(payload: AppointmentPayload) {
  return request<{ ok: true; id: string }>('createAppointment', payload as unknown as Record<string, unknown>);
}

export function adminLogin(password: string) {
  return request<{ ok: true; token: string }>('adminLogin', { password });
}

export function adminList(token: string) {
  return request<{ ok: true; leads: Record<string, unknown>[]; appointments: Record<string, unknown>[] }>('adminList', { token });
}

export function adminUpdateStatus(token: string, type: 'lead' | 'appointment', id: string, status: string) {
  return request<{ ok: true }>('adminUpdateStatus', { token, type, id, status });
}
