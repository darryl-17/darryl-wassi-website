import { groq } from 'next-sanity';
import { client } from './client';
import { fallbackContent, type SiteContent, type SiteSettings } from '@/lib/fallback';

/** Returns `value` only if it's a non-empty string, else `fallback`. */
function str(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

/** Merge a (possibly partial / null-filled) CMS settings doc over the defaults. */
function mergeSettings(raw: Partial<SiteSettings> | null | undefined): SiteSettings {
  const fb = fallbackContent.settings;
  if (!raw) return fb;
  const socials = Array.isArray(raw.socials)
    ? raw.socials.filter((s) => s && typeof s.label === 'string' && s.label.trim())
    : [];
  return {
    name: str(raw.name, fb.name),
    tagline: str(raw.tagline, fb.tagline),
    location: str(raw.location, fb.location),
    quote: str(raw.quote, fb.quote),
    manifesto: str(raw.manifesto, fb.manifesto),
    email: str(raw.email, fb.email),
    heroVideoUrl: typeof raw.heroVideoUrl === 'string' ? raw.heroVideoUrl : undefined,
    heroPosterUrl: typeof raw.heroPosterUrl === 'string' ? raw.heroPosterUrl : undefined,
    heroPlaceholderImageUrl: typeof raw.heroPlaceholderImageUrl === 'string' ? raw.heroPlaceholderImageUrl : undefined,
    heroPlaceholderVideoUrl: typeof raw.heroPlaceholderVideoUrl === 'string' ? raw.heroPlaceholderVideoUrl : undefined,
    whatsapp: typeof raw.whatsapp === 'string' ? raw.whatsapp : undefined,
    instagram: typeof raw.instagram === 'string' ? raw.instagram : undefined,
    substackUrl: typeof raw.substackUrl === 'string' ? raw.substackUrl : undefined,
    linkedinUrl: typeof raw.linkedinUrl === 'string' ? raw.linkedinUrl : undefined,
    socials: socials.length ? (socials as SiteSettings['socials']) : fb.socials,
    sections: mergeSections(raw.sections),
  };
}

/** Merge section titles/subtitles over the defaults, field by field. */
function mergeSections(raw: Partial<SiteSettings['sections']> | null | undefined): SiteSettings['sections'] {
  const fb = fallbackContent.settings.sections;
  const out = { ...fb };
  if (raw) {
    (Object.keys(fb) as (keyof typeof fb)[]).forEach((k) => {
      if (typeof fb[k] === 'string') {
        (out as Record<string, unknown>)[k] = str(raw[k], fb[k] as string);
      }
    });
    const imgs = (raw as { spotlightImageUrls?: unknown }).spotlightImageUrls;
    out.spotlightImageUrls = Array.isArray(imgs)
      ? imgs.filter((u): u is string => typeof u === 'string' && !!u)
      : fb.spotlightImageUrls;
  }
  return out;
}

const query = groq`{
  "settings": *[_type == "siteSettings"][0]{
    name, tagline, location, quote, manifesto, email,
    whatsapp, instagram, substackUrl, linkedinUrl,
    "heroVideoUrl": heroVideo.asset->url,
    "heroPosterUrl": heroPoster.asset->url,
    "heroPlaceholderImageUrl": heroPlaceholderImage.asset->url,
    "heroPlaceholderVideoUrl": heroPlaceholderVideo.asset->url,
    socials[]{ label, url },
    sections{ ..., "spotlightImageUrls": spotlightImages[].asset->url }
  },
  "ventures": *[_type == "venture"] | order(order asc){
    _id, title, tag, description, url, cta, size, accent,
    "imageUrl": image.asset->url,
    "hoverImageUrl": hoverImage.asset->url,
    "hoverVideoUrl": hoverVideo.asset->url
  },
  "timeline": *[_type == "timelineItem"] | order(order asc){
    _id, year, title, place, description, accent,
    "imageUrl": image.asset->url
  },
  "news": *[_type == "newsItem"] | order(order asc){
    _id, title, meta, excerpt, url, accent, featured, source, ctaLabel,
    "imageUrl": image.asset->url
  }
}`;

/**
 * Fetches all site content from Sanity. If Sanity isn't configured yet
 * (or returns nothing), falls back to local demo content so the site
 * always renders.
 */
export async function getSiteContent(): Promise<SiteContent> {
  if (!client) return fallbackContent;

  try {
    const data = await client.fetch(query, {}, { next: { revalidate: 30 } });
    return {
      settings: mergeSettings(data.settings),
      ventures: data.ventures?.length ? data.ventures : fallbackContent.ventures,
      timeline: data.timeline?.length ? data.timeline : fallbackContent.timeline,
      news: data.news?.length ? data.news : fallbackContent.news,
    };
  } catch (err) {
    console.warn('[Sanity] fetch failed, using fallback content:', err);
    return fallbackContent;
  }
}
