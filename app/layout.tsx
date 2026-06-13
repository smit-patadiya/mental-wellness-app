import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MindMitra — a calm companion for exam season',
  description:
    'Tell MindMitra how you feel; it surfaces the hidden trigger and gives you one grounded thing to do — then sends you back to studying. Private, on your device.',
};

export const viewport: Viewport = {
  themeColor: '#2E8270',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
