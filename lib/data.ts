import {
  PORTFOLIO_CATEGORIES,
  type ServiceItem,
  type MetricItem,
  type TestimonialItem,
  type WhyChooseItem,
  type ProjectItem,
  type DesignItem,
  type PortfolioCategory,
  type PortfolioItem,
} from './types';

export const PROFILE = {
  name: 'Francis Amoako',
  brand: 'GraceGate',
  role: 'UI/UX & Graphic Designer · Web & Mobile Developer · Motion Designer · Cybersecurity (CEH)',
  availability: 'Open to remote full-time, contract & freelance',
};

export const CONTACT = {
  email: 'gracefrancis0895@gmail.com',
  phone: '+233 55 405 7773',
  /** tel: link used by every call button */
  phoneHref: 'tel:+233554057773',
  whatsapp: 'https://wa.me/233554057773',
  location: 'Accra, Ghana',
  timezone: 'Remote (GMT)',
};

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'process', label: 'Process' },
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Discover', description: 'We agree on goals, audience, scope and timeline, and I map out exactly what will be delivered.' },
  { step: '02', title: 'Design', description: 'User flows, wireframes and high-fidelity visuals, or flyer and brand concepts, refined with your feedback.' },
  { step: '03', title: 'Build & Secure', description: 'Responsive websites, apps and motion assets, built with security in from day one and tested before launch.' },
  { step: '04', title: 'Launch & Support', description: 'Hand-over of final files or deployment of your product, with follow-up support, fixes and security checks.' },
];

export const STATS = [
  { value: 0, suffix: '', label: 'Portfolio pieces' }, // filled in from PORTFOLIO_ITEMS
  { value: 6, suffix: '', label: 'Services' },
  { value: 3, suffix: '', label: 'Certifications' },
  { value: 4, suffix: '+', label: 'Years in tech' },
];

export const HERO_DATA = {
  name: 'GraceGate',
  badge: 'Certified Ethical Hacker (CEHv11)',
  tagline: 'Designer · Developer · Motion Designer · Ethical Hacker',
  description:
    'I’m Francis Amoako, a KNUST Computer Science graduate and Certified Ethical Hacker. Through GraceGate I turn ideas into clean interfaces, fast websites, mobile apps and scroll-stopping visuals, with security built in from day one.',
};

export const METRICS_DATA: MetricItem[] = [
  { value: 'CEHv11', label: 'Certified ethical hacker' },
  { value: 'KNUST', label: 'BSc Computer Science' },
  { value: 'GMT', label: 'Remote · Accra, Ghana' },
];

export const TRUSTED_BRANDS = [
  'Figma',
  'Next.js',
  'React',
  'JavaScript',
  'MongoDB',
  'GitHub',
  'Kali Linux',
  'Burp Suite',
  'Wireshark',
  'Nmap',
  'Python',
  'AWS',
];

/** The six services, in the order they appear on the CV ("What I deliver"). */
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    iconName: 'PenTool',
    description: 'User flows, wireframes and high-fidelity prototypes for web and mobile, designed around how real people use your product.',
    features: [
      'User flows and information architecture',
      'Wireframes and interactive Figma prototypes',
      'High-fidelity interfaces for web and mobile',
      'Design systems and reusable components',
    ],
  },
  {
    id: 'websites',
    title: 'Website Development',
    iconName: 'Globe',
    description: 'Responsive business sites, landing pages and e-commerce stores that load fast, look sharp and are secure from launch.',
    features: [
      'Business websites and landing pages',
      'E-commerce stores (Next.js / React)',
      'Responsive on every screen size',
      'Security-hardened forms, auth and hosting',
    ],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile App Development',
    iconName: 'Smartphone',
    description: 'App interfaces and builds focused on smooth, intuitive experiences, from first sketch to a working product.',
    features: [
      'App UI design and prototyping',
      'Clean, intuitive navigation and flows',
      'API and database integration (MongoDB)',
      'Secure authentication and data handling',
    ],
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design & Branding',
    iconName: 'Palette',
    description: 'Flyers, posters, social media creatives, logos and brand assets that make a business instantly recognisable.',
    features: [
      'Event, menu and campaign flyers & posters',
      'Social media creatives',
      'Logo design and brand identity systems',
      'Print- and digital-ready files',
    ],
  },
  {
    id: 'motion',
    title: 'Motion Graphics',
    iconName: 'Clapperboard',
    description: 'Animated promos, social videos, logo animations and ad creatives that stop the scroll.',
    features: [
      'Logo animations and reveals',
      'Animated promos and ad creatives',
      'Short-form social videos',
      'Formats sized for every platform',
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    iconName: 'ShieldCheck',
    description: 'Penetration testing, vulnerability assessments and security hardening to find weaknesses before attackers do.',
    features: [
      'Web application penetration testing',
      'Vulnerability assessment & remediation guidance',
      'Network security and monitoring',
      'Log analysis and security hardening',
    ],
  },
];

