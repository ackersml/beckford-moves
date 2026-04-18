# Framer Migration Handoff

## Step 1: Import into Framer
- Create a new Framer project named `Beckford Moves`.
- Rebuild page structure using screenshots in `framer-export/screenshots/`.
- Use content maps in `framer-export/content/*-content-map.json` to recreate editable text/image layers.

## Step 2: Set Up CMS in Framer
- Create a CMS collection named **Site Content**.
- Add fields:
  - `key` (Text)
  - `value_text` (Text)
  - `value_image` (Image)
  - `page` (Text)
- Import CSV from `framer-export/content/framer-cms-import.csv`.

## Step 3: Bind Layers by cms_key
- Name each Framer layer to match the `cms_key` values from the content map files.
- Text layers bind to `value_text`.
- Image layers bind to `value_image`.
- Use the `page` field for filtering by page section.

## Step 4: Design Fidelity
- Recreate spacing, typography, and colors using `framer-export/tokens/tokens.json`.
- Use `framer-export/content/image-inventory.json` to source all existing images by origin.

## Step 5: Domain Cutover
- Keep production DNS on current host while Framer rebuild is reviewed.
- Perform domain cutover only after client approval of Framer version.
