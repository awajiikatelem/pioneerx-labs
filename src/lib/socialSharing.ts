import { Testimonial } from '../types';
import { getSiteUrl } from './config';

/**
 * Clean up testimonial quote for social media captions.
 */
function cleanQuote(text: string): string {
  if (!text) return '';
  return text.trim().replace(/^["']|["']$/g, '');
}

/**
 * Get client attribution string (e.g. "John Doe, Founder at TechCorp" or "John Doe")
 */
function getClientAttribution(testimonial: Testimonial): string {
  const name = (testimonial.full_name || testimonial.name || 'Our Valued Client').trim();
  const role = (testimonial.role || '').trim();
  const company = (testimonial.company || '').trim();

  if (role && company) {
    return `${name} (${role} at ${company})`;
  } else if (role) {
    return `${name} (${role})`;
  } else if (company) {
    return `${name} (${company})`;
  }
  return name;
}

/**
 * Get the direct public permalink for a testimonial.
 */
export function getTestimonialUrl(testimonial: Testimonial, siteUrl?: string): string {
  const baseUrl = (siteUrl || getSiteUrl()).replace(/\/$/, '');
  return `${baseUrl}/testimonials/${testimonial.id}`;
}

/**
 * Dynamic master caption generator
 */
export function generateTestimonialCaption(
  testimonial: Testimonial,
  siteUrl?: string
): string {
  const name = (testimonial.full_name || testimonial.name || 'our client').trim();
  const quote = cleanQuote(testimonial.review || testimonial.quote || '');
  const url = getTestimonialUrl(testimonial, siteUrl);

  return `🚀 Another great experience with PioneerX Labs.\n\n“${quote}”\n\nWe're grateful to ${name} for trusting PioneerX Labs to bring their ideas to life.\n\nAt PioneerX Labs, we're passionate about building meaningful technology and creating solutions that make an impact.\n\nWant to work with us?\n🌐 Visit: pioneerx-labs.vercel.app\n🔗 View testimonial: ${url}\n\n#PioneerXLabs #Technology #Innovation #ClientSuccess #DigitalSolutions`;
}

/**
 * WhatsApp Caption: formatted with markdown (*bold*, _italic_)
 */
export function generateWhatsAppCaption(
  testimonial: Testimonial,
  siteUrl?: string
): string {
  const name = (testimonial.full_name || testimonial.name || 'our client').trim();
  const attribution = getClientAttribution(testimonial);
  const quote = cleanQuote(testimonial.review || testimonial.quote || '');
  const url = getTestimonialUrl(testimonial, siteUrl);

  return `🚀 *Another great experience with PioneerX Labs*\n\n“_${quote}_”\n\n— *${attribution}*\n\nWe're grateful to ${name} for trusting PioneerX Labs to bring their vision to life.\n\nReady to build your next digital solution?\n🌐 *Visit:* pioneerx-labs.vercel.app\n🔗 *Read review:* ${url}`;
}

/**
 * LinkedIn Caption: professional, tech-focused, structured
 */
export function generateLinkedInCaption(
  testimonial: Testimonial,
  siteUrl?: string
): string {
  const name = (testimonial.full_name || testimonial.name || 'our client').trim();
  const attribution = getClientAttribution(testimonial);
  const quote = cleanQuote(testimonial.review || testimonial.quote || '');
  const url = getTestimonialUrl(testimonial, siteUrl);

  return `Delivering real impact through engineering and purposeful design.\n\n“${quote}”\n— ${attribution}\n\nWe're proud to have partnered with ${name} and grateful for the trust placed in PioneerX Labs.\n\nFrom software engineering to scalable digital platforms, we help ambitious teams build tomorrow's technology.\n\nExplore our work or connect with our team:\n🌐 pioneerx-labs.vercel.app\n🔗 Direct Review: ${url}\n\n#PioneerXLabs #SoftwareEngineering #TechInnovation #ClientSuccess #BuildingTheFuture #DigitalTransformation`;
}

/**
 * X / Twitter Caption: snappy, punchy, adheres to character budget
 */
export function generateXCaption(
  testimonial: Testimonial,
  siteUrl?: string
): string {
  const name = (testimonial.full_name || testimonial.name || 'our client').trim();
  const rawQuote = cleanQuote(testimonial.review || testimonial.quote || '');
  const url = getTestimonialUrl(testimonial, siteUrl);

  // Keep quote trimmed if very long for tweet length limits
  const maxQuoteLen = 140;
  const quote =
    rawQuote.length > maxQuoteLen
      ? `${rawQuote.slice(0, maxQuoteLen - 3)}...`
      : rawQuote;

  return `“${quote}”\n\nHonored to partner with ${name} and deliver impactful digital technology with PioneerX Labs 🚀\n\nRead more: ${url}\n\n#PioneerXLabs #TechInnovation #SoftwareEngineering`;
}

/**
 * Instagram Caption: clean spacing, engaging hook, hashtags & bio CTA
 */
export function generateInstagramCaption(
  testimonial: Testimonial,
  siteUrl?: string
): string {
  const name = (testimonial.full_name || testimonial.name || 'our client').trim();
  const quote = cleanQuote(testimonial.review || testimonial.quote || '');
  const url = getTestimonialUrl(testimonial, siteUrl);

  return `🚀 Another great experience with PioneerX Labs.\n.\n“${quote}”\n.\nWe're truly grateful to ${name} for choosing PioneerX Labs to bring their ideas to reality.\n\nEvery project is an opportunity to push boundaries, engineer robust technology, and deliver lasting impact.\n.\nReady to build your next breakthrough?\n🌐 Visit: pioneerx-labs.vercel.app\n🔗 Read full story: ${url}\n.\n.\n#PioneerXLabs #YouthInTech #SoftwareEngineering #Innovation #ClientSuccess #TechLeadership #WebDevelopment #AI #DigitalSolutions`;
}

/**
 * Pre-generate all share intent URLs for standard social platforms
 */
export function getSocialShareUrls(testimonial: Testimonial, siteUrl?: string) {
  const url = getTestimonialUrl(testimonial, siteUrl);
  const waCaption = generateWhatsAppCaption(testimonial, siteUrl);
  const xCaption = generateXCaption(testimonial, siteUrl);

  return {
    testimonialUrl: url,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(waCaption)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(xCaption)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };
}

/**
 * Native Device Share helper using Web Share API
 */
export async function shareNative(
  testimonial: Testimonial,
  siteUrl?: string
): Promise<{ success: boolean; error?: string }> {
  if (typeof navigator === 'undefined' || !navigator.share) {
    return { success: false, error: 'Web Share API not supported on this device/browser.' };
  }

  const name = testimonial.full_name || testimonial.name || 'Client';
  const text = generateTestimonialCaption(testimonial, siteUrl);
  const url = getTestimonialUrl(testimonial, siteUrl);

  try {
    await navigator.share({
      title: `${name} on PioneerX Labs`,
      text: text,
      url: url,
    });
    return { success: true };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return { success: true }; // User cancelled the share dialog
    }
    return { success: false, error: err.message || 'Share failed' };
  }
}

/**
 * Helper to wrap text cleanly onto an HTML5 Canvas with custom line height
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 6
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  let linesCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + (line ? ' ' : '') + words[n];
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      if (linesCount === maxLines - 1 && n < words.length - 1) {
        ctx.fillText(line + '...', x, currentY);
        return currentY + lineHeight;
      }
      ctx.fillText(line, x, currentY);
      line = words[n];
      currentY += lineHeight;
      linesCount++;
      if (linesCount >= maxLines) break;
    } else {
      line = testLine;
    }
  }

  if (linesCount < maxLines && line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }

  return currentY;
}

/**
 * Helper to load an image onto canvas with CORS fallback
 */
function loadImageSafe(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Draw a star shape on canvas
 */
function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  fillColor: string
) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
}

