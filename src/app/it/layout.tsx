import type { Viewport } from 'next';
import ConsentManager from '@/components/ConsentManager';

export const viewport: Viewport = {
  themeColor: '#234830',
};

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <ConsentManager />
        {children}
      </body>
    </html>
  );
}
