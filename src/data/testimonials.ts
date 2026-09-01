import { Testimonial } from '../types';

// ============================================================
// APPROVED CLIENT TESTIMONIALS
// ============================================================
// Add approved client testimonials here after manual review.
//
// HOW TO ADD A NEW TESTIMONIAL:
// 1. Copy one of the template objects below (commented out).
// 2. Fill in the client's details.
// 3. Upload their profile photo to: /public/images/testimonials/
//    (e.g. /public/images/testimonials/john.jpg)
//    If no photo is available, set `image` to an empty string ""
//    and the card will show the client's initials instead.
// 4. Save this file — the website updates automatically.
// ============================================================

export const testimonials: Testimonial[] = [
  // ── Paste approved testimonials below this line ──────────────
  //
  // {
  //   id: 1,
  //   name: "Sarah Johnson",
  //   role: "Product Manager",          // optional
  //   company: "Example Company",       // optional
  //   image: "/images/testimonials/sarah.jpg",
  //   rating: 5,                        // 1–5
  //   review: "PioneerX Labs delivered an excellent digital experience. The team was professional, creative, and committed throughout the project.",
  //   date: "August 2026",              // optional, e.g. "August 2026"
  //   highlight: "On-time delivery",    // optional, short key result
  // },
  //
  // ── Paste approved testimonials above this line ──────────────
];

// Backwards-compatibility alias used by the home-page carousel
export const TESTIMONIALS_DATA = testimonials;
