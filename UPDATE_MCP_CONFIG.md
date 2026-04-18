# Update MCP Server Configuration with New API Key

## Your New API Key
```
IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjU3MTE0ZWYwLTkxNTMtNGFkYy1iM2EyLWU1Y2NjYWIzYWI1ZVwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImY1MmQ3YTA5LTJhOTEtNGYzYS05YWQ5LWU5ZjlhNjQxNzVlYVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCI0MmEzOTZmZC1mNmQ1LTQxMGItOTdmNy0yYTA5YmI2YzJhYTRcIn19IiwiaWF0IjoxNzY0NzA2NDkwfQ.b4cBrUBPXErlQ9Ebq6n_QJSisw0xH9_g24ZnF-ZNO4uqKi8Ikq5TZwY9f1su67sroOPc-lAFfGvrYITW84MzP_gWGg-iKKaC_quMRHll_sOO0Ko3mHAZWvqBxLWvSKLeRrb2qoT3J4K8_kxbCdZgs2X6Cmo-1atN8cFLyhy6QcfrAIWt52372KfWZeeLtDhquFdG-LiOvRK-6lY7cDbBx4UJakm_sbulFx_IkezvTD8RJh942lLVc0rjRyLXmK3_DOK4Trc2FBDwfu-urCv2PbBSQZLZVAeC9pzdf9MXZjub1Z7aDrTj0yaoQtUUaPkE6krH1gYtwhfY4N_Jw9Cl8g
```

## Steps to Update MCP Configuration

### Method 1: Via Cursor Settings (Easiest)

1. **Open Cursor Settings**
   - Press `Cmd + ,` (Mac) or `Ctrl + ,` (Windows/Linux)
   - Or: Cursor menu → Settings

2. **Find MCP Servers Section**
   - Search for "MCP" in settings
   - Or navigate to: Features → MCP Servers

3. **Edit Wix Server Configuration**
   - Find the "Wix" server entry
   - Update the `WIX_API_KEY` environment variable with the new key above
   - Save the configuration

4. **Restart Cursor**
   - Completely quit Cursor (Cmd+Q on Mac)
   - Reopen Cursor
   - Test the connection

### Method 2: Edit Configuration File Directly

1. **Locate MCP Config File**
   - Mac: `~/.cursor/mcp.json` or `~/Library/Application Support/Cursor/User/globalStorage/mcp.json`
   - Windows: `%APPDATA%\Cursor\User\globalStorage\mcp.json`
   - Linux: `~/.config/Cursor/User/globalStorage/mcp.json`

2. **Open the File**
   ```bash
   # On Mac/Linux:
   open ~/.cursor/mcp.json
   # Or use your text editor
   ```

3. **Update the Configuration**
   ```json
   {
     "mcpServers": {
       "Wix": {
         "command": "npx",
         "args": ["-y", "@wix/mcp-server"],
         "env": {
           "WIX_API_KEY": "IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjU3MTE0ZWYwLTkxNTMtNGFkYy1iM2EyLWU1Y2NjYWIzYWI1ZVwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImY1MmQ3YTA5LTJhOTEtNGYzYS05YWQ5LWU5ZjlhNjQxNzVlYVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCI0MmEzOTZmZC1mNmQ1LTQxMGItOTdmNy0yYTA5YmI2YzJhYTRcIn19IiwiaWF0IjoxNzY0NzA2NDkwfQ.b4cBrUBPXErlQ9Ebq6n_QJSisw0xH9_g24ZnF-ZNO4uqKi8Ikq5TZwY9f1su67sroOPc-lAFfGvrYITW84MzP_gWGg-iKKaC_quMRHll_sOO0Ko3mHAZWvqBxLWvSKLeRrb2qoT3J4K8_kxbCdZgs2X6Cmo-1atN8cFLyhy6QcfrAIWt52372KfWZeeLtDhquFdG-LiOvRK-6lY7cDbBx4UJakm_sbulFx_IkezvTD8RJh942lLVc0rjRyLXmK3_DOK4Trc2FBDwfu-urCv2PbBSQZLZVAeC9pzdf9MXZjub1Z7aDrTj0yaoQtUUaPkE6krH1gYtwhfY4N_Jw9Cl8g"
         }
       }
     }
   }
   ```

4. **Save and Restart**
   - Save the file
   - Completely quit Cursor
   - Reopen Cursor

### Method 3: Check Cursor's MCP Settings UI

1. **Open Command Palette**
   - Press `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows/Linux)

2. **Search for MCP**
   - Type "MCP" or "Model Context Protocol"
   - Look for "MCP: Configure Servers" or similar

3. **Edit Wix Server**
   - Find Wix in the list
   - Update the API key field
   - Save

## After Updating

1. **Restart Cursor Completely**
   - Don't just reload - fully quit and reopen

2. **Test Connection**
   - Ask me to test the Wix connection again
   - I'll try listing your sites

3. **If Still Getting 403**
   - Verify API key permissions in Wix dashboard
   - Check that all required scopes are enabled
   - Ensure the key hasn't expired

## Verification

Once updated, I can test by running:
- `ListWixSites` - Should show your Wix sites
- If successful, we can proceed with site creation/management





