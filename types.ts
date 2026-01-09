
export interface Program {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption: string;
  description?: string;
  additionalMedia?: {
    type: 'image' | 'video';
    url: string;
  }[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
