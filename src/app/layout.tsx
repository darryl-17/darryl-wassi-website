import type { Metadata, Viewport } from 'next';
import { Anton, Archivo, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
});
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Darryl Wassi',
  description:
    "Darryl Wassi. IT Manager, développeur full-stack, créateur de contenu et entrepreneur. Je ne me contente pas d'imaginer — je construis. Depuis le Cameroun, pour l'Afrique et le monde.",
  authors: [{ name: 'Darryl Wassi' }],
  openGraph: {
    title: 'Darryl Wassi',
    description:
      "Je ne me contente pas d'imaginer les choses — je les construis. Produits digitaux, marques et systèmes pour l'Afrique.",
    locale: 'fr_FR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#050506',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${anton.variable} ${archivo.variable} ${grotesk.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
