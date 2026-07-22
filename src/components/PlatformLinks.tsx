import type { ReactNode } from 'react';

/* Vrais logos officiels des plateformes. */
const ICONS: Record<string, ReactNode> = {
  apple: (
    <>
      <defs>
        <linearGradient id="apPod" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F452FF" />
          <stop offset="1" stopColor="#832BC1" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5.4" fill="url(#apPod)" />
      <path
        fill="#fff"
        d="M12.9 14.36c.86.35 1.43 1.25 1.32 2.25-.06.6-.28 1.86-.5 2.6-.15.53-.3.9-.44 1.12-.26.4-.72.62-1.28.62s-1.02-.22-1.28-.62c-.14-.22-.29-.59-.44-1.12-.22-.74-.44-2-.5-2.6-.11-1 .46-1.9 1.32-2.25a2 2 0 0 1 1.8 0z"
      />
      <circle cx="12" cy="11" r="1.95" fill="#fff" />
      <path
        fill="#fff"
        d="M12 4.85a6.15 6.15 0 0 0-3.23 11.39.55.55 0 0 0 .8-.62l-.1-.5a.73.73 0 0 0-.3-.46 4.8 4.8 0 1 1 5.66 0 .73.73 0 0 0-.3.46l-.1.5a.55.55 0 0 0 .8.62A6.15 6.15 0 0 0 12 4.85z"
      />
    </>
  ),
  spotify: (
    <>
      <circle cx="12" cy="12" r="12" fill="#1ED760" />
      <path
        fill="#000"
        d="M17.4 16.1a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.56-1.16a.75.75 0 1 1-.33-1.46c4.58-1.04 8.5-.59 11.67 1.34.35.22.46.68.25 1.03Zm1.44-3.2a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.55-1.8c4.37-1.33 9.79-.69 13.5 1.6.44.27.58.85.31 1.29Zm.12-3.34C15.09 7.26 8.7 7.05 5 8.17a1.12 1.12 0 1 1-.65-2.15c4.25-1.29 11.3-1.04 15.76 1.6a1.12 1.12 0 1 1-1.15 1.94Z"
      />
    </>
  ),
  youtube: (
    <>
      <rect y="4.5" width="24" height="15" rx="4.2" fill="#FF0000" />
      <path fill="#fff" d="M9.75 8.6v6.8l6-3.4z" />
    </>
  ),
};

const LABELS: Record<string, string> = {
  apple: 'Apple Podcasts',
  spotify: 'Spotify',
  youtube: 'YouTube',
};

export default function PlatformLinks({
  apple,
  spotify,
  youtube,
  className = 'showrow__links',
}: {
  apple?: string;
  spotify?: string;
  youtube?: string;
  className?: string;
}) {
  const links = [
    { url: apple, key: 'apple' },
    { url: spotify, key: 'spotify' },
    { url: youtube, key: 'youtube' },
  ].filter((l) => l.url);
  if (!links.length) return null;
  return (
    <div className={className}>
      {links.map((l) => (
        <a
          key={l.key}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="showrow__platform"
          aria-label={LABELS[l.key]}
          title={LABELS[l.key]}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {ICONS[l.key]}
          </svg>
        </a>
      ))}
    </div>
  );
}
