#!/bin/bash

# Script to update Chrome DevTools MCP configuration in Cursor

MCP_CONFIG="$HOME/.cursor/mcp.json"
BACKUP="$MCP_CONFIG.backup.$(date +%s)"

# Backup existing config
if [ -f "$MCP_CONFIG" ]; then
    cp "$MCP_CONFIG" "$BACKUP"
    echo "Backed up existing config to: $BACKUP"
fi

# Update the Chrome DevTools entry
python3 << 'PYTHON_SCRIPT'
import json
import os
from pathlib import Path

config_path = Path.home() / ".cursor" / "mcp.json"

if not config_path.exists():
    print(f"Config file not found at {config_path}")
    exit(1)

with open(config_path, 'r') as f:
    config = json.load(f)

# Update Chrome DevTools entry
config["mcpServers"]["Chrome DevTools"] = {
    "command": "/Users/michelleackers/Desktop/Sean Beckford/venv/bin/python",
    "args": [
        "-m",
        "chrome_devtools_mcp_fork.server"
    ],
    "env": {
        "CHROME_DEBUG_PORT": "9222"
    }
}

with open(config_path, 'w') as f:
    json.dump(config, f, indent=2)

print("✅ Chrome DevTools MCP configuration updated successfully!")
print(f"📝 Config file: {config_path}")
print("\n⚠️  Next steps:")
print("1. Start Chrome with remote debugging:")
print("   /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222")
print("2. Restart Cursor completely (Cmd+Q, then reopen)")
print("3. Chrome DevTools MCP should be connected")
PYTHON_SCRIPT

echo ""
echo "Configuration updated. Please restart Cursor for changes to take effect."


