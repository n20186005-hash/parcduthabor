import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Skip all paths that should not be internationalized, including the
  // standalone /de /it /es SEO landing pages and files (robots.txt, etc.)
  matcher: ['/((?!api|_next|_vercel|de|it|es|.*\\..*).*)']
};
