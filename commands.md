# Playwright Docker Commands

## Build Image

Build Docker image from Dockerfile.

```bash
docker compose build
```

Build without cache.

```bash
docker compose build --no-cache
```

---

## Run All Tests

Recommended (auto-removes container after execution):

```bash
docker compose run --rm playwright
```

---

## Rebuild and Run

```bash
docker compose build
docker compose run --rm playwright
```

---

## List Available Tests

```bash
docker compose run --rm playwright \
  npx playwright test --list
```

---

## Run Tests by Tag

Run custom tag:

```bash
docker compose run --rm playwright \
  npx playwright test --grep "@Test11"
```

Run smoke tests:

```bash
docker compose run --rm playwright \
  npx playwright test --grep "@smoke"
```

Run regression tests:

```bash
docker compose run --rm playwright \
  npx playwright test --grep "@regression"
```

Run sanity tests:

```bash
docker compose run --rm playwright \
  npx playwright test --grep "@sanity"
```

---

## List Tests Matching a Tag

```bash
docker compose run --rm playwright \
  npx playwright test --list --grep "@smoke"
```

```bash
docker compose run --rm playwright \
  npx playwright test --list --grep "@Test11"
```

---

## Run Multiple Tags

```bash
docker compose run --rm playwright \
  npx playwright test --grep "@smoke|@sanity"
```

---

## Exclude Tags

```bash
docker compose run --rm playwright \
  npx playwright test --grep-invert "@regression"
```

---

## Run Specific File

```bash
docker compose run --rm playwright \
  npx playwright test tests/ui/learning/learning.spec.ts
```

---

## Run Specific Test Name

```bash
docker compose run --rm playwright \
  npx playwright test -g "Login Test"
```

---

## Run Specific Browser

Chromium:

```bash
docker compose run --rm playwright \
  npx playwright test --project=chromium
```

Firefox:

```bash
docker compose run --rm playwright \
  npx playwright test --project=firefox
```

WebKit:

```bash
docker compose run --rm playwright \
  npx playwright test --project=webkit
```

---

## Update Visual Snapshots

```bash
docker compose run --rm playwright \
  npx playwright test --update-snapshots
```

---

## Open HTML Report

```bash
npx playwright show-report playwright-report
```

Linux:

```bash
xdg-open playwright-report/index.html
```

---

## Docker Inspection Commands

View images:

```bash
docker images
```

View running containers:

```bash
docker ps
```

View all containers:

```bash
docker ps -a
```

---

## Cleanup Commands

Remove orphan containers:

```bash
docker compose down --remove-orphans
```

Remove stopped containers:

```bash
docker container prune
```

Remove unused images:

```bash
docker image prune
```

Remove everything created by compose:

```bash
docker compose down
```

Remove compose resources including volumes:

```bash
docker compose down -v
```

---

## Enter Container Shell

If container is running:

```bash
docker exec -it playwright-tests bash
```

---

## Verify Playwright Version

```bash
docker compose run --rm playwright \
  npx playwright --version
```

---

## Verify Installed Browsers

```bash
docker compose run --rm playwright \
  npx playwright install --dry-run
```

---

# Daily Workflow

Build image:

```bash
docker compose build
```

List tests:

```bash
docker compose run --rm playwright \
  npx playwright test --list
```

Run all tests:

```bash
docker compose run --rm playwright
```

Run tagged tests:

```bash
docker compose run --rm playwright \
  npx playwright test --grep "@Test11"
```

Open report:

```bash
npx playwright show-report playwright-report
```
