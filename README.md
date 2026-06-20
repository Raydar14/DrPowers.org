[README.md](https://github.com/user-attachments/files/29168170/README.md)
# drraychelpowers.com

The personal-brand site for Dr. Raychel Powers — a fast, static, dependency-free
site built for GitHub Pages.

## Structure

```
.
├── index.html        # landing page (hero, work, BE333, recommends, video, blog, CV, connect)
├── about.html        # bio + manifesto
├── cv.html           # full CV
├── gallery.html      # photo gallery with lightbox
├── css/style.css     # design tokens + all styling
├── js/
│   ├── script.js     # injects header/footer, mobile nav, reveals, subscribe form
│   └── gallery.js    # gallery image list, filtering, lightbox
├── assets/
│   ├── favicon.svg
│   ├── RPowers-CV.pdf
│   └── gallery/      # drop your gallery photos here (photo-1.jpg … photo-8.jpg)
├── CNAME             # custom domain for GitHub Pages
└── README.md
```

The header and footer are injected by `js/script.js` so they stay identical on every
page. To add a page (e.g. `about.html`), copy the `<header id="site-header">` and
`<footer id="site-footer">` placeholders and the `<script src="js/script.js">` tag
from `index.html`, and it inherits the same nav and footer automatically. Edit the
`NAV` and `SOCIAL` arrays at the top of `script.js` to change links in one place.

## Deploy on GitHub Pages

1. Create a repo (e.g. `drraychelpowers`) and push these files to the `main` branch.
2. **Settings → Pages →** Source: *Deploy from a branch*, Branch: `main` / `root`.
3. Under **Custom domain**, enter `drraychelpowers.com` (the `CNAME` file already sets this).
4. At your DNS host, point the domain at GitHub Pages:
   - `A` records for the apex `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `your-username.github.io`
5. Enable **Enforce HTTPS** once the certificate is issued.

## Before you go live — quick edits

- **Subscribe form:** create a free form at [formspree.io](https://formspree.io),
  then replace `your-form-id` in the form `action` in `index.html`. Until then the
  form falls back to opening an email draft. Also set your real inbox in
  `FALLBACK_EMAIL` inside `js/script.js`.
- **CV:** the full CV lives at `cv.html` and the PDF is self-hosted at
  `assets/RPowers-CV.pdf`. To update it, replace that PDF (keep the filename) and
  edit `cv.html`. The public CV page shows references as "available upon request"
  and omits the direct cell number for privacy — both are still in the PDF.
- **Gallery photos:** drop images into `assets/gallery/`, then edit the `IMAGES`
  list at the top of `js/gallery.js` (each entry has `src`, `caption`, and
  `category` — categories build the filter chips automatically). Until a file
  exists at a given `src`, that tile shows a styled "Add a photo" placeholder, so
  the page never looks broken. The list ships with eight placeholder entries you
  can rename or replace.
- **Blog links:** the homepage Blog section and these links currently point to
  `therapytallahassee.com` (Dr. Powers Blog) and `forensicpsychfl.com` (Forensic
  Blog). Swap the two `href`s in `index.html` (search for "Blog links") for the
  exact blog page URLs when you have them.
- **Meditation app** card links to the contact section since no app URL was set —
  add the link when you have it.

## Notes

No build step, no frameworks, no tracking. Works offline by opening `index.html`.
Accessible (skip link, keyboard focus, reduced-motion support) and responsive to mobile.
