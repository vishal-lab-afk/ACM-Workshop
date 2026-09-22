# Fallback: GitHub Codespaces

Use this only if Git won't work on your laptop and you can't fix it in a couple of minutes. The workshop is designed for local Git, but a Codespace gives you the same repository, the same terminal, and the same missions in the browser.

Everything in [MISSIONS.md](../MISSIONS.md) works unchanged inside a Codespace. The only difference is how you preview the dashboard.

## Start a Codespace

1. Open **your** repository on github.com (the one you created with "Use this template").
2. Click the green **Code** button → **Codespaces** tab → **Create codespace on main**.
3. Wait a minute or two. A VS Code editor opens in your browser with a terminal at the bottom.
4. In that terminal:
   ```bash
   git status
   ```
   You're in the repository, on `main`, ready for Mission 1.

Git is already installed and already signed into GitHub. `git push` just works — no authentication setup.

## Preview the dashboard

Codespaces can't open a local file in your browser directly, so serve the folder with the built-in Python server:

```bash
python3 -m http.server 8000
```

VS Code will pop up a notification: **"Your application running on port 8000 is available"** → click **Open in Browser**. If you miss the notification, open the **Ports** tab (next to Terminal) and click the globe icon on port 8000.

Leave that terminal running. Open a second terminal (the `+` icon in the terminal panel) for your Git commands. Reload the browser tab after each edit, same as local.

Stop the server with `Ctrl+C` when you're done.

## Notes

- Free GitHub accounts include a monthly allowance of Codespaces hours. One workshop uses well under it.
- Your Codespace keeps running for a while after you close the tab. Stop it from the **Code → Codespaces** menu when you're done, or let it auto-suspend.
- Anything you commit and push is safe on GitHub. Anything uncommitted lives only in the Codespace.
