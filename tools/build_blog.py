#!/usr/bin/env python3
"""
Blog builder for drpowers.org

Source posts live in  _content/blog/*.md  (the leading underscore keeps
GitHub Pages from publishing the raw files). Each post starts with a
small header block:

    ---
    title: Listen to your partner even when you don't want to
    date: 2026-10-17
    category: Relationships
    excerpt: One or two sentences for the blog list, Google, and social cards.
    status: published        # or: draft (drafts are never built)
    image: assets/headshot-closeup.jpg   # optional social card image
    order: 1                 # optional, sorts posts that share a date
    ---

    Post body in Markdown...

Run from the repo root:

    pip install markdown
    python3 tools/build_blog.py

It writes:
    blog/index.html            the blog list with category filters
    blog/<slug>/index.html     one page per published post
    feed.xml                   RSS feed (schedulers can auto-post from this)
    sitemap.xml                regenerated with every page and post
"""

import datetime as dt
import html
import math
import pathlib
import re
import sys

try:
    import markdown
except ImportError:
    sys.exit("Missing dependency: run  pip install markdown")

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "_content" / "blog"
OUT = ROOT / "blog"
SITE = "https://drpowers.org"
AUTHOR = "Dr. Raychel Powers"
DEFAULT_IMAGE = "assets/headshot-closeup.jpg"
STATIC_PAGES = [
    ("", "1.0"), ("about.html", "0.8"), ("blog/", "0.9"),
    ("gallery.html", "0.7"), ("cv.html", "0.7"),
]

DISCLAIMER = (
    "This post is for education and reflection. It is not therapy, a diagnosis, "
    "or a substitute for care from a licensed professional who knows your situation. "
    "If you are in crisis in the U.S., call or text 988."
)


def parse(path):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", text, re.S)
    if not m:
        sys.exit(f"{path.name}: missing the --- header block")
    meta = {}
    for line in m.group(1).splitlines():
        line = line.split("#", 1)[0].rstrip() if line.strip().startswith(("status", "image")) else line
        if ":" in line:
            k, v = line.split(":", 1)
            v = v.strip()
            if len(v) > 1 and v[0] == v[-1] and v[0] in "\"'":
                v = v[1:-1]
            meta[k.strip().lower()] = v
    for req in ("title", "date", "category", "excerpt"):
        if not meta.get(req):
            sys.exit(f"{path.name}: missing '{req}'")
    meta["slug"] = path.stem
    meta["date_obj"] = dt.date.fromisoformat(meta["date"])
    meta["status"] = meta.get("status", "draft").lower()
    body = m.group(2)
    meta["words"] = len(re.findall(r"\w+", body))
    meta["minutes"] = max(1, math.ceil(meta["words"] / 230))
    meta["html"] = markdown.markdown(body, extensions=["extra", "sane_lists", "smarty"])
    return meta


def esc(s):
    return html.escape(s, quote=True)


def check_dashes(posts):
    bad = [p["slug"] for p in posts if "—" in p["html"] or "&mdash;" in p["html"]]
    if bad:
        sys.exit("Em dash found in: " + ", ".join(bad) + ". Rewrite those sentences.")


def head(title, desc, canonical, base, og_type="website", image=DEFAULT_IMAGE, extra=""):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}" />
  <meta name="author" content="{AUTHOR}" />
  <meta name="theme-color" content="#00273f" />
  <link rel="canonical" href="{canonical}" />
  <link rel="icon" href="{base}assets/favicon-heart.svg" type="image/svg+xml" />
  <link rel="alternate" type="application/rss+xml" title="Dr. Raychel Powers, writing" href="{SITE}/feed.xml" />

  <meta property="og:type" content="{og_type}" />
  <meta property="og:site_name" content="{AUTHOR}" />
  <meta property="og:title" content="{esc(title)}" />
  <meta property="og:description" content="{esc(desc)}" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:image" content="{SITE}/{image}" />
  <meta name="twitter:card" content="summary_large_image" />
{extra}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{base}css/style.css" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header id="site-header" class="site-header" aria-label="Primary"></header>
"""


def foot(base):
    return f"""
  <footer id="site-footer" class="site-footer"></footer>
  <script src="{base}js/script.js"></script>
</body>
</html>
"""


def fmt_date(d):
    return d.strftime("%B %-d, %Y")


def post_page(p, others):
    base = "../../"
    url = f"{SITE}/blog/{p['slug']}/"
    ld = (
        '  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BlogPosting",'
        f'"headline":{esc_json(p["title"])},"datePublished":"{p["date"]}",'
        f'"author":{{"@type":"Person","name":"{AUTHOR}","url":"{SITE}/about.html"}},'
        f'"description":{esc_json(p["excerpt"])},"mainEntityOfPage":"{url}"}}</script>'
    )
    more = "".join(
        f'<a class="post-more__item" href="../{o["slug"]}/"><h3>{esc(o["title"])}</h3>'
        f'<span>{esc(o["category"])}, {o["minutes"]} min read</span></a>'
        for o in others
    )
    return (
        head(f"{p['title']} | {AUTHOR}", p["excerpt"], url, base, "article",
             p.get("image") or DEFAULT_IMAGE, ld)
        + f"""
  <main id="main">
    <section class="post-hero">
      <div class="wrap post-hero__inner">
        <a class="post-back" href="../">&larr; All writing</a>
        <h1>{esc(p['title'])}</h1>
        <p class="post-meta">
          <span>{AUTHOR}, Psy.D.</span>
          <span><time datetime="{p['date']}">{fmt_date(p['date_obj'])}</time></span>
          <span>{esc(p['category'])}</span>
          <span>{p['minutes']} min read</span>
        </p>
      </div>
    </section>

    <div class="post-body">
      <article class="prose wrap">
{p['html']}
        <aside class="post-note">{DISCLAIMER}</aside>
      </article>
    </div>

    <section class="post-more">
      <div class="wrap">
        <h2>Keep reading</h2>
        <div class="post-more__grid">{more}</div>
        <p class="post-more__all"><a class="btn btn--ghost" href="../">All writing</a></p>
      </div>
    </section>
  </main>