export const EXPERIENCE = [
  {
    role: 'Freelance Designer & Developer',
    org: 'GraceGate · Self-employed',
    period: 'Independent · Remote',
    points: [
      'Design flyers, posters, social media graphics and motion graphics for businesses and events.',
      'Design and build responsive websites and mobile app interfaces, from UI/UX concept to launch.',
      'Building a mobile-responsive e-commerce website (Next.js) for GraceGate Store, an electronics accessories retailer.',
    ],
  },
  {
    role: 'Cybersecurity & Software Support (National Service)',
    org: 'CEQA Foods and Beverages Ghana Ltd. (Pizzaman–Chickenman)',
    period: '2023 – Present',
    points: [
      'Supported penetration testing and vulnerability identification across internal systems.',
      'Secured web applications through testing and remediation support.',
      'Contributed to software development and web system maintenance with security in mind.',
      'Worked with IT teams to improve reliability and reduce exposure to common attack vectors.',
    ],
  },
  {
    role: 'Networking Intern',
    org: 'University Information Technology Services (UITS), KNUST',
    period: '2022 – 2023',
    points: [
      'Configured and maintained enterprise routers, switches and firewalls.',
      'Monitored network traffic to detect anomalies and potential vulnerabilities.',
      'Documented network configurations, security procedures and troubleshooting guides.',
    ],
  },
];

export const CERTIFICATIONS = [
  { title: 'Certified Ethical Hacker (CEHv11)', issuer: 'EC-Council', year: '2022', detail: 'ID ECC6927514038' },
  { title: 'Cybersecurity and Mobility', issuer: 'Kennesaw State University (Coursera)', year: '2020' },
  { title: 'AWS Cloud Computing', issuer: 'ALX Africa' },
];

export const EDUCATION = {
  degree: 'BSc Computer Science',
  school: 'Kwame Nkrumah University of Science and Technology (KNUST)',
  year: '2023',
};

export const ACTIVITIES = [
  'SCISA DigiTech Festival – Google Masterclass (2021)',
  'Code Afrique Program – Computing & Science Track (2019)',
];

export const WHY_CHOOSE_DATA: WhyChooseItem[] = [
  {
    iconName: 'Layers',
    title: 'Design, build and secure in one place',
    description: 'One person takes your idea from concept to interface to launch, so nothing gets lost between a designer, a developer and a security consultant.',
  },
  {
    iconName: 'Shield',
    title: 'Certified Ethical Hacker (CEHv11)',
    description: 'EC-Council certified since 2022. The products I build are not just good-looking, but robust and safe.',
  },
  {
    iconName: 'Cpu',
    title: 'KNUST Computer Science',
    description: 'A BSc in Computer Science from KNUST, backed by hands-on networking and security work at UITS and in national service.',
  },
  {
    iconName: 'Activity',
    title: 'Scroll-stopping visuals',
    description: 'Flyers, brand identities and motion graphics designed to grab attention and make a business instantly recognisable.',
  },
  {
    iconName: 'Code',
    title: 'Modern, responsive builds',
    description: 'Fast websites and app interfaces in Next.js and React that work beautifully on every screen size.',
  },
  {
    iconName: 'CheckCircle',
    title: 'Reliable and remote-ready',
    description: 'Fast turnaround and comfortable working remotely across time zones from Accra, Ghana (GMT).',
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't1',
    rating: 5,
    text: "Grace Francis supported our vulnerability assessment activities and assisted in configuring active enterprise routing infrastructure during our security simulation cycle. Exceptional, structured work ethic!",
    author: 'K. Osei-Tutu',
    role: 'Senior Infrastructure Lead · KNUST IT Center',
    initials: 'KO'
  },
  {
    id: 't2',
    rating: 5,
    text: "Contributed highly reliable documentation, network procedures, and traffic analyses to flag security vulnerabilities. Gained valuable exposure to institutional IT security standards.",
    author: 'Enterprise Mentor',
    role: 'SOC Team Director · Network Operations Ghana',
    initials: 'EM'
  },
  {
    id: 't3',
    rating: 5,
    text: "Demonstrated strong cloud hygiene foundations and excellent secure development reviews over our ALX Africa project audits. Enthusiastic about security compliance standards.",
    author: 'ALX Cloud Lead',
    role: 'Foundational Cloud Program Evaluator',
    initials: 'AL'
  }
];

