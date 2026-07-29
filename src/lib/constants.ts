const basePath = process.env.NODE_ENV === 'production' ? '/gaurangi-website' : '';

export const getImageUrl = (url?: string): string => {
  if (!url) return `${basePath}/images/model-dummy.jpg`;
  
  // Return absolute HTTP(S) URLs or Data URLs as-is
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  
  // If URL already includes /gaurangi-website, return as-is
  if (url.startsWith('/gaurangi-website/')) {
    return url;
  }
  
  // Prepend basePath for relative paths
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${basePath}${cleanPath}`;
};

export const DUMMY_IMAGE = getImageUrl('/images/model-dummy.jpg');
