export interface Tag {
  id: string;
  slug: string;
  name: string;
  icon?: string;
}

export interface Character {
  id: string;
  slug: string;
  name: string;
  age: number;
  avatarUrl: string;
  tags: string[];
  synopsis: string;
  nsfw: boolean;
  premium?: boolean;
  hasVideo?: boolean;
  stats: {
    likes: number;
    comments: number;
    views: string;
  };
}

export interface Creator {
  id: string;
  handle: string;
  avatarUrl: string;
  followers: number;
  characters: number;
  score: string;
}

export interface User {
  id: string;
  displayName: string;
  plan: 'free' | 'deluxe' | 'elite';
}

export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}