/** Development and security projects (design work lives in DESIGN_DATA). */
export const PORTFOLIO_DATA: ProjectItem[] = [
  {
    id: 'w1',
    title: 'GraceGate Store — E-commerce Website',
    client: 'GraceGate Store',
    category: 'Websites & Apps',
    tag: 'E-commerce · In progress',
    description: 'A mobile-responsive e-commerce website for GraceGate Store, an electronics accessories retailer, built with Next.js from UI/UX concept through to launch.',
    technologies: ['Next.js', 'React', 'Responsive Design'],
    src: '/projects/gracegate-store-website.webp',
    width: 1200,
    height: 900,
    fit: 'cover',
  },
  {
    id: 'w2',
    title: 'GraceGate Portfolio Website',
    client: 'GraceGate',
    category: 'Websites & Apps',
    tag: 'Website',
    description: 'This site: a Next.js portfolio with scroll-driven 3D animation, a filterable portfolio, motion work and a secure project request form.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Motion'],
    src: '/projects/gracegate-portfolio-site.webp',
    width: 1440,
    height: 900,
    fit: 'cover',
  },
  {
    id: 's1',
    title: 'Web Application Security Testing & Remediation',
    client: 'CEQA Foods and Beverages Ghana Ltd.',
    category: 'Cybersecurity',
    tag: 'Penetration Testing',
    description: 'National service work supporting penetration testing and vulnerability identification across internal systems, and securing web applications through testing and remediation support.',
    technologies: ['Burp Suite', 'Nmap', 'Kali Linux'],
    src: '/projects/offensive-security.png',
    width: 1200,
    height: 896,
    fit: 'cover',
  },
  {
    id: 's2',
    title: 'Enterprise Network Configuration & Monitoring',
    client: 'UITS, KNUST',
    category: 'Cybersecurity',
    tag: 'Network Security',
    description: 'Configured and maintained enterprise routers, switches and firewalls, monitored traffic for anomalies and documented configurations, security procedures and troubleshooting guides.',
    technologies: ['TCP/IP', 'DNS', 'DHCP', 'Wireshark'],
    src: '/projects/infra-security.png',
    width: 1200,
    height: 896,
    fit: 'cover',
  },
  {
    id: 's3',
    title: 'Threat-Analysis Simulations',
    client: 'Cyber Defense Unit workflows',
    category: 'Cybersecurity',
    tag: 'Defensive Security',
    description: 'Ran cybersecurity threat-analysis simulations aligned with Cyber Defense Unit workflows and CISA advisories, and wrote clear remediation guidance for reported vulnerabilities.',
    technologies: ['CISA Advisories', 'Wireshark', 'Log Analysis'],
    src: '/projects/defensive-security.png',
    width: 1200,
    height: 896,
    fit: 'cover',
  },
  {
    id: 's4',
    title: 'Ethical Brute-Force Decryption Script',
    client: 'KNUST · Academic project',
    category: 'Cybersecurity',
    tag: 'Python Security',
    description: 'A Python security script demonstrating ethical brute-force decryption concepts, showing why strong, high-entropy passwords matter.',
    technologies: ['Python', 'Bash', 'Git'],
    src: '/projects/python-brute-force-script.webp',
    width: 1200,
    height: 896,
    fit: 'cover',
  },
];

