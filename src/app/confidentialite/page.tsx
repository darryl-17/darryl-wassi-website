import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/sanity/queries';

export const revalidate = 30;
export const metadata: Metadata = {
  title: 'Politique de confidentialité — Darryl Wassi',
  description: 'Politique de confidentialité et gestion des données du site de Darryl Wassi.',
};

export default async function ConfidentialitePage() {
  const { settings } = await getSiteContent();

  return (
    <>
      <SmoothScroll />
      <header className="subnav">
        <a href="/" className="subnav__back" aria-label="Retour à l'accueil">
          <span aria-hidden="true">←</span> Accueil
        </a>
        <a href="/" className="subnav__brand">
          <span className="nav__name">DARRYL WASSI</span>
        </a>
      </header>

      <main className="legalpage">
        <div className="legalpage__inner">
          <h1 className="legalpage__title">Confiden&shy;tialité</h1>
          <p className="legalpage__updated">Dernière mise à jour — juin 2026</p>

          <p>
            La présente politique décrit comment vos données personnelles sont collectées et utilisées
            lorsque vous naviguez sur ce site ou que vous nous contactez.
          </p>

          <h2>Données collectées</h2>
          <p>Nous ne collectons que les données que vous nous transmettez volontairement :</p>
          <ul>
            <li>Votre nom et votre adresse email lors de l'inscription à la newsletter.</li>
            <li>Les informations que vous communiquez via le formulaire ou par email lors d'une prise de contact.</li>
          </ul>

          <h2>Utilisation des données</h2>
          <p>
            Vos données servent uniquement à vous recontacter, à répondre à vos demandes et, si vous y avez
            consenti, à vous envoyer des actualités. Elles ne sont ni vendues, ni louées, ni cédées à des tiers
            à des fins commerciales.
          </p>

          <h2>Conservation</h2>
          <p>
            Vos données sont conservées le temps nécessaire au traitement de votre demande ou jusqu'à votre
            désinscription de la newsletter.
          </p>

          <h2>Vos droits</h2>
          <p>
            Conformément à la réglementation applicable, vous disposez d'un droit d'accès, de rectification et
            de suppression de vos données. Pour l'exercer, écrivez à{' '}
            <a href={`mailto:${settings.email}`}>{settings.email}</a>.
          </p>

          <h2>Cookies et mesure d&apos;audience</h2>
          <p>
            Ce site n&apos;utilise <strong>aucun cookie publicitaire</strong>. Seuls des cookies techniques
            strictement nécessaires à son fonctionnement peuvent être déposés.
          </p>
          <p>
            Pour comprendre comment le site est utilisé, nous recourons à des outils de mesure d&apos;audience
            respectueux de la vie privée (Vercel Web Analytics et Speed Insights), qui ne collectent pas de
            données personnelles identifiantes. Conformément à la réglementation européenne (RGPD / directive
            ePrivacy), ces outils ne sont activés <strong>qu&apos;après votre consentement explicite</strong>,
            recueilli via la bannière affichée lors de votre première visite.
          </p>
          <p>
            Vous pouvez modifier ou retirer votre choix à tout moment en cliquant sur
            « Gérer les cookies » en bas de page. Votre préférence est conservée localement dans votre
            navigateur.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative à vos données, contactez{' '}
            <a href={`mailto:${settings.email}`}>{settings.email}</a>.
          </p>
        </div>
      </main>

      <Footer settings={settings} />
    </>
  );
}