"""
        + foot(base)
    )


def esc_json(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"').replace("<", "\\u003c") + '"'


def index_page(posts):
    base = "../"
    cats = []
    for p in posts:
        if p["category"] not in cats:
            cats.append(p["category"])
    chips = '<button class="chip" type="button" aria-pressed="true" data-cat="All">All</button>' + "".join(
        f'<button class="chip" type="button" aria-pressed="false" data-cat="{esc(c)}">{esc(c)}</button>'
        for c in cats
    )
    cards = "".join(
        f"""
          <a class="blog-card post-card" href="{p['slug']}/" data-cat="{esc(p['category'])}">
            <h3>{esc(p['title'])}</h3>
            <p>{esc(p['excerpt'])}</p>
            <span class="post-card__meta">{esc(p['category'])}, {p['minutes']} min read</span>
          </a>"""
        for p in posts
    )
    return (
        head(f"Writing | {AUTHOR}",
             "Essays and practical guides on relationships, self-kindness, the brain, and mental health from licensed psychologist Dr. Raychel Powers.",
             f"{SITE}/blog/", base)
        + f"""
  <main id="main">
    <section class="post-hero blog-hero">
      <div class="wrap post-hero__inner">
        <h1>Writing</h1>
        <p class="about-lead">Relationships, self-kindness, the brain, and the honest work of feeling better. Long form, in my own words.</p>
      </div>
    </section>

    <section class="blog blog-list">
      <div class="wrap">
        {'<div class="gal-filters blog-filters" role="group" aria-label="Filter by topic">' + chips + '</div>' if posts else ''}
        {'<div class="blog-grid">' + cards + '</div>' if posts else '<p class="blog-empty">New writing is on the way. Check back soon.</p>'}
      </div>
    </section>
  </main>
  <script>
    (function () {{
      var chips = document.querySelectorAll(".blog-filters .chip");
      var cards = document.querySelectorAll(".post-card");
      chips.forEach(function (c) {{
        c.addEventListener("click", function () {{
          chips.forEach(function (x) {{ x.setAttribute("aria-pressed", "false"); }});
          c.setAttribute("aria-pressed", "true");
          var cat = c.getAttribute("data-cat");
          cards.forEach(function (card) {{
            card.hidden = !(cat === "All" || card.getAttribute("data-cat") === cat);
          }});
        }});
      }});
    }})();
  </script>
"""
        + foot(base)
    )


def rss(posts):
    items = "".join(
        f"""
    <item>
      <title>{esc(p['title'])}</title>
      <link>{SITE}/blog/{p['slug']}/</link>
      <guid isPermaLink="true">{SITE}/blog/{p['slug']}/</guid>
      <pubDate>{dt.datetime.combine(p['date_obj'], dt.time(12)).strftime('%a, %d %b %Y %H:%M:%S +0000')}</pubDate>
      <category>{esc(p['category'])}</category>
      <description>{esc(p['excerpt'])}</description>
    </item>"""
        for p in posts
    )
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Dr. Raychel Powers, writing</title>
    <link>{SITE}/blog/</link>
    <description>Essays and guides from licensed psychologist Dr. Raychel Powers.</description>
    <language>en-us</language>{items}
  </channel>
</rss>
"""


def sitemap(posts):
    today = dt.date.today().isoformat()
    rows = [(f"{SITE}/{path}", today, pri) for path, pri in STATIC_PAGES]
    rows += [(f"{SITE}/blog/{p['slug']}/", p["date"], "0.6") for p in posts]
    body = "".join(
        f"\n  <url>\n    <loc>{loc}</loc>\n    <lastmod>{mod}</lastmod>\n    <priority>{pri}</priority>\n  </url>"
        for loc, mod, pri in rows
    )
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{body}\n</urlset>\n'


def main():
    all_posts = [parse(f) for f in sorted(SRC.glob("*.md"))]
    posts = [p for p in all_posts if p["status"] == "published"]
    drafts = [p for p in all_posts if p["status"] != "published"]
    check_dashes(posts)
    posts.sort(key=lambda p: (-p["date_obj"].toordinal(), int(p.get("order") or 99), p["title"]))

    # Clear old generated post folders so unpublished posts disappear.
    if OUT.exists():
        for d in OUT.iterdir():
            if d.is_dir() and (d / "index.html").exists():
                for f in d.iterdir():
                    f.unlink()
                d.rmdir()
    OUT.mkdir(exist_ok=True)

    for p in posts:
        others = [o for o in posts if o is not p][:3]
        d = OUT / p["slug"]
        d.mkdir(exist_ok=True)
        (d / "index.html").write_text(post_page(p, others), encoding="utf-8")
    (OUT / "index.html").write_text(index_page(posts), encoding="utf-8")
    (ROOT / "feed.xml").write_text(rss(posts), encoding="utf-8")
    (ROOT / "sitemap.xml").write_text(sitemap(posts), encoding="utf-8")

    print(f"Built {len(posts)} published post(s); skipped {len(drafts)} draft(s).")
    for p in posts:
        print(f"  live   /blog/{p['slug']}/")
    for p in drafts:
        print(f"  draft  {p['slug']}")


if __name__ == "__main__":
    main()
