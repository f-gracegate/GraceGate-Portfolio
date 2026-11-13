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

export const CONTACT = {
  email: 'gracefrancis0895@gmail.com',
  phone: '+233 55 405 7773',
  /** tel: link used by every call button */
  phoneHref: 'tel:+233554057773',
  whatsapp: 'https://wa.me/233554057773',
  location: 'Accra, Ghana',
};

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Reviews' },
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Discover', description: 'Scope the engagement, map assets and agree on rules of engagement, goals and success criteria.' },
  { step: '02', title: 'Assess', description: 'Reconnaissance, scanning and hands-on testing against real-world attack paths and OWASP benchmarks.' },
  { step: '03', title: 'Build & Harden', description: 'Ship secure products or remediate findings: configuration hardening, secure code and access control.' },
  { step: '04', title: 'Report & Support', description: 'Clear, prioritised reporting with CVSS scoring, remediation guides and follow-up verification.' },
];

export const STATS = [
  { value: 16, suffix: '', label: 'Portfolio pieces' },
  { value: 6, suffix: '', label: 'Core service lines' },
  { value: 5, suffix: '', label: 'Disciplines' },
  { value: 24, suffix: 'h', label: 'Response time' },
];


export const HERO_DATA = {
  name: 'GraceGate',
  badge: 'Certified Ethical Hacker (CEHv11)',
  tagline: 'Cybersecurity Analyst & CS Specialist',
  description: 'Certified ethical hacker and KNUST computer science graduate. I test and harden systems, build secure websites and apps, and design the brands that represent them — all under one gate.',
  ribbon: 'Security Assessment • Penetration Testing • SOC Analyst Support • KNUST Alumni 2023'
};

export const METRICS_DATA: MetricItem[] = [
  { value: 'CEHv11', label: 'CERTIFIED ETHICAL HACKER' },
  { value: 'KNUST', label: 'BSc COMPUTER SCIENCE' },
  { value: '2023', label: 'GRADUATE YEAR' }
];

export const TRUSTED_BRANDS = [
  'Kali Linux',
  'Wireshark',
  'Nmap',
  'Burp Suite',
  'AWS Cloud',
  'Python Security',
  'EC-Council',
  'GitHub',
  'Linux Bash'
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'pentest-eth',
    category: 'web-design', // Keeping Category 'web-design' mapped internally or flexible
    title: 'Penetration Testing & Ethical Hacking',
    iconName: 'ShieldAlert',
    description: 'Systematic reconnaissance and verification of logical security controls across web applications and enterprise network perimeters to map exploits.',
    features: [
      'OWASP Top 10 vulnerability assessments',
      'Python-based custom exploit & decrypter scripts',
      'Kali Linux suite automated auditing',
      'Secure web system remediation workflows',
      'Detailed vulnerability identification telemetry'
    ]
  },
  {
    id: 'vuln-assess',
    category: 'web-design',
    title: 'Vulnerability Assessment & Threat Analysis',
    iconName: 'Activity',
    description: 'Scanning, prioritizing, and documenting technical risk indexes to safeguard critical applications against immediate attack vectors.',
    features: [
      'Asset discovery & topology intelligence',
      'CISA advisory & Cyber Defense risk mapping',
      'Remediation guide formulation for dev teams',
      'Automated and manual vulnerability scoring',
      'Security posture gap analysis briefs'
    ]
  },
  {
    id: 'web-app-creation',
    category: 'web-design',
    title: 'Web & Mobile App Creation',
    iconName: 'Globe',
    description: 'Building ultra-fast, robust, and highly secure custom websites and responsive mobile applications with seamless user flows.',
    features: [
      'Custom React, Next.js, and Vite web system builds',
      'Cross-platform mobile apps (Android & iOS) via Flutter',
      'Secure authentication, OAuth integration, and API engineering',
      'Clean database schemas and state synchronization',
      'Performance-tuned frontend with elegant micro-interactions'
    ]
  },
  {
    id: 'net-infra-sec',
    category: 'digital-marketing', // Mapping under second tab or similar
    title: 'Enterprise Network & Infrastructure Security',
    iconName: 'Cpu',
    description: 'Configuring and monitoring routers, switches, and firewalls to ensure high-uptime availability and defense-in-depth routing protection.',
    features: [
      'Enterprise Router & Switch policy audits',
      'TCP/IP, DNS, and DHCP configuration hardening',
      'Network topology tracing and documentation',
      'Firewall rule management & access-lists',
      'Intrusion posture assessment support'
    ]
  },
  {
    id: 'sec-mon-incident',
    category: 'digital-marketing',
    title: 'Log Analysis & Incident Identification',
    iconName: 'Search',
    description: 'Monitoring network traffic anomalies using active analyzers to pinpoint zero-day exploits and abnormal transmission trends early.',
    features: [
      'Real-time Wireshark packet capture analysis',
      'Log generation, normalization, & monitoring',
      'Incident prioritization based on CVSS metrics',
      'Host-based and network intrusion scans',
      'Systematic log audit reports'
    ]
  },
  {
    id: 'ui-ux-flyers',
    category: 'digital-marketing',
    title: 'Graphic Design, Branding & Motion',
    iconName: 'Palette',
    description: 'Flyers, logos, complete brand identities and animated logo reveals that make a business instantly recognisable, in print and on screen.',
    features: [
      'Campaign, event and menu flyers (print & social-ready)',
      'Logo design and full brand identity systems',
      'Motion graphics and animated logo reveals',
      'UI/UX design: Figma wireframes and prototypes',
      'Multi-format templates and brand kits'
    ]
  }
];

