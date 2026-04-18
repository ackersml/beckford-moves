# Chrome DevTools MCP - Quick Start

## ✅ Setup Complete

1. **Package Installed**: `chrome-devtools-mcp-fork` in venv
2. **Configuration Updated**: MCP config file updated with Chrome DevTools server

## 🚀 Next Steps

### 1. Start Chrome with Remote Debugging

**Option A: Command Line (Recommended)**
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

**Option B: If Chrome is already running**
1. Close all Chrome windows completely
2. Run the command above

**Option C: Using open command**
```bash
open -a "Google Chrome" --args --remote-debugging-port=9222
```

### 2. Verify Chrome Debugging Port

Check that Chrome is listening:
```bash
lsof -i :9222
```

You should see Chrome processes listed.

### 3. Restart Cursor

1. **Completely quit Cursor** (Cmd+Q on Mac)
2. **Reopen Cursor**
3. Chrome DevTools MCP should connect automatically

### 4. Test Connection

Once Cursor restarts, Chrome DevTools MCP tools should be available for:
- Browser navigation
- Screenshots
- Element interaction
- Console monitoring
- Network request monitoring

## 📋 Current Configuration

The MCP server is configured to:
- Use Python from: `/Users/michelleackers/Desktop/Sean Beckford/venv/bin/python`
- Connect to Chrome on port: `9222`
- Server module: `chrome_devtools_mcp_fork.server`

## 🔧 Troubleshooting

**Chrome not connecting?**
- Ensure Chrome is running with `--remote-debugging-port=9222`
- Check port: `lsof -i :9222`
- Restart Chrome with debugging enabled

**MCP server not starting?**
- Verify Python path in config: `~/.cursor/mcp.json`
- Check Cursor's MCP server logs
- Ensure venv has `chrome-devtools-mcp-fork` installed

**Connection timeout?**
- Restart Chrome with debugging
- Restart Cursor completely
- Check firewall settings for port 9222

## 📝 Configuration File Location

`~/.cursor/mcp.json`

The Chrome DevTools entry has been updated to use the Python-based server.


