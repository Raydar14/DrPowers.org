# Dr. Raychel Powers: site notes

## Writing style rules
- **Never use em dashes (—) or `&mdash;`.** Rewrite the sentence with a comma, period, colon, or parentheses (no double commas). This applies to all copy, titles, meta tags, and JS strings.

## Blog
- Posts live in `_content/blog/*.md` with a header block (title, date, category, excerpt, status, optional order and image).
- Only `status: published` posts are built. Run `python3 tools/build_blog.py` after any change; it regenerates `blog/`, `feed.xml`, and `sitemap.xml`.
- Drafts may live here with `status: draft` only when the author approves; the repo is public, so anything with unverified claims stays in Google Drive.
- Follow `_content/VOICE.md` for every post and page. Keep the author's ideas and strongest lines; never invent personal stories.
- No eyebrow labels above headings.
