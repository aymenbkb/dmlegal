# DM Legal — Sanity Studio

Content management for the DM Legal blog (dmlegal.com).

---

## Quick Start

### 1 — Install dependencies
```bash
cd sanity-studio
npm install
```

### 2 — Run locally
```bash
npm run dev
```
Opens at: http://localhost:3333

Log in with your Sanity account. Your projectId `1rdqxnwm` is pre-configured.

---

## Deploy Studio to the Web

```bash
npm run deploy
```

Sanity will ask for a hostname (e.g. `dmlegal`).
Your studio will be live at: `https://dmlegal.sanity.studio`

---

## Creating a Blog Post (Step-by-Step)

1. Open the Studio → click **Blog Posts** in the left sidebar
2. Click **+ Create** (top-right)
3. Fill in:
   - **Article Title** — required
   - **URL Slug** — click "Generate" (auto-fills from title)
   - **Publication Date** — defaults to today
   - **Short Description** — 1–2 sentences for the listing page
   - **Cover Image** — upload and set the focal point with the hotspot tool
   - **Article Body** — write using the rich text editor
4. Optionally select a **Category**
5. For multilingual content, switch to the **🌐 Translations** tab
6. Click **Publish** (top-right)

---

## GROQ Queries Used by Frontend

**Blog listing page** (`blog.html`):
```groq
*[_type=="post"] | order(publishedAt desc){
  title,
  excerpt,
  body,
  "slug": slug.current,
  publishedAt
}
```

**Single article page** (`single-blog.html`):
```groq
*[_type=="post" && slug.current=="SLUG"][0]{
  title,
  publishedAt,
  excerpt,
  body,
  "content": pt::text(body)
}
```

**Recent posts sidebar**:
```groq
*[_type=="post"] | order(publishedAt desc)[0..4]{
  title,
  "slug": slug.current,
  publishedAt
}
```

---

## Project Structure

```
sanity-studio/
├── sanity.config.js        ← Studio entry point & plugin config
├── sanity.cli.js           ← CLI config (projectId, dataset)
├── package.json
├── schemas/
│   ├── index.js            ← Registers all schemas
│   └── post.js             ← Full blog post schema
└── desk/
    └── deskStructure.js    ← Sidebar: only "Blog Posts" visible
```

---

## Adding More Schema Types Later

1. Create `schemas/yourType.js`
2. Import and add it in `schemas/index.js`
3. Add a list item in `desk/deskStructure.js` if needed
