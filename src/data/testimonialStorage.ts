import { Testimonial } from '../types';

// ============================================================
// LOCAL STORAGE TESTIMONIALS UTILITY
// ============================================================
// Submitted reviews are stored in localStorage so they appear
// on the Testimonials section immediately — no backend required.
// ============================================================

const STORAGE_KEY = 'pioneerx_testimonials';

/** Read all submitted reviews from localStorage */
export function getStoredTestimonials(): Testimonial[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Testimonial[];
  } catch {
    return [];
  }
}

/** Save a new review to localStorage */
export function saveTestimonial(testimonial: Testimonial): void {
  const existing = getStoredTestimonials();
  existing.push(testimonial);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

/** Get all testimonials — static data + localStorage combined */
export function getAllTestimonials(staticData: Testimonial[]): Testimonial[] {
  const stored = getStoredTestimonials();
  return [...staticData, ...stored];
}
