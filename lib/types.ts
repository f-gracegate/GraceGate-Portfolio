export interface ServiceItem {
  id: string;
  title: string;
  iconName: string; // lucide-react icon name
  description: string;
  features: string[];
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface TestimonialItem {
  id: string;
  rating: number;
  text: string;
  author: string;
  role: string;
  initials: string;
}

export interface TrustPartner {
  name: string;
}

export interface WhyChooseItem {
  iconName: string;
  title: string;
  description: string;
}



export interface DesignItem {
  id: string;
  title: string;
  client: string;
  type: 'Flyer' | 'Logo' | 'Brand identity' | 'Motion graphic';
  description: string;
  /** Image, or the poster frame when `video` is set */
  src: string;
  /** Optional MP4 for motion work */
  video?: string;
  /** True when the video has a soundtrack */
  hasAudio?: boolean;
  width: number;
  height: number;
  /** Logos sit on a light canvas; flyers fill their frame. */
  fit: 'cover' | 'contain';
}

export const PORTFOLIO_CATEGORIES = [
  'Flyers',
  'Logos & Branding',
  'Websites & Apps',
  'Motion Graphics',
  'Cybersecurity',
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

/** Unified entry shown in the portfolio grid and lightbox. */
export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  /** Finer-grained label shown on the card, e.g. "Menu Flyer" */
  tag: string;
  description: string;
  /** Image, or poster frame when `video` is set */
  src: string;
  video?: string;
  hasAudio?: boolean;
  width: number;
  height: number;
  /** 'contain' places the artwork on a light canvas (logos) */
  fit: 'cover' | 'contain';
  technologies?: string[];
}

/** A development or security project; same shape as a portfolio entry. */
export type ProjectItem = PortfolioItem;
