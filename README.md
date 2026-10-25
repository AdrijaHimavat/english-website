# Grow Me

**Learn. Create. Grow.** An original, free English-language educational website built with Next.js App Router, TypeScript, React, and Tailwind CSS 4. No accounts, paid products, checkout, or mandatory registration.

## Run locally

Use Node.js 22 or 24 LTS and npm. This environment has Node.js 24.

```sh
cd /workspace/english-website
npm ci
npm run dev
```

Open the development server on port **3000** in your local browser. For a production run:

```sh
npm run build
npm start
```

If npm cannot write to its default cache in a restricted environment, use `npm ci --cache /tmp/grow-me-npm-cache`.

## What's included

- Responsive home, searchable article library, About, privacy, and custom error pages.
- Twelve original practical guides across seven categories. The library has keyword search, combined category filters, URL-persisted state, six results per page, and a recoverable empty state.
- Static article detail pages with generated reading times, author/date, anchored contents, worked examples, related reading, and copy/native sharing.
- Original local SVG logo and category illustrations; local social preview image. No remote fonts, image services, or analytics are needed.
- Page metadata, canonical URLs, Article structured data, sitemap, and robots file.
- Keyboard navigation, skip link, visible focus states, reduced-motion support, and semantic landmarks.

## Edit or add articles

All content is in `lib/articles.json`. Add, edit, reorder, or remove an object there; rebuild to refresh the static article pages. Keep the array in newest-first order. The first three `featured: true` articles appear in the home featured section.

Each article uses this structure:

```json
{
  "slug": "a-unique-readable-slug",
  "title": "A useful title",
  "description": "A short summary for cards and search engines.",
  "category": "Content Creation",
  "date": "2026-10-25",
  "featured": false,
  "intro": "Introduce the reader's task.",
  "sections": [
    {
      "id": "a-unique-section-anchor",
      "title": "A clear heading",
      "paragraphs": ["Explain the idea in original writing."],
      "bullets": ["An actionable step."],
      "example": "A concrete example."
    }
  ],
  "takeaway": "One useful idea to take away."
}
```

`bullets` and `example` are optional. Slugs must be unique, use lowercase letters/numbers/hyphens, and remain stable once published. Section IDs must be unique within an article. The supported category names and their illustrations are defined in `lib/articles.ts`. Reading time is calculated at 200 words per minute. Search matches all entered keywords across the article data; no external search service is needed.

`npm test` checks content completeness, unique slugs/anchors, category coverage, worked examples, and substantive article length. The checks intentionally require the initial twelve-article library; update the count expectation when adding or deleting articles.

## Validate

```sh
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Browser tests use Playwright and start a production server on port 3000. Build first. The configuration uses system Chromium when available; otherwise install the Playwright browser with `npx playwright install chromium` (or `npx playwright install --with-deps chromium` on a fresh supported Linux machine). Set `PLAYWRIGHT_CHROMIUM_PATH` for a custom executable. The suite covers search/filter/pagination, all twelve article routes, anchors, missing pages, mobile navigation, overflow, metadata, honest newsletter behavior, and automated WCAG A/AA checks. Automated accessibility tests supplement manual review; they do not prove complete accessibility.

## Deploy when you're ready

Nothing is published by this project or its setup commands. After approval, deploy to a Next.js-compatible Node host or a managed Next.js service. A domain is optional; a host-provided HTTPS address works.

1. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin (no trailing slash). This is a public setting, not a secret. It supplies absolute canonical, sitemap, robots, and social metadata URLs. Rebuild after changing it.
2. Install with `npm ci`, build with `npm run build`, and run with `npm start`. The host can set `PORT`, or supply `npm start -- --port 3000`.
3. Configure HTTPS and review hosting logs/retention and the privacy page before launch.
4. Verify the home page, a detail page, search, a missing-page 404, `/sitemap.xml`, and `/robots.txt` on the deployed address.

The article listing is server-rendered for URL-based search and filtering. Use a host with a Next.js server runtime; this project is not configured for static-file-only hosting. No database, credentials, or paid service is required.

## Newsletter status

The newsletter is a **clearly disclosed demo**, not a subscription backend. It validates email format in the browser and explains that no email is stored or sent. To send newsletters later, connect an email service through a server-side endpoint, add appropriate abuse protection, consent records and unsubscribe handling, and update the privacy notice with actual practices and a contact method. Keep provider credentials server-side. Public articles must remain accessible without signup.

## Reference and originality

Public access to `modiresabz.com` was attempted during implementation, but this cloud environment's egress proxy returned HTTP 403. Its navigation and article content could not be inspected. The implementation follows the requested category-first educational discovery workflow and uses original Grow Me branding, illustrations, layouts, and English article text; it does not claim to reproduce a verified reference-site analysis.