export const DESIGN_DATA: DesignItem[] = [
  {
    id: 'd1',
    title: 'Good Food, Good Vibes — Campaign Flyer',
    client: 'Chez Amis Bar & Grill',
    type: 'Flyer',
    description: 'Promotional flyer featuring the brand ambassadors, opening hours, ordering lines and location, built around a bold diamond photo grid in the brand’s green and red.',
    src: '/designs/chez-amis-flyer-celebrity.webp',
    width: 1414,
    height: 2000,
    fit: 'cover',
  },
  {
    id: 'd2',
    title: 'Bite Into Happiness — Menu Flyer',
    client: 'Chez Amis Bar & Grill',
    type: 'Flyer',
    description: 'Menu-led variation of the campaign highlighting burgers, shawarma, hotdogs and sandwiches with food photography and clear calls to order.',
    src: '/designs/chez-amis-flyer-menu.webp',
    width: 1414,
    height: 2000,
    fit: 'cover',
  },
  {
    id: 'd3',
    title: 'Wynprint Media Logo',
    client: 'Wynprint Media',
    type: 'Logo',
    description: 'App-style wordmark for a print and media studio. The “W” is built from CMYK-coloured strokes, nodding to the print process.',
    src: '/designs/wynprint-media-logo.webp',
    width: 1886,
    height: 687,
    fit: 'contain',
  },
  {
    id: 'd4',
    title: 'GraceGate Store Logo',
    client: 'GraceGate Store',
    type: 'Logo',
    description: 'Retail extension of the GraceGate identity, pairing the GG monogram with a shopping-bag motif.',
    src: '/designs/gracegate-store-logo.webp',
    width: 1254,
    height: 1254,
    fit: 'contain',
  },
  {
    id: 'd5',
    title: 'MTCrestmark Brand Identity',
    client: 'MTCrestmark Enterprise',
    type: 'Brand identity',
    description: 'Complete logo system: horizontal and stacked lockups, circular seals and an app icon, each in light and dark green variants.',
    src: '/designs/mtcrestmark-brand-sheet.webp',
    width: 1672,
    height: 692,
    fit: 'contain',
  },
  {
    id: 'd6',
    title: 'Drop-Ball Logo Reveal',
    client: 'GraceGate Technologies',
    type: 'Motion graphic',
    description: 'Animated logo sting: a glossy brand-purple sphere drops, bounces with a ripple and morphs into the GraceGate Technologies logo and its tagline.',
    src: '/designs/gracegate-technologies-logo-motion-poster.webp',
    video: '/designs/gracegate-technologies-logo-motion.mp4',
    width: 1080,
    height: 1080,
    fit: 'cover',
  },
];

/* ------------------------------------------------------------------ */
/* Unified portfolio: design work + projects under one set of categories */

const DESIGN_META: Record<string, { category: PortfolioCategory; tag: string }> = {
  d1: { category: 'Flyers', tag: 'Campaign Flyer' },
  d2: { category: 'Flyers', tag: 'Menu Flyer' },
  d3: { category: 'Logos & Branding', tag: 'Logo Design' },
  d4: { category: 'Logos & Branding', tag: 'Logo Design' },
  d5: { category: 'Logos & Branding', tag: 'Brand Identity' },
  d6: { category: 'Motion Graphics', tag: 'Logo Animation' },
};

const ALL_ITEMS: PortfolioItem[] = [
  ...DESIGN_DATA.map((d) => ({
    id: d.id,
    title: d.title,
    client: d.client,
    description: d.description,
    src: d.src,
    video: d.video,
    width: d.width,
    height: d.height,
    fit: d.fit,
    ...DESIGN_META[d.id],
  })),
  ...PORTFOLIO_DATA,
];

/** Sorted in category order: Flyers, Logos & Branding, Websites & Apps, Motion Graphics, Cybersecurity. */
export const PORTFOLIO_ITEMS: PortfolioItem[] = PORTFOLIO_CATEGORIES.flatMap((c) =>
  ALL_ITEMS.filter((i) => i.category === c),
);

/** Which request-form service each category maps to. */
export const CATEGORY_SERVICE: Record<PortfolioCategory, string> = {
  Flyers: 'Graphic Design & Branding',
  'Logos & Branding': 'Graphic Design & Branding',
  'Websites & Apps': 'Website Development',
  'Motion Graphics': 'Motion Graphics',
  Cybersecurity: 'Cybersecurity',
};
