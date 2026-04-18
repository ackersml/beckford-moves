# Beckford Moves — static Framer handoff prototype

This folder is a **client review artifact** only. It is built from:

- `../screenshots/*.png` — full-page captures (used at 15% opacity as layout underlay)
- `../tokens/tokens.json` — colors, type scale, radii (mirrored in `styles.css` as CSS variables)
- `../content/framer-cms-import.csv` and `../content/*-content-map.json` — copy and section order

DNS cutover to Framer happens **after** approval of this prototype.

## View locally

1. Open `index.html` in a browser (double-click or use a static server).
2. Paths assume this folder layout:

   ```text
   framer-export/
     prototype/          ← open HTML from here
       index.html
       styles.css
       …
     screenshots/
       home.png
       about.png
       …
   ```

   If `../screenshots/<page>.png` does not load, confirm you are not moving only the `prototype/` folder without its sibling `screenshots/` directory. To regenerate captures and artifacts from the live URLs, run `bash framer-export/scripts/run.sh` from the `sean-site` project root (see `../scripts/RUN.md`).

## Import into Framer (workflow)

1. **Create a new Framer project** (or duplicate a template) for the Beckford Moves site.
2. **Set project colors and text styles** from `../tokens/tokens.json` (or copy from `styles.css` `:root` variables). Map:
   - Background: `#171717`
   - Primary text: `#FAFAFA`
   - Accent: `#EA580C`
   - Font stacks: use the two `font_families` strings as Framer text style families (or closest web-safe match).
3. **CMS**: In Framer, add a CMS collection or paste fields from `../content/framer-cms-import.csv`. Keys align with `cms_key` in the content maps; use `value_text` / `value_image` columns.
4. **Page structure**: For each route (Home, About, Work, Contact, Blog), recreate frames in this order:
   - Sticky header: logo wordmark + primary nav + “Free Consultation”
   - Main: match sections in `*-content-map.json` — group by `position_hint` (`top` → `middle` → `bottom`) and keep node order inside each group.
5. **Underlay reference**: In Framer, you can place the matching screenshot from `../screenshots/` in a locked layer at **15% opacity** behind content while building; remove or hide it before publish.
6. **Navigation**: Wire menu items to Framer pages or scroll sections. This prototype uses local HTML files (`index.html`, `about.html`, `work.html`, `contact.html`, `blog.html`) as stand-ins for those routes.
7. **Remove prototype-only layers** before production: screenshot underlay, any placeholder links (`#`, `contact.html` duplicates), and static “First Project” card if replaced by CMS-driven case studies.

## Files in this folder

| File         | Role                                                |
| ------------ | --------------------------------------------------- |
| `styles.css` | All design tokens as CSS variables + layout utilities |
| `index.html` | Home                                                |
| `about.html` | About                                               |
| `work.html`  | Work / portfolio (Success Stories in main nav)      |
| `contact.html` | Contact + Send control from export              |
| `blog.html`  | Blog index                                          |
| `README.md`  | This file                                           |

## Scope limits

- No backend, forms do not submit.
- Images in content maps (OG image, favicon) may point at production URLs; replace in Framer with hosted assets.
- `work-detail` export exists separately (404 capture); not included as a standalone prototype page here.
