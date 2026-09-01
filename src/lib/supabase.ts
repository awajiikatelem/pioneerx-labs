import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Testimonial, TestimonialStatus } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  !supabaseUrl.includes('your-') &&
  supabaseAnonKey &&
  !supabaseAnonKey.includes('your-')
);


export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const LOCAL_STORAGE_KEY = 'pioneerx_testimonials_v2';

// Local storage fallback helpers for smooth dev/demo experience
function getLocalItems(): Testimonial[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalItems(items: Testimonial[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to write local testimonials:', err);
  }
}

/** Normalize database record to Testimonial object */
function mapRecordToTestimonial(record: any): Testimonial {
  const createdAt = record.created_at ? new Date(record.created_at) : new Date();
  const formattedDate = createdAt.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return {
    id: String(record.id),
    full_name: record.full_name || record.name || 'Anonymous Client',
    name: record.full_name || record.name || 'Anonymous Client',
    email: record.email || '',
    role: record.role || '',
    company: record.company || '',
    review: record.review || record.quote || '',
    quote: record.review || record.quote || '',
    rating: typeof record.rating === 'number' ? record.rating : 5,
    photo_url: record.photo_url || record.image || record.avatar || null,
    image: record.photo_url || record.image || record.avatar || '',
    avatar: record.photo_url || record.image || record.avatar || '',
    status: (record.status as TestimonialStatus) || 'pending',
    permission_granted: Boolean(record.permission_granted),
    created_at: record.created_at || new Date().toISOString(),
    updated_at: record.updated_at || new Date().toISOString(),
    date: formattedDate,
  };
}

/** Fetch public approved testimonials ONLY */
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, full_name, role, company, review, rating, photo_url, created_at')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase query error, using fallback:', error.message);
      } else if (data) {
        return data.map(mapRecordToTestimonial);
      }
    } catch (err) {
      console.warn('Error connecting to Supabase:', err);
    }
  }

  // Fallback to local storage (filter approved only)
  return getLocalItems()
    .filter((item) => item.status === 'approved')
    .map(mapRecordToTestimonial);
}

/** Submit a new review (status starts as 'pending') */
export async function submitTestimonial(input: {
  full_name: string;
  email: string;
  role?: string;
  company?: string;
  review: string;
  rating: number;
  photo_url?: string | null;
  permission_granted: boolean;
}): Promise<{ success: boolean; error?: string; data?: Testimonial }> {
  const newRecord = {
    full_name: input.full_name.trim(),
    email: input.email.trim(),
    role: input.role?.trim() || null,
    company: input.company?.trim() || null,
    review: input.review.trim(),
    rating: input.rating,
    photo_url: input.photo_url || null,
    status: 'pending' as TestimonialStatus,
    permission_granted: input.permission_granted,
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([newRecord])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true, data: mapRecordToTestimonial(data) };
    } catch (err: any) {
      console.error('Supabase exception:', err);
      return { success: false, error: err.message || 'Failed to connect to database' };
    }
  }

  // Local storage fallback for dev preview
  const localItem: Testimonial = mapRecordToTestimonial({
    ...newRecord,
    id: `local-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const existing = getLocalItems();
  existing.unshift(localItem);
  saveLocalItems(existing);

  return { success: true, data: localItem };
}

/** Admin: Fetch all testimonials regardless of status */
export async function getAllTestimonialsAdmin(): Promise<{ data: Testimonial[]; error?: string }> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase admin fetch error:', error.message);
        return { data: getLocalItems().map(mapRecordToTestimonial), error: error.message };
      } else if (data) {
        return { data: data.map(mapRecordToTestimonial) };
      }
    } catch (err: any) {
      console.warn('Admin fetch exception:', err);
      return { data: getLocalItems().map(mapRecordToTestimonial), error: err.message || 'Failed to connect to Supabase' };
    }
  }

  return { data: getLocalItems().map(mapRecordToTestimonial) };
}


/** Admin: Update testimonial status ('approved' | 'rejected' | 'pending') */
export async function updateTestimonialStatus(
  id: string,
  status: TestimonialStatus
): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Database update failed' };
    }
  }

  // Local fallback
  const items = getLocalItems();
  const updated = items.map((item) =>
    item.id === id ? { ...item, status, updated_at: new Date().toISOString() } : item
  );
  saveLocalItems(updated);
  return { success: true };
}

/** Admin: Update complete testimonial object */
export async function updateTestimonial(
  id: string,
  updates: Partial<Testimonial>
): Promise<{ success: boolean; error?: string }> {
  const dbFields: any = {
    updated_at: new Date().toISOString(),
  };

  if (updates.full_name !== undefined) dbFields.full_name = updates.full_name;
  if (updates.name !== undefined) dbFields.full_name = updates.name;
  if (updates.role !== undefined) dbFields.role = updates.role;
  if (updates.company !== undefined) dbFields.company = updates.company;
  if (updates.review !== undefined) dbFields.review = updates.review;
  if (updates.rating !== undefined) dbFields.rating = updates.rating;
  if (updates.photo_url !== undefined) dbFields.photo_url = updates.photo_url;
  if (updates.status !== undefined) dbFields.status = updates.status;

  if (supabase) {
    try {
      const { error } = await supabase.from('testimonials').update(dbFields).eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Update failed' };
    }
  }

  // Local fallback
  const items = getLocalItems();
  const updated = items.map((item) =>
    item.id === id ? { ...item, ...updates, updated_at: new Date().toISOString() } : item
  );
  saveLocalItems(updated);
  return { success: true };
}

/** Admin: Delete testimonial */
export async function deleteTestimonial(id: string): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Delete failed' };
    }
  }

  // Local fallback
  const items = getLocalItems().filter((item) => item.id !== id);
  saveLocalItems(items);
  return { success: true };
}
