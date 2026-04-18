# Chrome DevTools MCP - Configuration Fixed

## ✅ Issue Fixed

The module path in the configuration was incorrect. It has been updated from:
- ❌ `chrome_devtools_mcp_fork.server` 
- ✅ `chrome_devtools_mcp_fork`

## Current Configuration

```json
"Chrome DevTools": {
  "command": "/Users/michelleackers/Desktop/Sean Beckford/venv/bin/python",
  "args": [
    "-m",
    "chrome_devtools_mcp_fork"
  ],
  "env": {
    "CHROME_DEBUG_PORT": "9222"
  }
}
```

## Next Steps

1. **Start Chrome with remote debugging:**
   ```bash
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
   ```

2. **Verify Chrome is running:**
   ```bash
   lsof -i :9222
   ```

3. **Restart Cursor completely:**
   - Quit Cursor (Cmd+Q)
   - Reopen Cursor
   - The MCP server should connect

## If You Still See Errors

### Check the Error Message
Please share the exact error message you're seeing. Common issues:

1. **"Chrome not running"** - Start Chrome with debugging enabled
2. **"Module not found"** - The venv path might be wrong
3. **"Connection refused"** - Chrome debugging port not accessible
4. **"Permission denied"** - Check file permissions

### Test the Server Manually
```bash
cd "/Users/michelleackers/Desktop/Sean Beckford"
source venv/bin/activate
python -m chrome_devtools_mcp_fork
```

If this runs without errors, the server is working correctly.

### Alternative: Use NPX Version
If the Python version continues to have issues, you can switch back to the npx version:

```json
"Chrome DevTools": {
  "command": "npx",
  "args": ["-y", "chrome-devtools-mcp@latest"],
  "env": {
    "CHROME_DEBUG_PORT": "9222"
  }
}
```

## Debugging

Check Cursor's MCP logs:
- Open Cursor
- Help → Toggle Developer Tools
- Look for MCP-related errors in the console

Or check log files:
- `~/Library/Logs/Cursor/mcp*.log` (if they exist)

