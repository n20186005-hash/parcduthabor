import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'zh', 'en'],
  defaultLocale: 'fr',
  localePrefix: {
    mode: 'always',
  },
  pathnames: {
    '/': '/',
    '/horaires': '/horaires',
    '/acces': '/acces',
    '/roseraie': '/roseraie',
    '/plan': '/plan',
    '/que-faire-a-rennes': '/que-faire-a-rennes',
    '/visiter-rennes-1-jour': '/visiter-rennes-1-jour',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
  },
});

export type Locale = (typeof routing.locales)[number];