/**
 * Renders a high-resolution 1080x1080 graphic for the testimonial on a canvas.
 */
export async function renderTestimonialGraphic(
  canvas: HTMLCanvasElement,
  testimonial: Testimonial
): Promise<void> {
  const size = 1080;
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const displayName = (testimonial.full_name || testimonial.name || 'Valued Client').trim();
  const role = (testimonial.role || '').trim();
  const company = (testimonial.company || '').trim();
  const rating = typeof testimonial.rating === 'number' ? testimonial.rating : 5;
  const quote = cleanQuote(testimonial.review || testimonial.quote || 'Outstanding partnership and innovative engineering.');
  const photoUrl = testimonial.photo_url || testimonial.image || testimonial.avatar || '';

  // 1. Deep Tech Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, size, size);
  bgGrad.addColorStop(0, '#05070B');
  bgGrad.addColorStop(0.5, '#0B0F19');
  bgGrad.addColorStop(1, '#07090E');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  // 2. Ambient Glowing Orbs
  const drawGlow = (x: number, y: number, radius: number, colorStart: string) => {
    const radial = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radial.addColorStop(0, colorStart);
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  drawGlow(180, 180, 320, 'rgba(56, 189, 248, 0.16)'); // Cyan glow top left
  drawGlow(900, 200, 300, 'rgba(99, 102, 241, 0.14)'); // Indigo glow top right
  drawGlow(540, 920, 380, 'rgba(168, 85, 247, 0.12)'); // Purple glow bottom

  // 3. Subtle grid pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  const gridSize = 45;
  for (let x = 0; x < size; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }
  for (let y = 0; y < size; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  // 4. Central Frosted Glass Card Container
  const pad = 64;
  const cardW = size - pad * 2;
  const cardH = size - pad * 2;
  const cardRadius = 36;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(pad, pad, cardW, cardH, cardRadius);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // Top header accent line
  const lineGrad = ctx.createLinearGradient(pad, pad, size - pad, pad);
  lineGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
  lineGrad.addColorStop(0.2, '#38bdf8');
  lineGrad.addColorStop(0.5, '#6366f1');
  lineGrad.addColorStop(0.8, '#a855f7');
  lineGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(pad + 60, pad);
  ctx.lineTo(size - pad - 60, pad);
  ctx.stroke();

  // 5. Header: PioneerX Labs Brand Bar
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Badge pill
  const badgeY = pad + 54;
  ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
  ctx.beginPath();
  ctx.roundRect(size / 2 - 130, badgeY - 16, 260, 32, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = '700 13px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.letterSpacing = '2px';
  ctx.fillText('VERIFIED CLIENT REVIEW', size / 2, badgeY);
  ctx.letterSpacing = '0px';

  // Brand Name
  ctx.font = '900 34px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('PIONEERX LABS', size / 2, badgeY + 48);

  // Decorative Quote Mark Icon
  ctx.font = 'italic 700 72px Georgia, serif';
  ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
  ctx.fillText('“', size / 2, badgeY + 115);

  // 6. Testimonial Quote Body
  ctx.fillStyle = '#F1F5F9';
  ctx.textAlign = 'center';

  // Dynamic font sizing based on quote length
  let quoteFontSize = 26;
  let lineHeight = 42;
  if (quote.length > 280) {
    quoteFontSize = 21;
    lineHeight = 34;
  } else if (quote.length > 180) {
    quoteFontSize = 23;
    lineHeight = 38;
  } else if (quote.length < 90) {
    quoteFontSize = 30;
    lineHeight = 48;
  }

  ctx.font = `italic 400 ${quoteFontSize}px system-ui, -apple-system, "Segoe UI", sans-serif`;
  const quoteStartY = badgeY + 160;
  const quoteMaxWidth = cardW - 120;
  const quoteEndY = wrapText(ctx, `“${quote}”`, size / 2, quoteStartY, quoteMaxWidth, lineHeight, 5);

  // 7. Star Ratings
  const starY = Math.max(quoteEndY + 28, 590);
  const totalStars = 5;
  const starSpacing = 36;
  const startStarX = size / 2 - ((totalStars - 1) * starSpacing) / 2;

  for (let s = 0; s < totalStars; s++) {
    const starX = startStarX + s * starSpacing;
    const isFilled = s < rating;
    drawStar(
      ctx,
      starX,
      starY,
      5,
      13,
      6.5,
      isFilled ? '#FBBF24' : 'rgba(255, 255, 255, 0.15)'
    );
  }

  // 8. Client Avatar / Initials
  const avatarY = starY + 80;
  const avatarRadius = 46;
  const avatarCenterX = size / 2;

  let loadedImg: HTMLImageElement | null = null;
  if (photoUrl) {
    loadedImg = await loadImageSafe(photoUrl);
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarY, avatarRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (loadedImg) {
    ctx.drawImage(
      loadedImg,
      avatarCenterX - avatarRadius,
      avatarY - avatarRadius,
      avatarRadius * 2,
      avatarRadius * 2
    );
  } else {
    // Elegant monogram fallback
    const grad = ctx.createLinearGradient(
      avatarCenterX - avatarRadius,
      avatarY - avatarRadius,
      avatarCenterX + avatarRadius,
      avatarY + avatarRadius
    );
    grad.addColorStop(0, '#0284c7');
    grad.addColorStop(1, '#6366f1');
    ctx.fillStyle = grad;
    ctx.fillRect(
      avatarCenterX - avatarRadius,
      avatarY - avatarRadius,
      avatarRadius * 2,
      avatarRadius * 2
    );

    const initials = displayName
      .split(' ')
      .filter(Boolean)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'PX';

    ctx.font = '700 32px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, avatarCenterX, avatarY);
  }
  ctx.restore();

  // Avatar cyan ring border
  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarY, avatarRadius + 3, 0, Math.PI * 2);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  // 9. Client Name
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '700 28px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(displayName, size / 2, avatarY + 70);

  // 10. Role & Company
  let roleCompanyText = '';
  if (role && company) {
    roleCompanyText = `${role} • ${company}`;
  } else if (role) {
    roleCompanyText = role;
  } else if (company) {
    roleCompanyText = company;
  }

  if (roleCompanyText) {
    ctx.font = '500 18px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(roleCompanyText, size / 2, avatarY + 100);
  }

  // 11. Footer Branding
  const footerY = size - pad - 42;

  // Subtle separator line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad + 80, footerY - 26);
  ctx.lineTo(size - pad - 80, footerY - 26);
  ctx.stroke();

  ctx.font = '600 17px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.letterSpacing = '1px';
  ctx.fillText('pioneerx-labs.vercel.app', size / 2, footerY);
  ctx.letterSpacing = '0px';

  ctx.font = '400 12px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('Youth-Led Technology & Innovation', size / 2, footerY + 22);
}

/**
 * Downloads a high-resolution 1080x1080 graphic of the testimonial as a PNG.
 */
export async function downloadTestimonialGraphic(
  testimonial: Testimonial
): Promise<void> {
  const canvas = document.createElement('canvas');
  await renderTestimonialGraphic(canvas, testimonial);

  const cleanName = (testimonial.full_name || testimonial.name || 'client')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-');

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `pioneerx-testimonial-${cleanName}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
