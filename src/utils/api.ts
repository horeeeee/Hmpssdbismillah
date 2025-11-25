// Mock API utilities for file uploads and data management
// In production, replace these with real API calls

export const uploadAPI = {
  // Upload file (document, image, video)
  file: async (file: File): Promise<{ success: boolean; url: string; message?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate file upload
        const url = URL.createObjectURL(file);
        resolve({
          success: true,
          url: url,
        });
      }, 1500);
    });
  },

  // Upload video to video podcast
  video: async (file: File, metadata: any): Promise<{ success: boolean; id: string; url: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        resolve({
          success: true,
          id: `video_${Date.now()}`,
          url: url,
        });
      }, 2000);
    });
  },

  // Upload photo to gallery
  photo: async (file: File, metadata: any): Promise<{ success: boolean; id: string; url: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        resolve({
          success: true,
          id: `photo_${Date.now()}`,
          url: url,
        });
      }, 1500);
    });
  },
};

// Validate file size
export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

// Validate file type
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some(type => file.type.includes(type) || file.name.toLowerCase().endsWith(type));
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
