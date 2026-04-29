# WebWeCreate Share — Master Architecture

**Plugin:** webwecreate-share  
**Version:** 1.0.1  
**Files:** `webwecreate-share.php` · `assets/js/share.js` · `assets/js/wcgs-share-inject.js` · `assets/css/share.css`

---

## 1. File roles

| File | Role |
|------|------|
| `webwecreate-share.php` | WordPress plugin bootstrap: enqueue assets, register `[wwc_share]` shortcode |
| `assets/css/share.css` | **All** share-related CSS — modal, grid, toast, button skins. No share CSS lives in other plugin files. |
| `assets/js/share.js` | Core engine — PLATFORMS config, `handleShare()`, `showModal()`, event delegation |
| `assets/js/wcgs-share-inject.js` | Context adapter — loaded only on `is_product()`, injects `.wwc-share-btn` buttons into WooCommerce gallery slides |

---

## 2. Load sequence

```
wp_enqueue_scripts
  └─ share.css          (always)
  └─ share.js           (always)
  └─ wcgs-share-inject.js  (is_product() pages only, depends: share.js)
```

`share.js` uses **event delegation** (`document.addEventListener('click', ...)`), so it works for buttons injected dynamically after page load.

---

## 3. The universal trigger — `.wwc-share-btn`

This is the **only** thing needed to connect any button to the share engine.

```html
<button class="wwc-share-btn"
        data-url="https://example.com/product/foo"
        data-title="Product name"
        data-image="https://example.com/img.jpg">
  <!-- any inner content: SVG, <img>, text -->
</button>
```

| `data-*` attribute | Required | Fallback |
|--------------------|----------|---------|
| `data-url` | No | `location.href` |
| `data-title` | No | `document.title` |
| `data-image` | No | (no file share attempted) |

**Rule:** Any plugin that wants share behaviour just outputs this button with the correct `data-*` attributes. No JS wiring needed.

---

## 4. handleShare() decision tree

```
handleShare(btn)
│
├── navigator.share available? (mobile)
│   ├── YES → try Web Share API
│   │         ├── data-image set?  → fetchImageFile() → attach as File
│   │         └── navigator.share({ url, title, files? })
│   │             └── on error (not AbortError) → showModal()
│   └── NO  → showModal(url, title)  [desktop fallback]
│
showModal()
  └── renders PLATFORMS grid
      ├── normal platform  → window.open(shareUrl, '_blank')
      ├── copy-open        → clipboard.writeText + toast + deep-link
      └── copy             → clipboard.writeText + "Copied ✓" badge
```

---

## 5. PLATFORMS config (share.js)

Defined once at the top of `share.js`. To add/remove platforms, edit only this array.

| id | action | URL template |
|----|--------|-------------|
| `facebook` | open | `facebook.com/sharer/sharer.php?u={url}` |
| `twitter` | open | `twitter.com/intent/tweet?url={url}&text={title}` |
| `threads` | open | `threads.net/intent/post?text={title}%20{url}` |
| `line` | open | `social-plugins.line.me/lineit/share?url={url}&text={title}` |
| `whatsapp` | open | `api.whatsapp.com/send?text={title}%20{url}` |
| `instagram` | copy-open | copies link → tries `instagram://` deep link |
| `tiktok` | copy-open | copies link → tries `snssdk1233://` deep link |
| `copy` | copy | clipboard only + "Copied ✓" badge |

---

## 6. CSS class ownership

```
share.css owns everything below — nothing else should define these classes
│
├── #wwc-share-overlay        modal backdrop
├── #wwc-share-modal          bottom sheet
├── .wwc-share-grid           platform icon grid
├── .wwc-share-platform       individual icon button
├── .wwc-icon-wrap            coloured circle behind icon
├── .wwc-toast                toast notification
├── .wwc-copied-badge         "✓" badge after copy
├── .wwc-share-btn            universal trigger button (Section 3)
└── .wcgs-share-bar           flex bar injected by wcgs-share-inject.js
```

**Never define these classes in other plugins' CSS** — they belong to `webwecreate-share`.

---

## 7. Context adapters (current & future)

### 7a. Shortcode `[wwc_share]` (webwecreate-share.php)
Use in any page/post via Elementor HTML widget or PHP template.

```
[wwc_share url="" title="" image="" icon="" label="" class=""]
```

All attributes are optional — defaults pull from current post.

### 7b. wcgs-share-inject.js (WooCommerce gallery)
Auto-runs on product pages. Selector:

```js
'.wcgs-carousel .spswiper-slide .wcgs-slider-image'
```

Reads `img[data-image]` from each slide, creates `.wwc-share-btn` with that image URL, wraps it in `.wcgs-share-bar`, appends to `.spswiper-slide` (the parent).

To change the icon: edit `SHARE_ICON_URL` at the top of `wcgs-share-inject.js`.

### 7c. Future plugin (template)
To add a share button from any other plugin, output:

```html
<button class="wwc-share-btn"
        data-url="<?php echo esc_url( get_permalink() ); ?>"
        data-title="<?php echo esc_attr( get_the_title() ); ?>"
        data-image="<?php echo esc_url( get_the_post_thumbnail_url( null, 'large' ) ); ?>">
  <img src="/wp-content/uploads/2026/04/upload.png" alt="Share" width="20" height="20">
</button>
```

No additional JS or CSS needed — `webwecreate-share` handles everything.

---

## 8. OG meta layer (prerequisite for social image preview)

Social platforms (Facebook, LINE, Twitter, WhatsApp) **do not receive images directly**. They crawl the shared URL and pull the preview image from OG meta tags.

**Required tags on every shareable page:**
```html
<meta property="og:image"   content="https://example.com/image.jpg" />
<meta property="og:title"   content="Product name" />
<meta property="og:url"     content="https://example.com/product/foo" />
```

**Plugin used:** Rank Math (free) — set via the Social tab in the block editor sidebar per product.  
**Debug tool:** `developers.facebook.com/tools/debug` → paste URL → "Scrape Again" if cached.

**Common reasons image doesn't appear:**
- Image smaller than 200×200px (FB minimum; recommend 1200×630px)
- `og:image` URL is HTTP not HTTPS
- Server blocking social crawlers
- Stale Facebook cache — use Scrape Again

---

## 9. Quick reference: "which file do I touch?"

| Task | File |
|------|------|
| Add / remove social platform | `share.js` → `PLATFORMS` array |
| Change share button appearance | `share.css` → `.wwc-share-btn` |
| Change WooCommerce gallery icon | `wcgs-share-inject.js` → `SHARE_ICON_URL` |
| Change WooCommerce gallery selector | `wcgs-share-inject.js` → `injectShareButtons()` |
| Add share to a new page via shortcode | `[wwc_share]` in Elementor HTML |
| Add share from another plugin | Output `.wwc-share-btn` with `data-*` attrs |
| Modal styling | `share.css` → `#wwc-share-overlay`, `#wwc-share-modal` |
| Load on additional page types | `webwecreate-share.php` → `wwc_share_enqueue()` |
