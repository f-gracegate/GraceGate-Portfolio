/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

// Retrieve values from Vite's import.meta.env
const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || '';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

// Attempt to initialize Supabase client
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export interface ServiceRequest {
  id?: string;
  name: string;
  email: string;
  service_type: string;
  message: string;
  budget?: string;
  timeline?: string;
  created_at?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

/**
 * Saves a service request submission.
 * Falls back to localStorage if Supabase is not configured yet.
 */
export async function saveServiceRequest(request: ServiceRequest): Promise<{ success: boolean; data?: any; error?: string; isLocalFallback: boolean }> {
  const payload = {
    ...request,
    id: request.id || Math.random().toString(36).substring(2, 11),
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .insert([payload])
        .select();

      if (error) {
        console.error('Supabase save failed:', error);
        return { 
          success: false, 
          error: 'There was an error submitting your request. Please try again later.', 
          isLocalFallback: false 
        };
      }

      return { success: true, data: data?.[0], isLocalFallback: false };
    } catch (err: any) {
      console.error('Unhandled Supabase error:', err);
      return { 
          success: false, 
          error: 'There was an error submitting your request. Please try again later.', 
          isLocalFallback: false 
      };
    }
  } else {
    // Elegant local fallback
    addRequestToLocalStorage(payload);
    return { success: true, data: payload, isLocalFallback: true };
  }
}

/**
 * Saves a general contact message submission.
 * Falls back to localStorage if Supabase is not configured.
 */
export async function saveContactMessage(message: ContactMessage): Promise<{ success: boolean; data?: any; error?: string; isLocalFallback: boolean }> {
  const payload = {
    ...message,
    id: message.id || Math.random().toString(36).substring(2, 11),
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([payload])
        .select();

      if (error) {
        console.error('Supabase contact save failed:', error);
        return { 
          success: false, 
          error: 'There was an error submitting your request. Please try again later.', 
          isLocalFallback: false 
        };
      }

      return { success: true, data: data?.[0], isLocalFallback: false };
    } catch (err: any) {
      console.error('Unhandled Supabase error:', err);
      return { 
          success: false, 
          error: 'There was an error submitting your request. Please try again later.', 
          isLocalFallback: false 
      };
    }
  } else {
    addMessageToLocalStorage(payload);
    return { success: true, data: payload, isLocalFallback: true };
  }
}

// Helper methods for localStorage
function addRequestToLocalStorage(request: any) {
  try {
    const existing = localStorage.getItem('gracegate_service_requests');
    const requests = existing ? JSON.parse(existing) : [];
    requests.unshift(request);
    localStorage.setItem('gracegate_service_requests', JSON.stringify(requests));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

function addMessageToLocalStorage(message: any) {
  try {
    const existing = localStorage.getItem('gracegate_contact_messages');
    const messages = existing ? JSON.parse(existing) : [];
    messages.unshift(message);
    localStorage.setItem('gracegate_contact_messages', JSON.stringify(messages));
  } catch (e) {
    console.error('Failed to save contact message to localStorage:', e);
  }
}

export function getLocalRecords() {
  try {
    const requestsStr = localStorage.getItem('gracegate_service_requests');
    const messagesStr = localStorage.getItem('gracegate_contact_messages');
    return {
      requests: requestsStr ? JSON.parse(requestsStr) : [],
      messages: messagesStr ? JSON.parse(messagesStr) : []
    };
  } catch (e) {
    return { requests: [], messages: [] };
  }
}
