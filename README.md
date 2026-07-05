# Neverminds — neverminds.be

Source for the [Neverminds](https://neverminds.be) website, built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.

## Local development

Requires Ruby 3.2.0 (pinned in `.ruby-version`) and Bundler. With
[rbenv](https://github.com/rbenv/rbenv), the complete setup is:

```bash
rbenv install -s 3.2.0
gem install bundler -v 4.0.15
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

To verify the site without starting a server, run:

```bash
bundle exec jekyll build
```

Jekyll watches the source files and rebuilds automatically; refresh the browser to see changes (`--livereload` can be added to the serve command for auto-refresh).

## Structure

- `_layouts/`, `_includes/` — shared page chrome (nav, footer, contact CTA), the post layout, and the carousel/changelog includes
- `_data/founders.yml`, `_data/services.yml`, `_data/workshops.yml` — founder profiles, services, and workshops content
- `_posts/` — published Journal articles (standard Jekyll posts, one Markdown file per article)
- `_drafts/` — in-progress articles not yet ready to publish (see `EDITORIAL_WORKFLOW.md`)
- `index.html`, `about.html`, `services.html`, `workshops.html`, `journal/index.html` — the site's pages
- `assets/` — CSS, JS, images (including per-post image folders), and downloadable resources (slide decks, PDFs)

## Writing Journal posts

See **`EDITORIAL_WORKFLOW.md`** for the draft → publish process, front matter conventions, and how to use images, carousels, and changelogs. See **`WRITING_STYLE_GUIDE.md`** for voice and tone.

Quick front matter reference for a new post in `_posts/YYYY-MM-DD-slug.md`:

```yaml
---
title: "Post title"
subtitle: "Optional"
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

To preview drafts locally, run `bundle exec jekyll serve --drafts`.

## Deployment

This repo is `<username>.github.io`, so GitHub Pages builds and publishes the `main` branch automatically — no extra configuration or CI needed. Pushing to `main` deploys the live site.
