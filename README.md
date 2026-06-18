# Darryl Wassi — The Digital Builder (app dynamique)

Site cinématique en **Next.js 14 + Sanity (CMS) + Framer Motion + Lenis**.
Tu gères tout le contenu (projets, parcours, news, services, réglages) depuis une
interface d'admin web, sans toucher au code.

---

## 1. Lancer en local (développement)

```bash
cd darryl-wassi-app
npm install        # déjà fait une fois
npm run dev
```
Ouvre **http://localhost:3000**.

> Sans Sanity connecté, le site s'affiche déjà avec le **contenu de démonstration**
> (`src/lib/fallback.ts`). Tu peux travailler le design tout de suite.

---

## 2. Connecter Sanity (ton interface d'admin)

C'est ce qui rend le site « dynamique » : tu édites le contenu en ligne.

### Étape A — créer le projet Sanity (une seule fois)
```bash
cd darryl-wassi-app
npx sanity@latest login          # connexion / création de compte (gratuit)
npx sanity@latest init --env     # crée le projet + écrit .env.local automatiquement
```
Choisis : **Create new project** → nom « Darryl Wassi » → dataset **production** →
n'écrase PAS les schémas existants (réponds *No* si on te le propose).

> À défaut, copie `.env.local.example` en `.env.local` et colle ton `projectId`
> (visible sur https://www.sanity.io/manage).

### Étape B — ouvrir l'admin
Relance `npm run dev`, puis va sur :
```
http://localhost:3000/studio
```
Tu y crées/édites : **Réglages du site**, **Projets**, **Étapes du parcours**,
**Actualités**, **Services**. Le site se met à jour automatiquement (revalidation 60 s).

### Étape C — autoriser ton domaine
Dans https://www.sanity.io/manage → ton projet → **API → CORS origins**, ajoute
`http://localhost:3000` puis (plus tard) l'URL de ton site en production.

---

## 3. Ajouter des images / vidéos

Tout passe maintenant par le **Studio** (`/studio`) — plus besoin d'éditer le code :

- **Vidéo du hero** → *Réglages du site* → champ « Vidéo de fond »
- **Portraits des projets** → *Projets* → champ « Image / portrait »
- **Photos du parcours** → *Étapes du parcours* → champ « Photo »
- **Visuels des news** → *Actualités* → champ « Image »

Si un visuel est vide, un dégradé cinématique de repli s'affiche.

---

## 4. Modifier le style / les couleurs

- **Couleur d'accent & typo** : variables en haut de `src/app/globals.css` (`--accent`, `--font-display`…)
- **Animations** : composants dans `src/components/` (Framer Motion). Ex : `Hero.tsx`,
  `Timeline.tsx`, `Reveal.tsx` (révélations au scroll), `SmoothScroll.tsx` (Lenis).

---

## 5. Déployer (mise en ligne)

Recommandé : **Vercel** (gratuit, fait pour Next.js).
```bash
npm i -g vercel
vercel            # suis les étapes, lie le repo
```
Dans le dashboard Vercel → **Settings → Environment Variables**, ajoute :
```
NEXT_PUBLIC_SANITY_PROJECT_ID   = <ton id>
NEXT_PUBLIC_SANITY_DATASET      = production
NEXT_PUBLIC_SANITY_API_VERSION  = 2024-09-01
```
Puis `vercel --prod`. Ton admin sera sur `https://ton-site.com/studio`.

---

## Structure
```
darryl-wassi-app/
├── src/
│   ├── app/
│   │   ├── page.tsx           # assemble les 8 sections
│   │   ├── layout.tsx, globals.css
│   │   └── studio/[[...tool]] # interface d'admin Sanity embarquée
│   ├── components/            # Hero, Ventures, Timeline, Spotlight, News…
│   ├── sanity/                # client, schémas (= champs de l'admin), requêtes
│   └── lib/fallback.ts        # contenu de démonstration
└── .env.local                # tes identifiants Sanity (non versionné)
```
