# Componentes — referencia

Referencia de los archivos copiables de `ui/`. Cada componente es un
`defineComponent` — se invoca como `Comp(props, slots?)` dentro de un
`html`` del padre.

**Convenciones comunes:**

- **Signals controladas**: props de estado (`open`, `value`, `checked`…)
  aceptan `Signal<T>` (bidireccional — la máquina escribe en ella) o valor
  inicial primitivo.
- **`on` map**: eventos DOM como `on: { click: fn }` — se traduce a
  delegación Elur (`@evento`); en máquinas zag hay callbacks semánticos
  (`on: { select: (v) => … }`).
- **`label`**: texto simple; para markup rico usa el slot `default`.
- **`slot()`**: `default` = contenido principal; nombrados por componente.
- `[data-elur="…"]` + `[data-variant]`/`[data-size]` → estilos en `ui.css`.
- Extra props → `props=` spread sobre el elemento raíz (`aria-*`, `id`,
  `class`, `data-*`, `style`, handlers `on*`).

---

## Formulario

### Button

```ts
Button({ variant: "primary", size: "md", label: "Guardar",
         disabled, loading, type: "submit", on: { click: save } })
```

| Prop | Tipo | Notas |
| --- | --- | --- |
| `variant` | `primary \| secondary \| ghost \| destructive \| outline \| link` | default `primary` |
| `size` | `sm \| md \| lg \| icon` | default `md` |
| `label` | `string` | alternativa al slot |
| `disabled` | `boolean \| Signal<boolean>` | reactivo |
| `loading` | `boolean \| Signal<boolean>` | spinner + `aria-busy` + disabled |
| `on` | `{ click?, … }` | eventos DOM |

Slot `default` > `label`.

### Input / Textarea

```ts
Input({ placeholder, field: form.fields.email })
Textarea({ rows: 4, field: form.fields.bio })
```

| Prop | Tipo | Notas |
| --- | --- | --- |
| `field` | `FieldState` de `createForm` | enlaza `value`/`onInput`/`onBlur`/`error`→`aria-invalid` |
| `value` | `Signal<string> \| string` | sin `field` |
| `invalid` | `boolean` | fuerza estado error |
| `type`, `placeholder`, `disabled`, `rows` (textarea) | — | estándar |

### Field

```ts
Field({ label: "Email", description: "…", field: form.fields.email }, {
    default: slot(() => Input({ field: form.fields.email })),
})
```

| Prop | Notas |
| --- | --- |
| `label`, `description` | texto |
| `field` | FieldState → renderiza `error` con `role="alert"` |
| `controlId` | id para `for`/`aria-*` (auto-generado si no se pasa) |

### Checkbox

```ts
Checkbox({ checked: sig, label: "Acepto los términos", disabled })
```

`checked: Signal<boolean> | boolean` — bidireccional. Incluye hidden input
nativo (participa en forms). Soporta `indeterminate` vía máquina.

### Switch

```ts
Switch({ checked: sig, label: "Notificaciones" })
```

Mismo contrato que Checkbox. Track 36×20 con thumb animado.

### RadioGroup

```ts
RadioGroup({ value: sig, items: [{ value: "a", label: "Opción A", disabled? }] })
```

`value: Signal<string> | string`. Roving tabindex + flechas (zag).

### Slider

```ts
Slider({ value: sig, min: 0, max: 100, step: 1 })
```

`value: Signal<number[]> | number[] | number` (número suelto → `[n]`).

### Select

```ts
Select({ value: sig, placeholder: "Tema",
         items: [{ value: "dark", label: "Oscuro", disabled? }] })
```

`value: Signal<string[]> | string[] | string`. Floating-ui (offset/flip/
shift) + presence. `collection` se reconstruye si `items` cambia.

### Toggle / ToggleGroup

```ts
Toggle({ pressed: sig, label: "Negrita" })
ToggleGroup({ value: sigArray, multiple: true, items: [{ value, label }] })
```

---

## Overlays

### Dialog

```ts
Dialog({ open: sig, title: "…", description: "…" }, {
    default: slot(() => html`<p>Cuerpo</p>`),
    actions: slot(() => Button({ label: "Aceptar", on: { click: ok } })),
})
```

| Prop | Notas |
| --- | --- |
| `open` | `Signal<boolean>` bidireccional — cerrar (Esc/backdrop) escribe `false` |
| `title`, `description` | con props ARIA de la máquina |
| slots | `default` (cuerpo), `actions` (pie) |

Focus trap + scroll lock + restore-focus vía zag. Presence para animación
de salida (`data-state="open|closed"`).

### Popover / Tooltip

```ts
Popover({ open: sig, trigger: "Abrir", placement: "bottom-start" }, {
    default: slot(() => html`…`),
})
Tooltip({ content: "Copiar", side: "top", openDelay: 400 }, {
    default: slot(() => triggerComponent),
})
```

Posicionados con `createFloating` (offset 6/4px, flip, shift). Tooltip:
`content` prop o slot `content`; trigger = slot `default`.

### Menu

```ts
Menu({ trigger: "Opciones", items: [{ value, label, disabled? }],
       on: { select: (v) => … } })
```

`open` controlable por signal. `on.select` recibe el `value` del item.

### Collapsible / Accordion

```ts
Collapsible({ open: sig, trigger: "Más info" }, { default: slot(…) })
Accordion({ value: sig, multiple, collapsible, items: [
    { value: "a", title: "…", content: html`…`, disabled? }] })
```

Presence + `data-state` para animar altura.

### Toast / Toaster

```ts
const toaster = createToaster({ placement: "bottom-end", duration: 5000 });
toaster.success({ title: "Guardado", description: "…" });
// montar UNA vez:
Toaster({ toaster })
```

Store acciones: `toast|success|error|info|warning|loading(opts)`,
`dismiss(id?)`, `update`, `remove`. Render por `repeat` + `data-type`.

---

## Navegación y datos

### Tabs

```ts
Tabs({ value: sig, items: [{ value: "a", label: "Cuenta", content, disabled? }] })
```

`value: Signal<string> | string`. Selección: `aria-selected` +
`data-selected`; underline via CSS.

### Table

```ts
Table({ head: ["A", "B"], rows: [[c1, c2], …], caption: "…" })
```

o slot `default` con `<tr>`s para control total.

### Progress / Avatar

```ts
Progress({ value: sig, min: 0, max: 100 })
Avatar({ src: url, name: "Nombre Apellido" })   // fallback = iniciales
```

---

## Puros (sin máquina)

| Componente | Props clave | Notas |
| --- | --- | --- |
| `Badge` | `variant`: neutral/accent/success/warning/destructive/outline, `label` | pill |
| `Alert` | `variant`: info/success/warning/destructive, `title` | icono automático + `role="alert"` |
| `Card` | `title`, `description` | slots `default`, `footer` |
| `Separator` | `orientation`: horizontal/vertical | `role="separator"` |
| `Skeleton` | `width`, `height` | pulso animado |
| `Kbd` | `label` | tecla |
| `Label` | `for`, `required` | asterisco |

## Iconos (`icons.ts`)

```ts
CheckIcon({ size: 16, strokeWidth: 2, class: "elur-spin", title: "OK" })
```

`size`: `number | string | Signal` (default `1em` — hereda contexto);
`title` → `role="img"` accesible (sin él → `aria-hidden`). `createIcon({
viewBox?, content, mode? })` genera nuevos — pega contenido SVG de
Iconify/Lucide/Tabler.
