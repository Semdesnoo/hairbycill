// Single source of truth for GitHub Pages basePath — used by next.config.ts and asset URLs.
export const BASE_PATH = "/hairbycill";

// Public origin + basePath the site is served from. hairbycill.nl is still a locked Shopify store,
// so canonicals/sitemap point at GitHub Pages. Switch to "https://hairbycill.nl" when the domain moves.
export const SITE_URL = `https://semdesnoo.github.io${BASE_PATH}`;
