import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

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
    <html lang="fr">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