export const WHY_CHOOSE_DATA: WhyChooseItem[] = [
  {
    iconName: 'Shield',
    title: 'Certified Competence (CEHv11)',
    description: 'Holding professional Ethical Hacker certification issued by the EC-Council, ensuring an in-depth offensive toolkit.'
  },
  {
    iconName: 'Cpu',
    title: 'KNUST Academic Foundations',
    description: 'Theoretical and practical background with a BSc of Computer Science degree from Ghana’s prestigious KNUST.'
  },
  {
    iconName: 'Activity',
    title: 'Offensive & Defensive Balance',
    description: 'Skillful in both offensive vulnerability assessments and defensive infrastructure policy building, minimizing blind spots.'
  },
  {
    iconName: 'Code',
    title: 'Python & Bash Automation',
    description: 'Leveraging custom administrative tools and socket scripts to automate repetitive system scans and data lookups.'
  },
  {
    iconName: 'CheckCircle',
    title: 'Actionable Threat Mitigation',
    description: 'Not just listing abstract alerts, but drafting precise guides to help developer teams fix coding or network weaknesses.'
  },
  {
    iconName: 'Layers',
    title: 'Multi-Ops Environment Exposure',
    description: 'Proficient in setting up secure environments on Linux (Ubuntu, Kali Linux), Windows Server, and AWS Cloud foundations.'
  }
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

export const PORTFOLIO_DATA: ProjectItem[] = [
  {
    id: 'p1',
    title: 'CISA Advisory Alignment Sandbox',
    client: 'Cyber Def Unit Simulations',
    category: 'Defensive Security',
    technologies: ['Nmap', 'CISA Advisories', 'Wireshark'],
    description: 'Conducted cybersecurity threat analysis simulations aligned with typical SOC team workflows. Outlined specific threat levels, scanned vulnerabilities, and documented defensive mitigations.',
    imageColor: 'from-slate-800 via-indigo-950 to-blue-950'
  },
  {
    id: 'p2',
    title: 'Ethical Brute-Force Decryption Script',
    client: 'KNUST Cryptography Laboratory',
    category: 'Offensive Security',
    technologies: ['Python', 'Bash', 'Git'],
    description: 'Developed a terminal security script demonstrating cryptographic decoding routines, simulating credential brute-forcing to showcase the importance of complex password entropy.',
    imageColor: 'from-teal-950 via-emerald-950 to-emerald-800'
  },
  {
    id: 'p3',
    title: 'Web Application Vulnerability Review',
    client: 'Enterprise PenTesting Audit',
    category: 'Offensive Security',
    technologies: ['Burp Suite', 'Nmap', 'Kali Linux Tooling'],
    description: 'Discovered web app logical flaws and configuration weaknesses. Provided full remediation recommendations to secure web systems and prevent database and API exploitation.',
    imageColor: 'from-purple-950 via-rose-950 to-zinc-900'
  },
  {
    id: 'p4',
    title: 'Router & Firewall Configuration Map',
    client: 'Infrastructure Lab Series',
    category: 'Infrastructure Security',
    technologies: ['TCP/IP', 'Firewalls', 'Network Documentation'],
    description: 'Assisted in configuring and validating secure networking setups (routers, switches, firewalls) and crafted step-by-step documentation for institutional IT standard operations.',
    imageColor: 'from-blue-900 via-slate-900 to-amber-950'
  },
  {
    id: 'p5',
    title: 'ALX AWS Foundational IAM Audit',
    client: 'AWS Foundational Program',
    category: 'Infrastructure Security',
    technologies: ['AWS', 'IAM Rules', 'Bash Scripting'],
    description: 'Built minimal secure cloud baseline architectures, configured permission bounds via IAM least-privilege protocols, and hardened cloud access groups securely.',
    imageColor: 'from-orange-950 via-amber-950 to-red-950'
  },
  {
    id: 'p6',
    title: 'Hardened Linux Lab Server Setup',
    client: 'Lab Admin Series',
    category: 'Infrastructure Security',
    technologies: ['Linux (Ubuntu)', 'SSH Keys', 'MongoDB Audit'],
    description: 'Successfully deployed and hardened a localized database & web server, implementing custom iptables rules, strict SSH keys login constraints, and limited guest privileges.',
    imageColor: 'from-cyan-950 via-slate-950 to-teal-950'
  },
  {
    id: 'p7',
    title: 'Secure FinTech Mobile Wallet App',
    client: 'Apex SecurePay Solutions',
    category: 'Web/Mobile Apps',
    technologies: ['Flutter', 'React', 'AWS', 'IAM Rules'],
    description: 'Designed and engineered a cross-platform secure mobile wallet application featuring biometric authentication, full session state protections, and customized secure API gateways.',
    imageColor: 'from-blue-950 via-purple-950 to-indigo-950'
  },
  {
    id: 'p8',
    title: 'Corporate Web System & Custom CMS',
    client: 'KNUST Tech Incubator Hub',
    category: 'Web/Mobile Apps',
    technologies: ['React', 'Next.js', 'Linux', 'Git'],
    description: 'Engineered a highly responsive, high-performance web platform and customized secure workspace server, executing fully responsive UI layouts built on top of robust authentication layers.',
    imageColor: 'from-indigo-950 via-slate-900 to-emerald-950'
  },
  {
    id: 'p9',
    title: 'Cybersecurity Summit Flyer & Assets',
    client: 'Annual Ghana Ethical Hacking Conference',
    category: 'UX/UI & Flyers',
    technologies: ['Figma', 'Photoshop', 'Flyers', 'Branding'],
    description: 'Crafted the entire high-fidelity user experience interactive layout and striking promotional flyers/marketing posters to direct public ticketing, attracting over 1,200+ delegates.',
    imageColor: 'from-orange-950 via-rose-950 to-purple-950'
  },
  {
    id: 'p10',
    title: 'SaaS Dashboard Interface & Flyers',
    client: 'SentryGuard Analytics Platform',
    category: 'UX/UI & Flyers',
    technologies: ['Figma', 'Flyers', 'Branding', 'React'],
    description: 'Designed the complete responsive system interface and promotional media assets/flyers to optimize SaaS onboarding, achieving a structured flow that reduced conversion drop-offs.',
    imageColor: 'from-teal-950 via-neutral-900 to-indigo-950'
  }
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

const PROJECT_META: Record<string, { category: PortfolioCategory; tag: string; src: string }> = {
  p1: { category: 'Cybersecurity', tag: 'Defensive Security', src: '/projects/defensive-security.png' },
  p2: { category: 'Cybersecurity', tag: 'Offensive Security', src: '/projects/offensive-security.png' },
  p3: { category: 'Cybersecurity', tag: 'Offensive Security', src: '/projects/offensive-security.png' },
  p4: { category: 'Cybersecurity', tag: 'Infrastructure Security', src: '/projects/infra-security.png' },
  p5: { category: 'Cybersecurity', tag: 'Cloud Security', src: '/projects/infra-security.png' },
  p6: { category: 'Cybersecurity', tag: 'Infrastructure Security', src: '/projects/infra-security.png' },
  p7: { category: 'Websites & Apps', tag: 'Mobile App', src: '/projects/web-mobile-apps.png' },
  p8: { category: 'Websites & Apps', tag: 'Web Platform', src: '/projects/web-mobile-apps.png' },
  p9: { category: 'Flyers', tag: 'Event Flyer', src: '/projects/ux-ui-flyers.png' },
  p10: { category: 'Websites & Apps', tag: 'UI/UX Design', src: '/projects/ux-ui-flyers.png' },
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
  ...PORTFOLIO_DATA.map((p) => ({
    id: p.id,
    title: p.title,
    client: p.client,
    description: p.description,
    technologies: p.technologies,
    width: 1200,
    height: 896,
    fit: 'cover' as const,
    ...PROJECT_META[p.id],
  })),
];

/** Sorted in category order: Flyers, Logos & Branding, Websites & Apps, Motion Graphics, Cybersecurity. */
export const PORTFOLIO_ITEMS: PortfolioItem[] = PORTFOLIO_CATEGORIES.flatMap((c) =>
  ALL_ITEMS.filter((i) => i.category === c),
);

/** Which request-form service each category maps to. */
export const CATEGORY_SERVICE: Record<PortfolioCategory, string> = {
  Flyers: 'Graphic Design, Branding & Motion',
  'Logos & Branding': 'Graphic Design, Branding & Motion',
  'Websites & Apps': 'Web & Mobile App Creation',
  'Motion Graphics': 'Graphic Design, Branding & Motion',
  Cybersecurity: 'Penetration Testing & Ethical Hacking',
};
