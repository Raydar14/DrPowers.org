# Dr. Raychel Powers — site notes

## Writing style rules
- **Never use em dashes (—) or `&mdash;`.** Rewrite the sentence with a comma, period, colon, or parentheses (no double commas). This applies to all copy, titles, meta tags, and JS strings.

## Blog
- Posts live in `_content/blog/*.md` with a header block (title, date, category, excerpt, status, optional order and image).
- Only `status: published` posts are built. Run `python3 tools/build_blog.py` after any change; it regenerates `blog/`, `feed.xml`, and `sitemap.xml`.
- Never commit drafts here: the repo is public. Drafts live in Google Drive until approved.
- Keep the author's wording; edits are limited to typos, em dashes, and formatting.
- No eyebrow labels above headings.
