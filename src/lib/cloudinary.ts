const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

export const isCloudinaryConfigured = Boolean(
  cloudName &&
  !cloudName.includes('your-') &&
  uploadPreset &&
  !uploadPreset.includes('your-')
);


export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
];

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/** Validate uploaded image file format and size */
export function validateImageFile(file: File): FileValidationResult {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  // Check file type
  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Image must be JPG, JPEG, PNG, or WEBP format.',
    };
  }

  // Check size (5MB max)
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `Image must be smaller than 5MB. Selected file is ${sizeInMB}MB.`,
    };
  }

  return { valid: true };
}

/**
 * Upload profile photo to Cloudinary
 * Returns secure image URL from Cloudinary or base64 fallback if not configured
 */
export async function uploadToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ success: boolean; url?: string; error?: string }> {
  // Validate file
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  // If Cloudinary environment variables are present, upload via REST API
  if (isCloudinaryConfigured) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'pioneerx-labs/testimonials');

      const xhr = new XMLHttpRequest();
      const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      return new Promise((resolve) => {
        xhr.open('POST', endpoint, true);

        if (onProgress) {
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const percent = Math.round((e.loaded / e.total) * 100);
              onProgress(percent);
            }
          };
        }

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            // Apply automatic format & quality transformation if available
            const secureUrl = data.secure_url || data.url;
            resolve({ success: true, url: secureUrl });
          } else {
            try {
              const errData = JSON.parse(xhr.responseText);
              resolve({
                success: false,
                error: errData.error?.message || 'Cloudinary upload failed.',
              });
            } catch {
              resolve({ success: false, error: 'Failed to upload image to Cloudinary.' });
            }
          }
        };

        xhr.onerror = () => {
          resolve({ success: false, error: 'Network error during image upload.' });
        };

        xhr.send(formData);
      });
    } catch (err: any) {
      return { success: false, error: err.message || 'Image upload failed.' };
    }
  }

  // Fallback: Convert to Data URL base64 for local dev preview when Cloudinary env vars are missing
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ success: true, url: reader.result as string });
    };
    reader.onerror = () => {
      resolve({ success: false, error: 'Failed to read image file.' });
    };
    reader.readAsDataURL(file);
  });
}
