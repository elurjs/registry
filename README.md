# Elur UI Registry

Fuentes **copiables** de componentes Elur. Esto NO es un paquete instalable —
los archivos se copian a `src/ui/` del proyecto del usuario (modelo shadcn:
el código es tuyo, edítalo libremente).

```text
registry/
├── registry.json          ← manifest: nombre, tipo, deps por componente
├── registry.schema.json   ← esquema del manifest
├── ui/
│   ├── tokens.css         ← tema "precision" (primitivos → semánticos → dark)
│   ├── ui.css             ← estilos por [data-elur="…"], editable
│   ├── icons.ts           ← ~40 iconos + createIcon() para sets externos
│   ├── index.ts           ← barrel
│   ├── COMPONENTES.md     ← referencia por componente (props, slots, ejemplos)
│   └── *.ts               ← 29 componentes
└── tsconfig.json          ← typecheck de los fuentes copiables
```

## Modelo

| Pieza | Dónde vive | Qué es |
| --- | --- | --- |
| `@elurjs/ui-brain` | npm | Headless: factories `createX` sobre máquinas zag + utils |
| `ui/*.ts` | `src/ui/` del usuario | Markup + variantes — **copiado, poseído** |
| `tokens.css`/`ui.css` | `src/ui/` del usuario | Tema — **copiado, poseído** |

Componentes machine-backed importan de `@elurjs/ui-brain/<entry>`:
`@elur ui add dialog` → copia `dialog.ts` + instala `@zag-js/dialog` (ver
`machineDeps` en `registry.json`).

## Contrato de estilos

- Selectores `[data-elur="<part>"]` — sin clases utilitarias.
- Estados de máquina: `[data-state]`, `[data-disabled]`, `[data-highlighted]`,
  `[data-selected]`, `[data-orientation]`, `[data-invalid]`.
- Variantes propias: `[data-variant]`, `[data-size]`.
- Todo el color/espacio/motion sale de `tokens.css` — cambiar tema = otro
  archivo de tokens, los `.ts` no se tocan.
- Dark: `document.documentElement.dataset.theme = "dark"`.

## Verificación

```bash
# typecheck de los fuentes copiables
../elur-ui-brain/node_modules/.bin/tsc -p registry/tsconfig.json
# integración (componentes montados en happy-dom)
cd ../elur-ui-brain && npx vitest run src/__tests__/registry-components.test.ts
```
