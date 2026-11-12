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
    default: 'GraceGate — Cybersecurity Analyst & Digital Product Builder',
    template: '%s · GraceGate',
  },
  description:
    'GraceGate is a CEHv11-certified cybersecurity analyst and KNUST Computer Science graduate offering penetration testing, vulnerability assessment, secure web & mobile apps, and UI/UX design.',
  keywords: [
    'GraceGate',
    'cybersecurity',
    'penetration testing',
    'ethical hacker',
    'CEH',
    'vulnerability assessment',
    'web development',
    'Ghana',
  ],
  openGraph: {
    title: 'GraceGate — Cybersecurity Analyst & Digital Product Builder',
    description:
      'Penetration testing, vulnerability assessment, secure web & mobile apps and UI/UX design. Powered by GraceGate Technologies.',
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
