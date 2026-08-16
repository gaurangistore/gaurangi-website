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

export interface TechniqueMeta {
  id: string;
  name: string;
  tag: string;
}

export const TECHNIQUES: { id: string; name: string; tag: string }[] = [
  { id: 'floral-vine', name: 'Floral Vine', tag: 'Suit Sets' },
  { id: 'cutwork', name: 'Cutwork', tag: 'Dupattas' },
  { id: 'floral-wreath', name: 'Floral Wreath', tag: 'Home & Bedding' },
  { id: 'beaded-trail', name: 'Beaded Trail', tag: 'Suit Sets' },
  { id: 'paisley-cutwork', name: 'Paisley Cutwork', tag: 'Dupattas' },
];

export const getTechniqueName = (id?: string): string => {
  if (!id) return '';
  const found = TECHNIQUES.find((t) => t.id === id);
  return found ? found.name : id;
};

export const getTechniqueTag = (id?: string): string => {
  if (!id) return '';
  const found = TECHNIQUES.find((t) => t.id === id);
  return found ? found.tag : '';
};

export const CATEGORY_FILTERS = ['All', 'Suit Sets', 'Dupattas', 'Home & Bedding'];
