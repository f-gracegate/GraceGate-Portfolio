/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

