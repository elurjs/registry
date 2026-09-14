# Changelog

All notable changes to this project will be documented in this file.

## v0.1.0

Initial release — copyable Elur UI component sources (shadcn model:
the code is copied into your project and owned by you). Not an
installable package; consumed via `registry.json` + the future
`elur ui add` CLI.

### Added

- **`ui/tokens.css`** — full "precision" theme: cold gray + elur blue
  OKLCH scales, light/dark semantic tokens, radii, control heights,
  typography, motion (≤300 ms), keyframes, double focus ring.
- **`ui/ui.css`** — ~740 lines of styles per `[data-elur]` attribute
  with `data-state` / `data-variant` / `data-size` / `data-part`
  contracts. Hairline borders over shadows, dark-first design.
- **`ui/icons.ts`** — ~40 `defineComponent` icons (Lucide/Tabler-style
  paths) plus `createIcon()` for external icon sets.
- **29 copyable components** (`ui/*.ts`):
  - Pure markup: button, input, textarea, field, label, card, badge,
    alert, separator, skeleton, kbd, table.
  - Machine-backed (via `@elurjs/ui-brain`): dialog, tabs, accordion,
    checkbox, switch, collapsible, radio-group, slider, tooltip,
    popover, menu, select, progress, avatar, toggle, toggle-group,
    toast.
  - Controlled signals (`Signal<T>` or primitive initial value),
    `on` event maps, `slot()` composition, `data-elur` styling hooks.
- **`registry.json` + `registry.schema.json`** — per-component manifest
  with `dependencies`, `brainImports` and `machineDeps`, ready for the
  `elur ui add` CLI to resolve copy + install.
- **Docs** — `README.md` (copy model, contracts, verification) and
  `ui/COMPONENTES.md` (per-component props/slots/examples reference,
  in Spanish).
- **`tsconfig.json`** — typecheck of the copyable sources against
  `@elurjs/core` and `@elurjs/ui-brain`.

Requires `@elurjs/core >= 4.0.2` (uses the `props=` template binding)
and `@elurjs/ui-brain >= 0.1.0` for machine-backed components.
