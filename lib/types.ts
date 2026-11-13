export interface ServiceItem {
  id: string;
  title: string;
  category: 'web-design' | 'digital-marketing';
  iconName: string; // Dynamic icon mapper using lucide-react
  description: string;
  isPopular?: boolean;
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

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: 'Offensive Security' | 'Defensive Security' | 'Infrastructure Security' | 'Web/Mobile Apps' | 'UX/UI & Flyers' | 'Web Design' | 'Digital Marketing';
  technologies: string[];
  description: string;
  imageColor: string; // Gradient color for project thumbnail mockup card
  link?: string;
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
  width: number;
  height: number;
  /** 'contain' places the artwork on a light canvas (logos) */
  fit: 'cover' | 'contain';
  technologies?: string[];
}
