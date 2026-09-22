# Broken Developer Dashboard

**ACM @ UMD · Git & GitHub Workshop: Beyond `git push`**

You've joined a software development team preparing the Developer Dashboard for version 1.0. During this workshop you'll fix outdated release info, build a feature on a branch, push it to GitHub, open a Pull Request, respond to review feedback, and resolve a merge conflict.

The dashboard is a plain HTML/CSS page. The code changes are tiny on purpose. **The Git workflow is the exercise.**

---

## Workshop Quick Start

1. Open the ACM workshop template repository (link/QR code from the instructor).
2. Click **Use this template** → **Create a new repository**.
3. Name it `broken-developer-dashboard` and create it under **your own** GitHub account. Leave it public (or private, either works).
4. Clone **your** new repository (click the green **Code** button on your repo and copy the URL):
   ```bash
   git clone <your-repo-url>
   cd broken-developer-dashboard
   ```
5. Open the folder in your code editor.
6. Open `index.html` in your browser (double-click it, or right-click → Open With → Browser). You should see the dashboard.
7. In a terminal inside the repository folder, run:
   ```bash
   git status
   ```
   You should see `On branch main` and `nothing to commit, working tree clean`.
8. Open [MISSIONS.md](MISSIONS.md) and wait for the instructor before starting Mission 1.

Something not working? See [TROUBLESHOOTING.md](TROUBLESHOOTING.md). Local Git completely stuck? See [docs/CODESPACES.md](docs/CODESPACES.md).

---

## Three copies of this project

```
ACM template repository        The starting project provided by ACM.
        │                      You never push here.
        │  "Use this template"
        ▼
Your GitHub repository         Your own independent remote copy. Git calls it `origin`.
        │                      Issues and Pull Requests live here.
        │  git clone
        ▼
Your local clone               The copy on your laptop. This is where you edit,
                               stage, and commit. `git push` sends work back up.
```

Everyone in the room works in their own repository. Nothing you do affects anyone else.

---

## Before the workshop

- [ ] A GitHub account you can sign into
- [ ] A laptop with Git installed — check with:
  ```bash
  git --version
  ```
- [ ] A code editor (VS Code or whatever you prefer)
- [ ] Git knows who you are (needed to commit):
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "you@example.com"
  ```
  Use the email attached to your GitHub account so commits are credited to you.

Installing Git is not part of the live session. If you need it: <https://git-scm.com/downloads>.

---

## Cloning: HTTPS or SSH?

**If GitHub already works on your laptop, keep using your normal method.**

If you're not sure, use **HTTPS**. Click the green **Code** button on your repository and copy the URL shown under the HTTPS tab:

```bash
git clone https://github.com/<your-username>/broken-developer-dashboard.git
```

The first time you push, Git will ask you to sign in. GitHub will open a browser window (Git Credential Manager) or ask for a token — follow the prompts. Your GitHub *password* will not work in the terminal; use the browser sign-in or a personal access token.

If you already have SSH keys set up with GitHub, the SSH tab works the same way:

```bash
git clone git@github.com:<your-username>/broken-developer-dashboard.git
```

Either way, replace `<your-username>` with your own — don't clone someone else's repository.

---

## What's in this repository

| File | What it is |
|------|------------|
| `index.html` | The dashboard. Every mission edits this file. |
| `styles.css` | Styling. You won't need to touch it. |
| `script.js` | Theme toggle and status-badge dots. You won't need to touch it. |
| [MISSIONS.md](MISSIONS.md) | The workshop missions, with progressive hints. |
| [CHEATSHEET.md](CHEATSHEET.md) | The handful of Git commands you'll actually use. |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | "Something's wrong" → safe next steps. |
| [docs/CODESPACES.md](docs/CODESPACES.md) | Fallback if Git won't work on your laptop. |
| `.github/` | Issue and Pull Request templates GitHub picks up automatically. |

Previewing the dashboard: just open `index.html` in a browser. Reload after each edit. No server, no build step.

---

## The mental model

Every mission comes back to this picture. When you're confused, ask: *"Where is my change right now?"*

```
WORKING DIRECTORY      files on disk, as you edit them
        │  git add
        ▼
STAGING AREA           the exact changes you've chosen for the next commit
        │  git commit
        ▼
LOCAL REPOSITORY       a saved snapshot, still only on your laptop
        │  git push
        ▼
REMOTE (GitHub)        your repository on github.com — `origin`
```

- `git add` does **not** upload anything.
- `git commit` does **not** send anything to GitHub.
- `git push` does **not** merge your branch into `main`.
- A Pull Request does **not** upload code. The branch is already on GitHub; the PR is the conversation about merging it.

And when in doubt:

```bash
git status
```

---

## After the workshop

This repository is yours to keep. The missions, cheat sheet, and troubleshooting guide are written to still be useful when you come back to them later. The bonus missions at the bottom of [MISSIONS.md](MISSIONS.md) are good practice on your own time.
