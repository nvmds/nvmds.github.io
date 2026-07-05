# Editorial Workflow

This project has a clear split between `_drafts/` and `_posts/`. These rules turn that into an explicit workflow so content changes are predictable and safe.

## 1. What a Draft Means

A draft is an article that lives in `_drafts/`.

Use draft status when one or more of these are true:

- The article still contains `TODO`, placeholder text, rough notes, or sections that obviously need another pass.
- The core argument is not stable yet.
- Sources, links, screenshots, or image selections still need verification.
- You want the work versioned in git, but not treated as reader-ready.

Important:

- Draft is a workflow state, not a quality judgment.
- Length is not the deciding factor. A short talk announcement can be publishable; a long conference note with unresolved placeholders is still a draft.
- Do not use a `draft: false` or `draft: true` flag in front matter. In this repo, the folder is the source of truth.

## 2. What It Means to Publish

Publishing means moving an article from draft state to reader-ready state.

In practice that means:

1. The file moves from `_drafts/` to `_posts/`.
2. The filename gets a final publish date and slug: `YYYY-MM-DD-title.md`.
3. The article is complete enough to stand on its own for readers.
4. All placeholder text, `TODO` notes, and unfinished sections are removed.
5. Links, images, includes, and downloads used by the article are checked.
6. The site builds successfully.

For this repo, "published" should mean "I am comfortable with this being on the public Journal today", not "I might finish this later".

## 3. Publish Checklist

Before moving a file into `_posts/`, the article should meet this bar:

- It has a clear title and author in front matter.
- `subtitle`, `category`, `category_color`, `reading_time`, and `excerpt` are set — these drive the Journal grid, filters, and card display.
- The opening paragraph makes the topic and angle clear.
- The post has one coherent through-line, even if it is short.
- There are no editor notes such as `TODO:`, `needs to be written`, or reminders to come back later.
- Referenced assets exist in the repo and render correctly.
- Local preview or build succeeds.

For new published posts, prefer these front matter fields:

```yaml
---
layout: post
title: "Your Post Title"
subtitle: "Optional"
author: "Michael Voorhaen"
category: "Roadmap Mastery"   # also: Org Design, Conference Notes, Talks & Recordings
category_color: lime         # teal | lime | orange | purple — keep one color per category
reading_time: "6 min"
excerpt: "One or two sentences shown on Journal cards and previews."
featured: false               # true shows it as the big featured card on /journal/
cover: /assets/images/YYYY-MM-DD-post-title/cover.jpg   # optional; omit for a plain color placeholder
---
```

The filename date is the canonical publish date. Only add an explicit `date:` field when you need time-of-day control beyond the filename.

## 4. Rules for Published Posts

Once a file is in `_posts/`, treat it as public content under change control.

