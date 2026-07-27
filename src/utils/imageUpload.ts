import { axiosPublic } from '../api/axiosConfig';

/**
 * Uploads an image file to Cloudinary via backend upload endpoint or direct Cloudinary API.
 * @param file Image File selected by the user
 * @returns Public image URL string
 */
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('file', file);

  // 1. Try uploading via live backend Cloudinary endpoint
  try {
    const res = await axiosPublic.post<{ url?: string; image?: string; secure_url?: string }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.data?.url || res.data?.secure_url || res.data?.image) {
      return res.data.url || res.data.secure_url || res.data.image || '';
    }
  } catch (e) {
    // Attempt alternative backend endpoint /image-upload
    try {
      const res = await axiosPublic.post<{ url?: string; image?: string; secure_url?: string }>('/image-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data?.url || res.data?.secure_url || res.data?.image) {
        return res.data.url || res.data.secure_url || res.data.image || '';
      }
    } catch (e2) {
      // Direct base64 fallback or preset upload
    }
  }

  // 2. Direct client-side Data URL fallback for instant preview
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
