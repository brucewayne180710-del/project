# CULT & HABITAT — Spaces for a Better You

A static website for showcasing the CULT & HABITAT materials and design consultation offering.

## Deploy

The site is hosted with GitHub Pages from the repository. Keep `index.html`, `catalog.json`, and the image assets at their existing relative paths. No build step or package installation is required for the static site.

## Enquiries and data handling

The enquiry form uses the visitor's configured email application (`mailto:`) to prepare a message. It does **not** submit to a server, create a CRM record, or confirm that an enquiry was sent. The visitor must send the draft themselves. Do not describe this flow as secure server-side lead capture.

Do not place names, email addresses, phone numbers, project descriptions, or other personal information in analytics events. Analytics should remain disabled until a real project configuration, consent approach, and privacy notice are in place. Never put private API keys or server secrets in client-side files; anything shipped to a browser is public.

## Analytics and business metrics

Do not use a placeholder PostHog project key. Configure analytics only with a valid project-specific public ingestion key and a documented privacy/consent setup. CAC requires acquisition-spend data and attributable customer conversions; LTV requires actual customer revenue and an explicitly defined calculation period. Website events alone cannot establish either metric.

## Security and maintenance

- Keep dependencies and external embeds to a minimum; review third-party scripts before adding them.
- Validate changes on desktop and mobile, including keyboard navigation and form behavior.
- Check browser console errors and verify local asset paths after edits.
- Review image, font, and other third-party asset licensing before commercial redistribution. The repository license notice does not grant rights to third-party assets.
- Static GitHub Pages cannot safely host private credentials or provide authenticated server-side lead storage by itself.

See [SECURITY.md](SECURITY.md) for vulnerability reporting and [LICENSE](LICENSE) for the repository rights notice.