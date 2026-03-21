# Gujarati Gratuity SEO Operations

## What is already implemented
- Gujarati-first metadata in `index.html` (title, description, canonical, hreflang, OG, Twitter).
- Structured data for `Organization` and `WebApplication` in `index.html`.
- Crawlable static fallback HTML inside `#root` in `index.html`.
- Auto sitemap date update via `scripts/update-sitemap-lastmod.mjs`.

## Release checklist (every deploy)
1. Run `npm run build` (this auto-runs `seo:prepare` via `prebuild`).
2. Confirm `public/sitemap.xml` has today's `lastmod`.
3. Deploy site (`npm run deploy` or your normal deployment flow).
4. Open Google Search Console:
   - URL Inspection -> inspect `https://gujarati-gratuity-calculator.info/`
   - Request indexing after meaningful metadata/content changes.
5. In Search Console Sitemaps, submit/re-submit:
   - `https://gujarati-gratuity-calculator.info/sitemap.xml`

## Query tracking buckets
- Gujarati script intent:
  - ગ્રેચ્યુઇટી કેલ્ક્યુલેટર
  - ગ્રેચ્યુઇટી ગણતરી
  - 15/26 ગ્રેચ્યુઇટી
- Mixed intent:
  - gratuity calculator gujarati
  - gratuity formula gujarati
  - gratuity eligibility 5 years

## Off-page anchor text guidance
- Use natural mix across backlinks (avoid exact-match spam):
  - Gujarati: "ગ્રેચ્યુઇટી કેલ્ક્યુલેટર"
  - Mixed: "Gujarati gratuity calculator"
  - Branded/plain URL: "gujarati-gratuity-calculator.info"

## Biweekly optimization loop
1. Review top queries, CTR, avg position in Search Console.
2. Refresh title/description if impressions grow but CTR is low.
3. Add 1-2 new mentions/backlinks from relevant Gujarati HR/finance sources.
4. Re-request indexing only after notable updates.
