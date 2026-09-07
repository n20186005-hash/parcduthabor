'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  readStoredPrefs,
  storePrefs,
  applyConsent,
  sendPageView,
  loadMarketingTagsIfConfigured,
  type ConsentPrefs,
} from '@/lib/analytics';

type Copy = {
  title: string;
  message: string;
  accept: string;
  reject: string;
  manage: string;
  settingsPath: string;
};

const COPY: Record<string, Copy> = {
  fr: {
    title: 'Respect de votre vie privée',
    message:
      "Nous utilisons des cookies pour mesurer l'audience du site (Google Analytics) et, si vous l'acceptez, afficher des annonces personnalisées. Vous pouvez accepter ou refuser.",
    accept: 'Tout accepter',
    reject: 'Tout refuser',
    manage: 'Personnaliser',
    settingsPath: '/fr/cookie-settings',
  },
  en: {
    title: 'Your privacy matters',
    message:
      'We use cookies to measure site traffic (Google Analytics) and, if you accept, to show personalised ads. You can accept or refuse before continuing.',
    accept: 'Accept all',
    reject: 'Reject all',
    manage: 'Customise',
    settingsPath: '/en/cookie-settings',
  },
  zh: {
    title: '我们尊重您的隐私',
    message:
      '本站使用 Cookie 统计访问数据（Google Analytics），经您同意后才会用于个性化广告投放。您可以接受或拒绝后再继续浏览。',
    accept: '全部接受',
    reject: '全部拒绝',
    manage: '自定义设置',
    settingsPath: '/zh/cookie-settings',
  },
  de: {
    title: 'Ihre Privatsphäre ist uns wichtig',
    message:
      'Wir verwenden Cookies zur Messung der Besuche (Google Analytics) und – nach Ihrer Zustimmung – für personalisierte Werbung. Sie können zustimmen oder ablehnen.',
    accept: 'Alle akzeptieren',
    reject: 'Alle ablehnen',
    manage: 'Einstellungen',
    settingsPath: '/fr/cookie-settings',
  },
  it: {
    title: 'La tua privacy conta',
    message:
      'Usiamo cookie per misurare il traffico (Google Analytics) e, se accetti, per mostrare annunci personalizzati. Puoi accettare o rifiutare.',
    accept: 'Accetta tutto',
    reject: 'Rifiuta tutto',
    manage: 'Personalizza',
    settingsPath: '/fr/cookie-settings',
  },
  es: {
    title: 'Tu privacidad importa',
    message:
      'Usamos cookies para medir el tráfico (Google Analytics) y, si aceptas, para mostrar anuncios personalizados. Puedes aceptar o rechazar.',
    accept: 'Aceptar todo',
    reject: 'Rechazar todo',
    manage: 'Personalizar',
    settingsPath: '/fr/cookie-settings',
  },
};

const LANG_HINTS = ['fr', 'en', 'zh', 'de', 'it', 'es'];

function resolveLang(pathname: string): string {
  const first = pathname.split('/').filter(Boolean)[0];
  if (first && LANG_HINTS.includes(first)) return first;
  if (typeof document !== 'undefined') {
    const htmlLang = document.documentElement.lang?.split('-')[0];
    if (htmlLang && LANG_HINTS.includes(htmlLang)) return htmlLang;
  }
  return 'fr';
}

export default function ConsentManager() {
  const pathname = usePathname();
  const lang = resolveLang(pathname);
  const copy = COPY[lang] ?? COPY.fr;
  const [visible, setVisible] = useState(false);
  const lastPath = useRef(pathname);

  useEffect(() => {
    const stored = readStoredPrefs();
    if (stored) {
      applyConsent(stored);
      loadMarketingTagsIfConfigured(stored);
      return;
    }
    const isSettingsPage = pathname.endsWith('/cookie-settings');
    setVisible(!isSettingsPage);
  }, [pathname]);

  // Fire page_view on client-side route transitions (GA4 does not send it
  // automatically for App Router navigations).
  useEffect(() => {
    if (pathname !== lastPath.current) {
      const stored = readStoredPrefs();
      if (stored?.analytics) sendPageView();
      lastPath.current = pathname;
    }
  }, [pathname]);

  function choose(prefs: ConsentPrefs) {
    storePrefs(prefs);
    const reopened = applyConsent(prefs);
    if (reopened) sendPageView(); // tag was already booted: fire manually
    loadMarketingTagsIfConfigured(prefs);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-4"
      role="dialog"
      aria-label={copy.title}
      aria-live="polite"
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl p-5 sm:p-6"
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {copy.title}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {copy.message}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => choose({ analytics: false, marketing: false })}
              className="px-4 py-2 rounded-full text-sm font-medium border transition-colors"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              {copy.reject}
            </button>
            <a
              href={copy.settingsPath}
              className="px-4 py-2 rounded-full text-sm font-medium border transition-colors"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              {copy.manage}
            </a>
            <button
              type="button"
              onClick={() => choose({ analytics: true, marketing: true })}
              className="px-4 py-2 rounded-full text-sm font-medium text-white transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              {copy.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
