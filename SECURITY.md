# Security and Safety Notes

## Current Mitigations

### XSS (Cross-Site Scripting)

- **AIChatFrame** (`components/analytics/AIChatFrame.tsx`): User and bot message content is passed through an `escapeHtml()` helper before being inserted into the DOM via `dangerouslySetInnerHTML`. Bold markdown (`**text**`) is supported; the captured group is also escaped when wrapped in `<strong>`.
- **Hero** (`components/landing/Hero.tsx`): The SQL mockup uses a static code string and only known regex replacements (e.g. SQL keywords → `<span>` with fixed colors). No user or external input is rendered as HTML.

### External Links

- All `target="_blank"` links use `rel="noopener noreferrer"` (e.g. Footer “More details”, “Documentation”) to reduce tab-napping and referrer leakage.

### Form (CTA Funnel)

- The lead form (email, company, role, country, comment, checkboxes) is client-side only. Submissions are not sent to any server; they are stored in React state and only drive the success screen.
- No secrets or API keys are used in the front end for this form.

---

## When You Add a Backend

1. **Form submission**
   - Validate and sanitize all inputs on the server (email format, length, allowed characters).
   - Use CSRF tokens for state-changing requests.
   - Apply rate limiting to prevent abuse (e.g. per IP or per email).

2. **Sensitive configuration**
   - Do not put API keys, tokens, or credentials in client-side code or in `NEXT_PUBLIC_*` env vars that are exposed to the browser. Use server-side env and API routes or a backend service for sensitive operations.

3. **Content Security Policy (CSP)**
   - Consider a strict CSP (e.g. restrict `script-src`, `style-src`) to reduce impact of any future XSS. Next.js and your host may support CSP headers or meta tags.

4. **Dependencies**
   - Run `npm audit` regularly and keep Next.js, React, and other dependencies updated for security fixes.

---

## Summary

- **Current scope:** Static and mock-data landing page with client-side interactivity. XSS risk in the only user-controlled HTML path (AI chat) is mitigated by escaping. External links use `noopener noreferrer`.
- **Before production with a real form:** Add server-side validation, CSRF, and rate limiting; keep secrets off the client.
