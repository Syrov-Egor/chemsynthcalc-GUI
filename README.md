# chemsynthcalc-GUI

Chemistry synthesis calculator — one codebase, two targets:

| Target | Backend | Adapter | Entry |
| --- | --- | --- | --- |
| Desktop (Wails v3) | Go (native) | `frontend/src/lib/platform/wails.ts` | `main.go` |
| Web (browser) | TinyGo WASM in a Web Worker | `frontend/src/lib/platform/web.ts` | `cmd/wasm/main.go` |

The Svelte app in `frontend/` is shared. Components never talk to WASM or
Wails directly: they import `$platform`, a Vite alias resolved from the build
mode (`--mode desktop` → `wails.ts`, `--mode web` → `web.ts`), and gate
optional features on `platform.capabilities`. As a result the desktop bundle
contains no `.wasm` and the web bundle no Wails bindings.

## Layout

```
main.go                     Wails v3 app: window, services, embeds frontend/dist
main_test.go                Checks the embedded dist serves "/" and its assets
desktop/                    Wails-only services (native dialogs, file export)
internal/bridge/            Shared calculator core (TinyGo-compatible)
  types.go                  CalcRequest/CalcResult JSON contract (single source of truth)
  logic.go                  Balancing / formula / masses logic
cmd/wasm/main.go            TinyGo WASM entrypoint exposing the bridge to JS
frontend/
  src/lib/platform/         types.ts (contract) + web.ts + wails.ts (adapters)
  src/scripts/              Calculation manager and save/load/export helpers
  src/lib/FileMenu.svelte   Save / Load / Export / Exit, capability-gated
  bindings/                 Generated Wails v3 bindings (committed)
  src/lib/wasm/             main.wasm + wasm_exec_tiny.js (built artifact)
.github/workflows/          CI, Pages deploy, desktop release builds
```

The desktop-only code (excelize, Wails) lives in `desktop/`; the shared core
in `internal/bridge/` must stay buildable by TinyGo, so it must not import
either.

## Prerequisites

- Go 1.25+
- Node.js 22+
- [Wails v3 CLI](https://v3.wails.io): `go install github.com/wailsapp/wails/v3/cmd/wails3@latest`
- [TinyGo](https://tinygo.org) (only for the web/WASM target)

## Tasks

Run tasks with `wails3 task <name>` (or `task <name>` if you have
[go-task](https://taskfile.dev) installed):

| Task | What it does |
| --- | --- |
| `install` | `npm install` in `frontend/` |
| `check` | svelte-check + `go vet` + `go test` |
| `dev` | Desktop dev mode: Vite (hot reload) + the Go app pointed at it |
| `build` | Production desktop app → `bin/chemsynthcalc` (frontend + embedded dist) |
| `bindings` | Regenerate `frontend/bindings` after changing service signatures |
| `wasm` | Rebuild `main.wasm` and its runtime shim (TinyGo) |
| `frontend:desktop` / `frontend:web` | Build `frontend/dist` for one target only |
| `build:web` | `wasm` + web frontend → `frontend/dist` (base `/chemsynthcalc-GUI/`) |

Frontend-only shortcuts (run inside `frontend/`): `npm run dev` (desktop),
`npm run dev:web`, `npm run build:desktop`, `npm run build:web`.

`go build`/`go test` embed `frontend/dist`, so build the desktop frontend
first (`wails3 task frontend:desktop`). A web build left in `dist` is detected
by `main_test.go` and skipped rather than failing confusingly.

## Deploying the web version

`build:web` output goes to `frontend/dist` with base path `/chemsynthcalc-GUI/`.
The `pages.yml` workflow builds it and publishes to GitHub Pages on every push
to the default branch (requires Pages → Source: GitHub Actions).

## Releasing the desktop app

Push a `v*` tag: `release.yml` builds Linux (GTK4/WebKitGTK 6), Windows
(CGO off, `-H windowsgui`) and macOS (arm64) binaries and attaches them to the
GitHub release.

## Development notes

- `CalcRequest` / `CalcResult` / `AppState` field names are defined in
  `internal/bridge/types.go` (and `desktop/file_service.go` for `AppState`) and
  mirrored by `frontend/src/lib/platform/types.ts` — keep both in sync, then
  run `wails3 task bindings`.
- The Go dependency `github.com/Syrov-Egor/gosynthcalc` is pinned to `v0.1.9`;
  newer versions renamed fields and break the code. Don't `go get -u` blindly.
- `frontend/bindings` is committed so a fresh clone builds without running the
  generator; regenerate it whenever a bound service signature changes.
