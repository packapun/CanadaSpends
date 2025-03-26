import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { PostHogProvider } from './providers'

export const metadata: Metadata = {
  title: 'Get The Facts About Government Spending | Canada Spends',
  description: 'Government spending shouldn’t be a black box. We turn complex data into clear, non-partisan insights so every Canadian knows where their money goes.',
  icons: [
    {
      url: '/favicon-96x96.png',
      type: 'image/png',
      sizes: '96x96'
    },
    {
      url: '/favicon.svg',
      type: 'image/svg+xml'
    },
    {
      url: '/favicon.ico',
      rel: 'shortcut icon'
    },
    {
      url: '/apple-touch-icon.png',
      rel: 'apple-touch-icon',
      sizes: '180x180'
    }
  ],
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'CanadaSpends'
  },
};

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['600', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn('antialiased', plusJakartaSans.className)}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
