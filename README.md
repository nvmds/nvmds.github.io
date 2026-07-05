# Neverminds — neverminds.be

Source for the [Neverminds](https://neverminds.be) website, built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.

## Local development

Requires Ruby (2.7+) and Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

Jekyll watches the source files and rebuilds automatically; refresh the browser to see changes (`--livereload` can be added to the serve command for auto-refresh).

## Structure

- `_layouts/`, `_includes/` — shared page chrome (nav, footer, contact CTA) and templates
- `_data/founders.yml`, `_data/services.yml` — founder profiles and service listings
- `_posts/` — Journal articles (standard Jekyll posts, one Markdown file per article)
- `index.md`, `about.md`, `services.md`, `workshops.md`, `journal/index.html` — the site's pages
- `assets/` — CSS, JS and images

## Adding a Journal post

Add a new file to `_posts/` named `YYYY-MM-DD-slug.md` with front matter like:

```yaml
---
title: "Post title"
category: "Roadmap Mastery"   # also: Org Design, Conference Notes, Talks & Recordings
category_color: lime          # teal | lime | orange | purple
reading_time: "6 min"
author: "Michael Voorhaen"
excerpt: "One or two sentences shown on cards and previews."
featured: false               # true shows it as the big featured card on /journal/
cover: /assets/images/blog/example.webp   # optional; omit for a plain color placeholder
---

Article content in Markdown goes here.
```

## Deployment

This repo is `<username>.github.io`, so GitHub Pages builds and publishes the `main` branch automatically — no extra configuration or CI needed. Pushing to `main` deploys the live site.
