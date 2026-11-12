# ui-test

A Next.js 16 app with two pages:

- **Disco Dice** at `/`
- **Work Days** at `/work-days`

People without coding tools get the app as a Docker image file. They follow [RUNNING.md](RUNNING.md).

## Developing

You need Node 24 and Docker Desktop.

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
```

`features/` holds the code for each page. `app/` holds the routes. See [AGENTS.md](AGENTS.md) for the project conventions.

## Releasing an update

Follow these steps each time you want people to get your changes.

1. **Check the app.** Run `npm run typecheck` and `npm run build`. Optionally run `docker compose up --build` and open http://localhost:3000 to try the real image.
2. **Commit your changes.** `npm version` needs a clean working tree.
3. **Bump the version.** This updates `package.json`, then creates a commit and a git tag such as `v1.0.1`:
   ```bash
   npm version patch   # small fix:     1.0.0 → 1.0.1
   npm version minor   # new feature:   1.0.0 → 1.1.0
   npm version major   # big change:    1.0.0 → 2.0.0
   ```
4. **Build the files.** Run `./scripts/package-docker.sh`. It takes about a minute and writes two files to `dist/`, for example:
   - `ui-test-1.0.1-intel.tar` for Windows PCs and Intel Macs
   - `ui-test-1.0.1-apple.tar` for Apple-chip Macs
5. **Send each person the file for their computer.** Each file is about 220 MB, so use a file-sharing link (Google Drive, Dropbox, AirDrop), not email. Tell them the version number and to follow **Getting an update** in RUNNING.md.
6. **Push.** Run `git push --follow-tags` to publish the commit and the version tag.

The `.tar` files are not stored in git, because they are too large: GitHub rejects files over 100 MB. The version tag records which code produced each file. To rebuild an old version, run `git checkout v1.0.1 && ./scripts/package-docker.sh`. You can delete old files in `dist/` once everyone has updated.

## What updates keep

Work Days data is saved in each person's browser, not in the container. Updating, stopping, or reinstalling the app does not erase it.

## Docker files

| File | Purpose |
| --- | --- |
| `Dockerfile` | Builds the app and runs it on port 3000. Uses `output: 'standalone'` in `next.config.ts`. |
| `.dockerignore` | Keeps `node_modules`, `.next`, `.git`, and `dist` out of the build. |
| `compose.yaml` | Lets you try the image locally with `docker compose up --build`. |
| `scripts/package-docker.sh` | Builds the versioned handoff files in `dist/`. |
| `RUNNING.md` | Install and update guide for people without coding tools. |
