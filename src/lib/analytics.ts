/**
 * GA4 (Consent Mode v2) + AdSense loading helpers.
 *
 * Policy: consent is never assumed.
 *  - First visit (no stored preference): tags stay OFF until the user
 *    chooses "Accept" on the consent banner.
 *  - Returning visitor with stored preference: preference is applied
 *    synchronously on mount and the matching tags boot automatically.
 *  - The Cookie Settings page writes the same preference and applies it.
 */

export const GA_MEASUREMENT_ID = 'G-HXM22WWPKP';

/**
 * AdSense publisher id. Currently the placeholder from the project template
 * (`ca-pub-XXXXXXXXXX`). AdSense is only injected once a real id is set;
 * the consent toggle then fully controls loading.
 */
export const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXX';

export type ConsentPrefs = {
  analytics: boolean;
  marketing: boolean;
};

export const CONSENT_STORAGE_KEY = 'cookiePrefs';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function decodePrefs(raw: string | null): ConsentPrefs | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (value && typeof value === 'object') {
      return {
        analytics: Boolean(value.analytics),
        marketing: Boolean(value.marketing),
      };
    }
  } catch {
    /* ignore malformed storage */
  }
  return null;
}

function prefsFromCookie(): ConsentPrefs | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${CONSENT_STORAGE_KEY}=`;
  const cookie = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(prefix));
  if (!cookie) return null;
  return decodePrefs(decodeURIComponent(cookie.slice(prefix.length)));
}

/** Read stored preferences (cookie first, localStorage as fallback). */
export function readStoredPrefs(): ConsentPrefs | null {
  try {
    const fromCookie = prefsFromCookie();
    if (fromCookie) return fromCookie;
    const fromStorage = localStorage.getItem(CONSENT_STORAGE_KEY);
    return decodePrefs(fromStorage);
  } catch {
    return null;
  }
}

/** Persist preferences to both a 1-year cookie and localStorage. */
export function storePrefs(prefs: ConsentPrefs): void {
  const json = JSON.stringify(prefs);
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, json);
  } catch {
    /* storage may be unavailable (private mode) — cookie still set below */
  }
  document.cookie = `${CONSENT_STORAGE_KEY}=${encodeURIComponent(
    json,
  )};path=/;max-age=31536000;SameSite=Lax`;
}

function consentParams(prefs: ConsentPrefs) {
  return {
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.marketing ? 'granted' : 'denied',
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
  };
}

let gaScriptAttached = false;

function attachGtagScript(): void {
  if (typeof document === 'undefined' || document.getElementById('gtag-js')) return;
  const script = document.createElement('script');
  script.id = 'gtag-js';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/**
 * Apply a consent state. When analytics is granted and the GA tag was not
 * loaded yet, the tag boots and an automatic `page_view` is fired by the
 * `gtag('config')` call. When the tag was already booted and analytics is
 * (re-)enabled, `true` is returned so the caller fires a manual `page_view`.
 */
export function applyConsent(prefs: ConsentPrefs): boolean {
  if (typeof window === 'undefined') return false;
  const w = window;
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== 'function') {
    w.gtag = function (...args: unknown[]) {
      w.dataLayer?.push(args);
    };
  }
  // Push commands directly into the dataLayer queue: gtag.js replays queued
  // commands in order once the (async) library finishes loading.
  const push = (...args: unknown[]) => w.dataLayer?.push(args);

  const firstBoot = !gaScriptAttached;
  if (firstBoot) {
    push('consent', 'default', consentParams(prefs));
  } else {
    push('consent', 'update', consentParams(prefs));
  }

  if (!prefs.analytics) return false;

  if (firstBoot) {
    gaScriptAttached = true;
    attachGtagScript();
    push('js', new Date());
    push('config', GA_MEASUREMENT_ID, { send_page_view: true });
    return false;
  }
  return true; // re-enabled after being disabled: caller sends page_view
}

/** Send a manual page_view (used for client-side route transitions). */
export function sendPageView(): void {
  if (typeof window === 'undefined' || !gaScriptAttached) return;
  window.dataLayer?.push([
    'event',
    'page_view',
    {
      page_location: window.location.href,
      page_title: document.title,
    },
  ]);
}

/** True once the GA script has been attached in this page session. */
export function isGaActive(): boolean {
  return gaScriptAttached;
}

/** Inject AdSense only when a real publisher id is configured. */
export function loadMarketingTagsIfConfigured(prefs: ConsentPrefs): void {
  if (typeof document === 'undefined' || !prefs.marketing) return;
  if (ADSENSE_CLIENT.includes('XXXXXXXXXX')) return; // placeholder — skip
  if (document.getElementById('adsense-js')) return;
  const script = document.createElement('script');
  script.id = 'adsense-js';
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(script);
}
