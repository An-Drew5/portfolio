import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { siteConfig } from '@/content/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://andrews-oppong.dev'),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Andrews Oppong',
    'Full-Stack Engineer',
    'DevOps Engineer',
    'RHCSA Candidate',
    'RHEL 9',
    'Linux System Administrator',
    'Next.js',
    'TypeScript',
    'GitHub Actions',
    'PostgreSQL',
    'Ghana Software Engineer',
  ],
  authors: [{ name: siteConfig.name, url: 'https://andrews-oppong.dev' }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://andrews-oppong.dev',
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: '@An_Drew5',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: 'Full-Stack Engineer & DevOps / Linux Sysadmin Specialist',
    url: 'https://andrews-oppong.dev',
    sameAs: [siteConfig.github, siteConfig.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kumasi',
      addressCountry: 'Ghana',
    },
    knowsAbout: [
      'Red Hat Enterprise Linux (RHEL)',
      'RHCSA',
      'SELinux',
      'systemd',
      'Linux Systems Administration',
      'Full-Stack Web Development',
      'Next.js',
      'DevOps & CI/CD Pipelines',
      'PostgreSQL',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-bg-primary text-text-primary antialiased selection:bg-accent selection:text-text-inverse">
        {/* Skip to Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-accent text-text-inverse font-mono font-semibold rounded-md shadow-lg outline-none ring-2 ring-accent ring-offset-2"
        >
          Skip to main content [Enter]
        </a>

        <Providers>
          <Navbar />
          <CommandPalette />
          <main id="main-content" className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
