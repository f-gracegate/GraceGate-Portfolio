import type { Metadata, Viewport } from 'next';
import { Poppins, Montserrat, JetBrains_Mono } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'GraceGate — Francis Amoako · Design, Development, Motion & Cybersecurity',
    template: '%s · GraceGate',
  },
  description:
    'GraceGate is the studio of Francis Amoako, a KNUST Computer Science graduate and Certified Ethical Hacker offering UI/UX design, websites, mobile apps, flyers, branding, motion graphics and cybersecurity.',
  keywords: [
    'GraceGate',
    'Francis Amoako',
    'UI/UX design',
    'graphic design',
    'flyers',
    'motion graphics',
    'cybersecurity',
    'penetration testing',
    'ethical hacker',
    'CEH',
    'vulnerability assessment',
    'web development',
    'Kumasi',
    'Ghana',
  ],
  openGraph: {
    title: 'GraceGate — Francis Amoako · Design, Development, Motion & Cybersecurity',
    description:
      'I design it, build it, animate it and secure it. UI/UX, websites, mobile apps, flyers, motion graphics and cybersecurity. Powered by GraceGate Technologies.',
    images: [{ url: '/brand/gracegate-logo.png', width: 1066, height: 679, alt: 'GraceGate' }],
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#05030a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable} ${jetbrains.variable}`}>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
