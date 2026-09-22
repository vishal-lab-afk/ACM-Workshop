# Git Cheat Sheet

Only the commands this workshop uses. Nothing here is destructive.

```
WORKING DIRECTORY  ──git add──►  STAGING AREA  ──git commit──►  LOCAL REPO  ──git push──►  GITHUB (origin)
```

## Inspect

| Command | What it tells you |
|---------|-------------------|
| `git status` | Which branch you're on, what's modified, what's staged, whether a merge is in progress. **Run this first, always.** |
| `git diff` | Line-by-line changes in your working directory that are not staged yet. |
| `git diff --staged` | Line-by-line changes that *are* staged (what the next commit will contain). |
| `git log --oneline` | Commit history of the current branch, one line each. |
| `git log --oneline --graph --all` | History of every branch, drawn as a graph. |
| `git branch` | Local branches. `*` marks the one you're on. |

## Stage and commit

| Command | What it does |
|---------|--------------|
| `git add <file>` | Stage that file's changes for the next commit. |
| `git add .` | Stage everything in the current folder. Check `git status` first. |
| `git commit -m "Message"` | Record the staged changes as a commit in your local repository. Nothing leaves your laptop. |

Commit messages: short, present tense, say what the change does. `Fix outdated release information`, not `changed stuff`.

## Branches

| Command | What it does |
|---------|--------------|
| `git switch -c <branch>` | Create a new branch from where you are and switch to it. |
| `git switch <branch>` | Switch to an existing branch. Your files change to match it. |
| `git branch` | List branches. |
| `git merge <branch>` | Bring `<branch>`'s commits into the branch you're currently on. |
| `git merge --abort` | Started a merge, want out? Back to before the merge. |

Branch names: lowercase, hyphens, a prefix that says what kind of work: `feature/analytics-platform`.

## Remote

| Command | What it does |
|---------|--------------|
| `git remote -v` | Show where `origin` points. Should be **your** GitHub repository. |
| `git push -u origin <branch>` | Upload a branch to GitHub for the first time and remember the pairing. |
| `git push` | Upload new commits on the current branch (after `-u` has been used once). |
| `git push origin main` | Push a specific branch without switching to it. |
| `git pull` | Download and merge new commits from GitHub into the current branch. |

`git push` does **not** merge anything into `main`. A Pull Request on GitHub does that, after review.

## Safe recovery

| Command | What it does |
|---------|--------------|
| `git restore <file>` | Throw away *unstaged* edits to that file. Back to the last commit. |
| `git restore --staged <file>` | Unstage a file. Your edits stay on disk; they're just not queued for the commit anymore. |
| `git merge --abort` | Cancel an in-progress merge. |

If you don't recognize the state you're in, `git status` says what's going on and usually what to do about it. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for specific situations.

## Reading a merge conflict

```
<<<<<<< HEAD
    the version on the branch you're on
=======
    the version on the branch you're merging in
>>>>>>> feature/some-branch
```

Edit the block into what you actually want, delete all three marker lines, save, `git add <file>`, `git commit`.
