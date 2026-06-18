import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';
import { sanityConfigured } from '@/sanity/env';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0c0d10', color: '#f4f4f2', fontFamily: 'system-ui', padding: '2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 540 }}>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Sanity n’est pas encore connecté</h1>
          <p style={{ color: '#8a8c92', lineHeight: 1.6 }}>
            Crée ton projet Sanity puis ajoute <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> dans
            le fichier <code>.env.local</code>. Voir le README, section « Connecter Sanity ».
            En attendant, le site s’affiche avec le contenu de démonstration.
          </p>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
