/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, MetricItem, TestimonialItem, WhyChooseItem, ProjectItem } from './types';

export const HERO_DATA = {
  name: 'GraceGate',
  badge: 'Certified Ethical Hacker (CEHv11)',
  tagline: 'Cybersecurity Analyst & CS Specialist',
  description: 'Cybersecurity-focused Computer Science graduate from Kwame Nkrumah University of Science and Technology (KNUST). Hands-on experience in penetration testing, network monitoring, vulnerability assessment, and secure enterprise administration. Dedicated to defensive resilience and threat auditing.',
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
    title: 'Enterprise Network & Infrastructure security',
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
    id: 'sec-mon- incident',
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
    title: 'UI/UX & Graphic Design (Flyers)',
    iconName: 'Palette',
    description: 'Designing intuitive, elegant user interfaces and visually striking marketing flyers to elevate brand engagement and awareness.',
    features: [
      'High-fidelity interactive Figma wireframes and prototypes',
      'Creative marketing flyer layouts and digital poster designs',
      'Modern, balanced typography pairings and visual brand kits',
      'User-centric interface research and interactive wireframing',
      'Multi-format graphic templates (print & digital-ready)'
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
    technologies: ['AWS Inc.', 'IAM Rules', 'Bash Scripting'],
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
    description: 'Designed and engineered a cross-platform secure mobile wallet application featuring biochemical authentication, full session state protections, and customized secure API gateways.',
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
