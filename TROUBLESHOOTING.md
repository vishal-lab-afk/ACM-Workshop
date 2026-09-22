# Troubleshooting

Every entry starts with a safe diagnostic. Nothing here deletes your work. If you're not sure what state you're in, start with:

```bash
git status
```

It tells you your branch, what's changed, what's staged, and whether a merge is in progress. Most problems below are solved by reading its output carefully.

---

## Setup

### `git: command not found`

Git isn't installed or isn't on your PATH.

- **macOS:** run `xcode-select --install`, or install from <https://git-scm.com/downloads>.
- **Windows:** install Git for Windows from <https://git-scm.com/downloads>, then open a *new* terminal (Git Bash, PowerShell, or Windows Terminal).
- Still stuck? Use the fallback: [docs/CODESPACES.md](docs/CODESPACES.md).

### `git commit` complains "Please tell me who you are"

Git needs a name and email once per machine:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Then run your `git commit` again.

### I cloned the wrong repository (the ACM template, or someone else's)

Check where `origin` points:

```bash
git remote -v
```

If the URL doesn't contain **your** username, you cloned the wrong one. Go to *your* repository on github.com (the one you created with "Use this template"), click **Code**, copy the URL, and clone that into a different folder. Leave the wrong clone alone; it does no harm.

### I don't know what folder my terminal is in

```bash
pwd          # macOS / Linux / Git Bash
cd           # Windows cmd (prints the current folder)
ls           # list files — you should see index.html and MISSIONS.md
```

If you don't see `index.html`, `cd` into the repository folder. In VS Code, **Terminal → New Terminal** opens a terminal already inside the project.

---

## Branches

### I don't know what branch I'm on

```bash
git status       # first line: "On branch ..."
git branch       # the one with * is current
```

### `fatal: a branch named 'feature/...' already exists`

You already created it. Just switch to it instead of creating it:

```bash
git switch feature/analytics-platform
```

### I made changes on the wrong branch (and haven't committed yet)

Uncommitted changes travel with you when you switch branches, as long as they don't collide with the target branch. So usually:

```bash
git status                         # confirm changes are uncommitted
git switch -c feature/the-right-name
git status                         # changes still there, now on the right branch
```

If the branch already exists, use `git switch <branch>` instead of `-c`.

### I committed on the wrong branch

Don't panic — the commit exists, it's just labeled wrong. Ask an instructor. This is a quick fix but it's easier to show than to describe, and the fix depends on the details.

### I switched branches and my changes disappeared

Nothing's lost. Either the changes are committed on the *other* branch (switch back and they reappear), or they're uncommitted and moved with you (check `git status`). Reload your browser — it may be showing the old file.

---

## Staging and committing

### `nothing to commit, working tree clean` but I made a change

One of:

- You didn't save the file. Save it and run `git status` again.
- You're editing a file in a different folder than the one Git is tracking. Check `pwd` and the editor's file path.
- You already committed it. Check `git log --oneline`.

### `nothing added to commit but untracked files present`

You ran `git commit` without staging. Run `git add <file>` first, then commit.

### I staged the wrong file

```bash
git restore --staged <file>
git status
```

Your edits stay on disk. The file just isn't queued for the next commit anymore.

### I want to undo my edits to a file completely

Only if you're sure you don't want them:

```bash
git status                # confirm the file shows as "modified"
git restore <file>        # back to the last commit's version
```

### My commit opened a text editor and I'm stuck

If it looks like Vim: press `Esc`, type `:wq`, press Enter to save and finish (or `:q!` to cancel the commit). Next time use `git commit -m "Your message"` so no editor opens.

---

## Pushing and GitHub

### Push fails with an authentication error

This is GitHub sign-in, not Git. Depending on your setup:

- A browser window may open asking you to sign in — do that, then the push continues.
- If it asks for a username and password, your GitHub *password* will not work. You need a Personal Access Token (github.com → Settings → Developer settings → Personal access tokens) pasted as the password.
- With SSH: `Permission denied (publickey)` means your key isn't registered with GitHub. Either add it, or switch this repository to HTTPS:
  ```bash
  git remote set-url origin https://github.com/<your-username>/broken-developer-dashboard.git
  ```

If this eats more than a couple of minutes, flag an instructor. The fallback ([docs/CODESPACES.md](docs/CODESPACES.md)) has no auth setup.

### `fatal: The current branch has no upstream branch`

First push of a new branch needs the full form:

```bash
git push -u origin <branch-name>
```

After that, plain `git push` works.

### GitHub doesn't show my latest commit

Committing is local. Did you push?

```bash
git status            # "Your branch is ahead of 'origin/...' by 1 commit" = not pushed yet
git push
```

Also check you're looking at the right *branch* on GitHub (branch dropdown, top-left of the file list). Feature branch commits won't show on `main` until merged.

### The Pull Request doesn't show my change

- Refresh the page.
- Check the PR's **Commits** tab. If your commit isn't there, it hasn't been pushed: `git status`, then `git push`.
- Check the PR is comparing the right branches: `base: main` ← `compare: feature/...`.
- If you committed on `main` instead of the feature branch, the PR won't include it. Ask an instructor.

### The PR shows two commits but I only made one for this feature

Your feature branch was created from a `main` that had a commit GitHub's `main` didn't have yet (probably the Mission 1 release fix). Push `main` and the PR will narrow down:

```bash
git push origin main
```

### Issue #1 didn't close when I merged

- Check the PR body contains `Closes #1` (or `Fixes #1` / `Resolves #1`) on its own line. Edit the PR description and add it if not. GitHub only reads keywords in the PR *description*, not comments.
- Check the number matches your Issue's actual number.
- If the PR was already merged, the auto-close won't run retroactively. Just close the Issue by hand — that's fine.

---

## Merging

### `git merge` says "Your local changes would be overwritten"

You have uncommitted edits. Commit them first (or `git restore` them if they were a mistake), then merge again.

### `git merge` says "Already up to date" and no conflict happened

The branch you're merging has nothing `main` doesn't already have. In Mission 5 this usually means the feature-branch commit didn't happen or happened on `main`. Check with `git log --oneline --graph --all`.

### The merge fast-forwarded and no conflict happened

Main didn't have its own commit. In Mission 5, make sure you committed the `Engineering Dashboard` change *on main* before merging. `git log --oneline main` should show that commit.

### I'm in the middle of a merge conflict and want to start over

```bash
git merge --abort
git status
```

You're back to where you were before `git merge`. Nothing lost.

### I resolved the conflict but `git commit` says something's still wrong

```bash
git status
```

If a file is listed under "Unmerged paths", you haven't `git add`ed it yet. If you did, open the file and search for `<<<<<<<` — a leftover marker means the resolution isn't complete.

### My editor's "Accept Current / Accept Incoming" buttons

Those apply one side wholesale. In Mission 5 you want a *third* answer (`Developer Dashboard`), so edit the text by hand and delete the marker lines. Then `git add` and `git commit`.

---

## Browser

### The dashboard looks unstyled / blank

Open `index.html` from inside the cloned repository folder — `styles.css` and `script.js` must be next to it. If you're viewing through a server (Codespaces), make sure the server was started in the repository folder.

### My change isn't showing in the browser

Save the file, then reload. Check you're on the branch you think you are (`git status`). Check the browser tab is showing the file from *this* clone (look at the address bar).

---

## When none of this matches

```bash
git status
git branch
git log --oneline --graph --all
```

Read all three, then ask an instructor and show them the output. Don't delete the repository and don't run any command with `--hard` or `--force` unless an instructor is looking at your screen.
