---
name: release-notes
description: Draft the changelog entry for the next Easy p5.js Block release from the commits since the last release, and write it into readme.txt and readme.md. Use when preparing a release, or when asked for release notes or a changelog entry.
argument-hint: "[version, e.g. 1.2.0]"
---

# Release notes

Write the changelog entry for the next release of this plugin. The entry in
`readme.txt` is what WordPress.org shows on the plugin page and what the release
workflow (`.github/workflows/release-draft.yml`) uses as the GitHub release body, so
it is written for plugin users, not developers.

## 1. Find what changed

- Last released version: the `Stable tag:` in `readme.txt`.
- Last release commit: `git describe --tags --abbrev=0` if a tag exists.
  Releases before 1.1.3 were not tagged in git; in that case use the commit that
  last changed the version, `git log -1 --format=%H -S"Stable tag: <version>" -- readme.txt`.
- Read `git log --no-merges <commit>..HEAD` and, for anything unclear, the diff
  (`git show <sha> -- src assets gutenbergp5.php`).

## 2. Pick the version

Use `$ARGUMENTS` if given. Otherwise propose one following semver, as it
applies to a block plugin, and ask the user to confirm. The highest matching
row wins:

| Bump | When |
|---|---|
| Major | `src/save.js` output changes without a block deprecation (existing blocks show "This block contains unexpected content"). A p5.js major upgrade (users' sketches can break, e.g. 1.x to 2.x). "Requires at least" or "Requires PHP" raised. A block attribute in `src/block.json` removed or renamed. |
| Minor | New block setting or feature. p5.js minor update. `src/save.js` output change that comes with a deprecation. |
| Patch | Bug fixes, p5.js patch update, "Tested up to" bump, translations, readme content. |
| No release | Only dev tooling changed (CI, docker, lint, `.wordpress-org` assets, `.claude`). Say so instead of inventing a version. |

Give the reasoning with the commit that drives it ("minor, because abc1234
adds a scrollbar setting"). Flag anything risky even if it does not change the
bump, for example a `src/save.js` change where you cannot find a matching
deprecation, or a p5.js update (check the p5.js version in `assets/js/p5.min.js`
and the one stated in `readme.txt`).

Do not change any version numbers yourself: `npm version` does that.

## 3. Write the entry

Keep only changes a site owner or editor would notice: block features and
settings, bug fixes, p5.js version updates, compatibility ("Tested up to",
"Requires at least", "Requires PHP"), security fixes. Leave out dev tooling,
CI, docker, lint, refactors and docs. A release that only bumps "Tested up to"
gets a single "Tested with WordPress X.Y." line.

Style, matching the existing entries:
- One short sentence per item, past tense, ending with a period
  ("Added …", "Fixed …", "Updated p5.js to 1.11.0.").
- Describe the effect, not the implementation.
- If "Tested up to" changed in `readme.txt`, include a "Tested with WordPress X.Y." item.
- When an entry for this version already exists, rewrite it in place instead
  of adding a second one.

Add the entry at the top of both changelogs:

`readme.txt` (under `== Changelog ==`):

```
1.2.0

- Added …
- Fixed …
```

`readme.md` (under `## Changelog`):

```
### 1.2.0
* Added …
* Fixed …
```

## 4. Hand over

Show the user the entry and list the commits you left out, so they can
disagree. Then remind them of the release steps, with the actual version filled
in. The changelog must be committed first: `npm version` refuses to run while
tracked files have uncommitted changes. Name the files explicitly so other
uncommitted work stays out of the commit.

```
git commit -m "docs: changelog for <version>" readme.txt readme.md
npm version <version>
git push --follow-tags
```

If `git status` shows other modified tracked files, warn that `npm version`
will refuse to run until they are committed or stashed.

The tag push creates a draft GitHub release with the zip and this entry.
Publishing that draft deploys it to WordPress.org.

Do not commit, tag or push yourself.
