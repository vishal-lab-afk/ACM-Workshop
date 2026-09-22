# Missions

Five missions take the Developer Dashboard from its current state to a shipped v1.0. Each one maps to a step of a real team workflow:

```
ISSUE → BRANCH → EDIT → git status / git diff → STAGE → COMMIT → PUSH → PULL REQUEST → CODE REVIEW → MERGE → ISSUE CLOSED
```

Each mission gives you the ticket, what "done" looks like, and hints behind collapsible sections. Try it first. Open a hint when you're stuck, not before. If you're completely lost, [TROUBLESHOOTING.md](TROUBLESHOOTING.md) has you covered.

The only file you'll edit is `index.html`. Reload it in your browser to see changes.

| # | Mission | You'll learn |
|---|---------|--------------|
| 1 | [Release Day](#mission-1--release-day) | working directory → staging → local commit |
| 2 | [Analytics Platform](#mission-2--analytics-platform) | feature branches |
| 3 | [Ship the Feature](#mission-3--ship-the-feature) | push, Issues, Pull Requests |
| 4 | [Changes Requested](#mission-4--changes-requested) | code review, updating a PR, merging |
| 5 | [Collision Course](#mission-5--collision-course) | merge conflicts |
| + | [Bonus](#bonus-missions) | optional practice |

---

## Mission 1 — Release Day

> **Ticket:** The Upcoming Release card still shows last sprint's information. We ship v1.0 on September 30, 2026. Update the card before the demo.

**Learning objective:** See a change move from your working directory, to the staging area, to a commit in your local repository — and notice that none of that touches GitHub.

**Branch:** `main` (you're already on it)

**Acceptance criteria**

- The Upcoming Release card shows **Version 1.0**
- The Upcoming Release card shows **September 30, 2026**
- The change is committed on `main`
- `git status` reports a clean working tree afterward

**Expected result**

The Upcoming Release card reads `Developer Dashboard · Version 1.0 · September 30, 2026`. `git log --oneline` shows your new commit at the top.

**Suggested commit message:** `Fix outdated release information`

<details>
<summary>Need a hint?</summary>

Look for the comment `<!-- Release information -->` in `index.html`. The two lines you need are right below it.

After editing and saving, run `git status` and then `git diff`. Read what they tell you before doing anything else. Where is the change right now?

</details>

<details>
<summary>Still stuck?</summary>

```bash
git status                       # modified: index.html  (working directory)
git diff                         # shows exactly what you changed
git add index.html               # → staging area
git status                       # "Changes to be committed"
git commit -m "Fix outdated release information"   # → local repository
git log --oneline                # your commit is at the top
```

Now open your repository on github.com and look at the release card in `index.html` there. It still says 0.8. Committing is local. Nothing has been pushed.

</details>

---

## Mission 2 — Analytics Platform

> **Ticket:** The team kicked off an Analytics Platform project last week and it's not on the dashboard. Add it to Active Projects.

**Learning objective:** Do feature work on its own branch so `main` stays untouched until the work is reviewed.

**Branch:** create `feature/analytics-platform` from `main`

**Acceptance criteria**

- A new branch named `feature/analytics-platform` exists and you're on it
- A new project card titled **Analytics Platform** appears in Active Projects
- Its status reads **In Progress** (yes, exactly that — it matters later)
- Any short description is fine, e.g. *Usage metrics and reporting for product teams.*
- The card is committed on the feature branch, not on `main`

**Expected result**

Four project cards. The new one is last. Its status badge is dimmed and has no status dot — the other three have one. Don't worry about that yet.

`git branch` shows `* feature/analytics-platform`. `git log --oneline` shows your new commit on top of the Mission 1 commit. If you `git switch main` and reload the browser, the card disappears; switch back and it returns. That's branches.

**Suggested commit message:** `Add Analytics Platform project`

<details>
<summary>Need a hint?</summary>

Create and switch to a branch in one command: `git switch -c <branch-name>`. Confirm with `git branch` or `git status`.

In `index.html`, find `<!-- Active project cards -->`. Each card is a five-line `<article>` block. Copy one and edit the three pieces of text.

</details>

<details>
<summary>Still stuck?</summary>

```bash
git switch -c feature/analytics-platform
git status                       # On branch feature/analytics-platform
```

Add this after the Onboarding Portal card, inside the `<div class="projects">`:

```html
          <article class="project">
            <h3>Analytics Platform</h3>
            <p>Usage metrics and reporting for product teams.</p>
            <span class="status">In Progress</span>
          </article>
```

Then:

```bash
git status
git diff
git add index.html
git commit -m "Add Analytics Platform project"
git log --oneline
```

</details>

---

## Mission 3 — Ship the Feature

> **Ticket:** Get the Analytics Platform work onto GitHub and open it for review.

**Learning objective:** Your laptop and GitHub are two different places. `git push` uploads a branch. A Pull Request is the review process for merging it. Those are separate steps.

**Branch:** `feature/analytics-platform`

**Acceptance criteria**

- `git remote -v` shows `origin` pointing at **your** repository
- `main` on GitHub shows the release fix from Mission 1
- `feature/analytics-platform` exists on GitHub
- An Issue exists in your repository describing the Analytics Platform feature (it should be Issue **#1**)
- A Pull Request exists from `feature/analytics-platform` into `main`, and its description contains `Closes #1`

**Expected result**

On github.com, your repository's branch dropdown lists both branches. The Pull Request page shows one commit (`Add Analytics Platform project`) and a diff of `index.html` with your new card. In the PR sidebar, Issue #1 appears under "Development" — GitHub linked them because of `Closes #1`.

Nothing has merged. `main` on GitHub does not have the card yet.

**Step by step**

1. Check where `origin` points:
   ```bash
   git remote -v
   ```
2. Push `main` first so GitHub has the release fix. You don't need to switch branches to do this:
   ```bash
   git push origin main
   ```
   Refresh the repository on github.com — `index.html` now says Version 1.0.
3. Push the feature branch and set it up to track `origin`:
   ```bash
   git push -u origin feature/analytics-platform
   ```
   `-u` means "remember that this local branch pairs with that remote branch," so plain `git push` and `git pull` work from now on.
4. **Create the Issue.** On github.com: **Issues** tab → **New issue** → choose **Feature request**. Title it `Add Analytics Platform project`. Fill in the template briefly. Submit. Note the number — it should be `#1`.
5. **Open the Pull Request.** GitHub usually shows a yellow banner: *"feature/analytics-platform had recent pushes — Compare & pull request."* Click it. Otherwise: **Pull requests** tab → **New pull request** → base `main`, compare `feature/analytics-platform`.
6. Fill in the PR:

   **Title:** `Add Analytics Platform project`

   **Body:**
   ```markdown
   ## What changed?

   Added the Analytics Platform to the Active Projects section.

   ## Why?

   The new project was missing from the dashboard.

   Closes #1
   ```
7. Click **Create pull request**. Don't merge yet.

**Why `Closes #1`?** GitHub reads that phrase. When the PR merges into the default branch, Issue #1 closes automatically and the two stay linked forever. `Fixes #1` and `Resolves #1` do the same thing.

<details>
<summary>Why did I push <code>main</code> first?</summary>

Your feature branch was created from your local `main`, which already had the Mission 1 commit. If GitHub's `main` doesn't have that commit yet, the PR would show *both* commits — the release fix and the feature — because GitHub compares your branch against *its* copy of `main`. Not broken, just noisy. Pushing `main` first keeps the PR focused on one change.

</details>

<details>
<summary>The push asked me to sign in / failed</summary>

That's authentication, not Git. See [TROUBLESHOOTING.md → Push authentication](TROUBLESHOOTING.md#push-fails-with-an-authentication-error).

</details>

---

## Mission 4 — Changes Requested

> **Review comment from a teammate:**
> "Please change the project status from `In Progress` to `Development` so it matches the dashboard's standard project statuses."

The dashboard uses four standard statuses: Planning, Development, Testing, Complete. `In Progress` isn't one of them — which is why the badge rendered dimmed, with no status dot.

**Learning objective:** A Pull Request tracks a branch, not a single commit. Respond to review by adding commits to the same branch; the PR updates itself. Then merge.

**Branch:** `feature/analytics-platform` (still)

**Acceptance criteria**

- You're on `feature/analytics-platform`
- The Analytics Platform card status reads **Development**
- The fix is a new commit on the feature branch, pushed to GitHub
- The *same* Pull Request now shows two commits
- The Pull Request is merged
- Issue #1 is closed — automatically

**Expected result**

The Analytics Platform badge gets a blue status dot, same as API Monitor. On GitHub, the PR's **Commits** tab lists `Add Analytics Platform project` and `Update Analytics Platform status`. After merging, the PR shows a purple **Merged** badge and Issue #1 shows **Closed** with a note that it was closed by your PR.

**Suggested commit message:** `Update Analytics Platform status`

**Step by step**

1. Optional but realistic: paste the reviewer's comment onto your PR as a comment. (GitHub won't let you formally "request changes" on your own PR — that's fine.)
2. Confirm your branch with `git status`. Edit the badge text. Commit. Push.
3. Refresh the PR. Check the Commits tab and the Files changed tab.
4. Click **Merge pull request** → **Confirm merge**. Leave the default merge method.
5. Check Issue #1. Closed.
6. GitHub offers to delete the branch on the remote. Either choice is fine.

<details>
<summary>Need a hint?</summary>

Same file, same card, one word. Then the same three commands as always. Because you used `-u` when you pushed, a plain `git push` is enough this time.

You do **not** open a new Pull Request.

</details>

<details>
<summary>Still stuck?</summary>

```bash
git status                       # On branch feature/analytics-platform
# edit: In Progress → Development
git diff
git add index.html
git commit -m "Update Analytics Platform status"
git push
```

Then merge on github.com.

</details>

---

## Mission 5 — Collision Course

> **Ticket:** Two teammates renamed the dashboard at the same time, in different ways. Bring the history back together.

**Learning objective:** Understand why merge conflicts happen and resolve one calmly. Git isn't broken. It found two different edits to the same line and needs a human to pick.

You'll play both developers yourself, so this conflict is guaranteed to happen and looks the same for everyone in the room.

**Branches:** `main` and a new `feature/dashboard-title`

**Acceptance criteria**

- Local `main` is up to date with GitHub (it has the merged Analytics Platform card)
- `feature/dashboard-title` changes the main `<h1>` heading to **Developer Command Center**
- `main` changes the same heading to **Engineering Dashboard**
- `git merge feature/dashboard-title` on `main` produces a conflict in `index.html`
- You resolve the heading to **Developer Dashboard** and commit the merge
- `git log --oneline --graph --all` shows the two lines of history joining

**Expected result**

The dashboard heading (top-left, next to the logo) reads **Developer Dashboard** again, and the Analytics Platform card is still there with status Development. `git status` is clean. The graph shows a fork and a merge.

**Suggested commit messages:** `Update dashboard title` (feature branch), `Update dashboard heading` (main), `Resolve dashboard title conflict` (merge)

**Step by step**

1. Get back onto `main` and pull the merged work down from GitHub:
   ```bash
   git switch main
   git pull
   ```
   Reload the browser: the Analytics Platform card is now on `main` locally.
2. Create `feature/dashboard-title`. Find `<!-- Main dashboard heading -->` in `index.html` and change the `<h1>` text to `Developer Command Center`. Change *only* the `<h1>` — leave the release card and the `<title>` alone. Commit.
3. Switch back to `main`. The heading is back to `Developer Dashboard` — confirm in the editor. Now pretend you're a teammate: change the same `<h1>` to `Engineering Dashboard`. Commit.
4. Still on `main`, merge the feature branch:
   ```bash
   git merge feature/dashboard-title
   ```
   Git stops: `CONFLICT (content): Merge conflict in index.html`. Run `git status`. It tells you exactly what's happening and what to do.
5. Open `index.html`. Find the conflict markers:
   ```
   <<<<<<< HEAD
         <h1>Engineering Dashboard</h1>
   =======
         <h1>Developer Command Center</h1>
   >>>>>>> feature/dashboard-title
   ```
   `HEAD` is the branch you're on (`main`). The bottom half is the branch you're merging in. Replace the whole block — markers included — with the single line you actually want:
   ```html
         <h1>Developer Dashboard</h1>
   ```
   Save. Reload the browser to confirm the page looks right.
6. Tell Git the conflict is resolved by staging the file, then commit the merge:
   ```bash
   git add index.html
   git status                       # "All conflicts fixed but you are still merging"
   git commit -m "Resolve dashboard title conflict"
   ```
7. Look at what you built:
   ```bash
   git log --oneline --graph --all
   ```

<details>
<summary>Need a hint?</summary>

Creating the branch and committing is Mission 2 again. The new part is step 4 onward. Take the conflict slowly: `git status` first, read the markers, delete the markers, keep one clean `<h1>` line, `git add`, `git commit`.

If your editor shows buttons like "Accept Current / Accept Incoming / Accept Both" — you want *neither* as-is. Edit the text by hand to `Developer Dashboard`, making sure no `<<<<<<<`, `=======`, or `>>>>>>>` lines remain.

</details>

<details>
<summary>Still stuck?</summary>

```bash
git switch main
git pull

git switch -c feature/dashboard-title
# edit <h1> → Developer Command Center
git add index.html
git commit -m "Update dashboard title"

git switch main
# edit <h1> → Engineering Dashboard
git add index.html
git commit -m "Update dashboard heading"

git merge feature/dashboard-title
# CONFLICT — edit index.html, resolve <h1> → Developer Dashboard, remove markers
git add index.html
git commit -m "Resolve dashboard title conflict"

git log --oneline --graph --all
```

Started the merge and want out? `git merge --abort` returns you to exactly where you were before `git merge`. Then try again.

</details>

**Why did this conflict?** The commit both branches started from had `Developer Dashboard` on that line. One branch changed it one way, the other branch changed it another way. Git merges line by line and will happily combine edits to *different* lines — but when the *same* line changes differently on both sides, there is no safe automatic answer. So it asks you.

Optional: push the result so GitHub's `main` matches your laptop:
```bash
git push
```

---

## You're done

Here's the full workflow you just ran, the way real teams run it:

```
ISSUE            "Add Analytics Platform project"          (#1)
  ↓
BRANCH           git switch -c feature/analytics-platform
  ↓
EDIT             index.html
  ↓
INSPECT          git status · git diff
  ↓
STAGE            git add index.html
  ↓
COMMIT           git commit -m "Add Analytics Platform project"
  ↓
PUSH             git push -u origin feature/analytics-platform
  ↓
PULL REQUEST     feature/analytics-platform → main, "Closes #1"
  ↓
CODE REVIEW      "Use Development, not In Progress" → commit → push → PR updates
  ↓
MERGE            Merge pull request
  ↓
ISSUE CLOSED     automatically
```

And the one habit to keep: **when confused, run `git status`.**

---

## Bonus missions

Optional. Do them after the workshop, or now if you're ahead. Each one is the Mission 2 → 3 → 4 loop again, which is exactly the point.

### Bonus A — Documentation quick link

> **Ticket:** Add a **Documentation** link to Quick Links pointing at <https://docs.github.com>.

Branch `feature/docs-link` → edit the list under `<!-- Quick links -->` → commit → push → Issue → PR with `Closes #<n>` → merge → `git switch main` → `git pull`.

### Bonus B — Another project card

> **Ticket:** Add a **Mobile App** project with status **Planning**.

Same loop, branch `feature/mobile-app`. Use one of the four standard statuses from the start this time.

### Bonus C — Read the history

No editing. Explore:

```bash
git log --oneline --graph --all
git log --oneline main
git log --oneline feature/dashboard-title
git diff main feature/dashboard-title
```

Then open **Insights → Network** on your repository on GitHub and compare it to the terminal graph. Same history, two views.

### Bonus D — Tidy up merged branches

Once a branch is merged you can delete the local copy. `-d` (lowercase) refuses to delete anything that isn't merged, so it's safe:

```bash
git branch -d feature/analytics-platform
git branch -d feature/dashboard-title
git branch
```

Deleting a branch deletes the *label*, not the commits — they're on `main` now.