- No `TODO`, placeholder copy, or unfinished sections in `_posts/`.
- No slug changes after publish unless there is a strong reason, because URLs change.
- Prefer matching image folders to the post slug, for example `assets/images/YYYY-MM-DD-post-title/`.
- If a published article gets a meaningful reader-facing update later, add a `changelog` entry (see below) instead of silently rewriting it.
- Conference notes may be more note-like than essays, but they still need to feel intentional and complete.
- Talks & recordings posts may be short, but they should still answer: what is this, why should someone care, and where is the recording or deck?
- Keep exactly one category per post, and keep `category_color` consistent for a given category across all posts (this is what keeps the Journal's colour-coding meaningful).

## 5. When Automatic Commits Are Allowed

Automatic commits are allowed for low-risk work that does not change what readers see on the public site.

Allowed without extra approval:

- Creating or updating files in `_drafts/`.
- Adding or updating assets used only by draft content.
- Updating workflow docs, writing guides, or repo documentation.
- Refactors or code cleanups that do not intentionally change published content.

Automatic commits should not be used for:

- Moving a file from `_drafts/` to `_posts/`.
- Any edit to prose inside `_posts/`, even if it looks small.
- Title, slug, date, category, or excerpt changes for published posts.
- Homepage, navigation, or Journal changes that materially affect public presentation.
- Deleting published content or published assets.

Rule of thumb: if the change alters public editorial intent, publishing state, or URL structure, require explicit approval first.

## 6. Additional Proposals

These are good defaults for future work:

- Keep using `_drafts/` as the only draft mechanism.
- Standardize new published posts on explicit `title` and `author` front matter, even if Jekyll could infer a title from the filename.
- Treat `README.md` as setup documentation and this file as the editorial source of truth.
- Use `WRITING_STYLE_GUIDE.md` for voice and style, and this file for workflow and release decisions.
- Prefer committing draft progress early and often; prefer publishing deliberately and explicitly.

## 7. Images and Carousels

Images are part of the article, not decoration added at the end. Treat them with the same care as the prose.

### Folder and file conventions

- Store article-specific images in `assets/images/YYYY-MM-DD-post-title/`.
- Keep the image folder aligned with the post slug when possible.
- Prefer web-friendly formats already used in the repo: `png`, `jpg`, `jpeg`, or `webp`.
- Use descriptive filenames so the asset is understandable in git without opening it.
- Downloadable resources (slide decks, PDFs) live in `assets/resources/YYYY-MM-DD-post-title/`.

### When to use a single image

Use a normal Markdown image when one image supports one point in the article.

```markdown
![Descriptive alt text](/assets/images/YYYY-MM-DD-post-title/example.png)
```

Use raw `<img>` only when layout control is genuinely needed, for example:

- custom width or float behavior
- intentionally disabling the standard article-image styling with `class="no-lightbox"`
- special inline presentation that Markdown cannot express cleanly

If raw HTML is not buying anything, prefer normal Markdown.

### When to use a carousel

Use a carousel when multiple images belong to the same moment, comparison, or subsection and should be browsed together.

Good uses in this repo:

- several photos from the same conference session
- a small sequence of slides
- a set of related visuals that support one argument

Avoid using a carousel as a dumping ground for every image you have. If the images do not belong together, split them up.

### Carousel conventions

Define carousels in front matter and place them in the article with `{% include carousel.html number="N" %}`.

Example:

```yaml
carousels:
  - images:
      - image: /assets/images/YYYY-MM-DD-post-title/example-1.jpg
        url: /assets/images/YYYY-MM-DD-post-title/example-1.jpg
        title: "What readers see under the image"
        alt: "What the image shows"
        position: center
      - image: /assets/images/YYYY-MM-DD-post-title/example-2.jpg
        url: /assets/images/YYYY-MM-DD-post-title/example-2.jpg
        title: "Second image caption"
        alt: "Second image description"
        position: top
```

```liquid
{% include carousel.html number="1" %}
```

Rules:

- `image` and `url` should normally point to the same file.
- `title` is the visible caption under the image. Use it when the image benefits from context.
- `alt` describes the image itself and should not just repeat the filename.
- `position` may be `top`, `center`, or `bottom` when cropping needs control.
- Keep each carousel coherent and reasonably small.

### Accessibility and captions

- Every standalone image should have meaningful alt text.
- Carousel items should use `alt` for description and `title` for the visible caption when needed.
- Do not use screenshots that require unreadably small text unless the text is also explained in the surrounding copy.
- If an image carries an important idea, mention that idea in the prose too. Do not make the image the only way to understand the point.

### Publishing check for media

Before publishing:

- verify every referenced image path exists
- verify carousel numbering matches the front matter order
- verify captions and alt text are present where needed
- preview the article to make sure image sizing and cropping look intentional

## 8. Changelogs for Published Updates

If a published post gets a meaningful update later, add a `changelog` entry rather than silently rewriting it:

```yaml
changelog:
  - date: "2026-04-05"
    changes:
      - "Expanded the X section with a concrete example."
      - "Added an illustration for Y."
```

Entries render automatically at the end of the article via `{% include changelog.html %}` (already wired into the post layout).
