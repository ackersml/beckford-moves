#!/usr/bin/env bash
set -euo pipefail

# Run from repo root: sean-site/
# This uses an ephemeral Playwright package from /tmp and does not modify package.json.

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SCRIPT_PATH="$REPO_ROOT/framer-export/scripts/extract-site.mjs"

cd /tmp
npx -y playwright@latest install chromium
npx -y -p playwright@latest node "$SCRIPT_PATH"

echo "Done. Outputs:"
echo "  - framer-export/screenshots/"
echo "  - framer-export/tokens/tokens.json"
echo "  - framer-export/content/*-content-map.json"
echo "  - framer-export/content/image-inventory.json"
echo "  - framer-export/content/framer-cms-import.csv"
echo "  - framer-export/README_FRAMER.md"
