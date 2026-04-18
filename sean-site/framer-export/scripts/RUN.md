# Run site export (Playwright)

From the `sean-site` repository root:

```bash
bash framer-export/scripts/run.sh
```

What it does:

1. `cd /tmp` so `npx` does not pick up this repo's `npm` overrides.
2. `npx playwright install chromium` (ephemeral `playwright` package; no change to `package.json`).
3. `npx -p playwright node framer-export/scripts/extract-site.mjs`

Outputs (under `framer-export/`):

- `screenshots/*.png`
- `tokens/tokens.json`
- `content/*-content-map.json`
- `content/image-inventory.json`
- `content/framer-cms-import.csv`
- `README_FRAMER.md`
