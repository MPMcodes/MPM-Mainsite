# Sync workflow (mpm-mainsite)

Edit locally in this clone, then push — a single `git push` updates **both**
GitLab (master) and GitHub (copy) over SSH.

## Daily flow
```bash
git pull                      # fetches from GitLab
# ...edit...
git add -A && git commit -m "..."
git push                      # → GitLab + GitHub
```

## Remotes
- `origin` — fetch: GitLab; push: **GitLab + GitHub** (dual-push)
- `gitlab` — git@gitlab.com:garrenlbaker/mpm-mainsite.git (master)
- `github` — git@github.com:MPMcodes/MPM-Mainsite.git (copy)

No Lovable, no GitHub Actions, no deploy tokens — this box has SSH write to both remotes.

Shortcut: `/mpm_push [message]` commits pending changes and dual-pushes in one step.
