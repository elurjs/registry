// src/ui/icons.ts — iconos Elur. Archivo COPIADO: edítalo libremente.
//
//   import { CheckIcon, ChevronDownIcon } from "./ui/icons.js";
//   html`${CheckIcon({ size: 16 })}`
//
// - size: number | string | Signal — por defecto "1em" (hereda contexto)
// - strokeWidth, class, className — props libres
// - stroke="currentColor" → hereda el color de texto/tokens
//
// Añade iconos desde cualquier set (Iconify/Lucide/Tabler): pega el contenido
// SVG dentro de createIcon({ viewBox, content }) o `elur ui add icon mdi:home`.

import { defineComponent, html, raw } from "@elurjs/core";
import type { Signal } from "@elurjs/core";

export interface IconProps {
    size?: number | string | Signal<number | string>;
    strokeWidth?: number | Signal<number>;
    class?: string;
    title?: string;
    [key: string]: unknown;
}

export interface IconDef {
    viewBox?: string;
    /** Contenido interno del SVG (paths, circles…) como string html. */
    content: string;
    /** stroke (default, estilo Lucide) | fill (estilo Tabler-filled). */
    mode?: "stroke" | "fill";
}

/** Genera un componente icono Elur a partir de contenido SVG. */
export function createIcon(def: IconDef) {
    return defineComponent<IconProps>((props) => {
        const size = () => props?.size ?? "1em";
        const strokeW = () => props?.strokeWidth ?? (def.mode === "fill" ? 0 : 2);
        const fill = def.mode === "fill" ? "currentColor" : "none";
        const stroke = def.mode === "fill" ? "none" : "currentColor";
        return html`
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox=${def.viewBox ?? "0 0 24 24"}
                width=${size}
                height=${size}
                fill=${fill}
                stroke=${stroke}
                stroke-width=${strokeW}
                stroke-linecap="round"
                stroke-linejoin="round"
                class=${() => props?.class ?? ""}
                role=${() => (props?.title ? "img" : undefined)}
                aria-hidden=${() => (props?.title ? undefined : "true")}
                props=${() => {
                const { size: _s, strokeWidth: _w, class: _c, title: _t, ...rest } = props ?? {};
                return rest;
            }}
            >
                ${() => (props?.title ? html`<title>${props.title}</title>` : "")}
                ${raw(def.content)}
            </svg>`;
    });
}

// ── Set inicial — estilo Lucide (stroke, 24×24) ────────────────────────────

export const CheckIcon = createIcon({ content: `<path d="M20 6 9 17l-5-5"/>` });
export const XIcon = createIcon({ content: `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>` });
export const PlusIcon = createIcon({ content: `<path d="M5 12h14"/><path d="M12 5v14"/>` });
export const MinusIcon = createIcon({ content: `<path d="M5 12h14"/>` });
export const SearchIcon = createIcon({ content: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>` });
export const MenuIcon = createIcon({ content: `<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>` });

export const ChevronDownIcon = createIcon({ content: `<path d="m6 9 6 6 6-6"/>` });
export const ChevronUpIcon = createIcon({ content: `<path d="m18 15-6-6-6 6"/>` });
export const ChevronLeftIcon = createIcon({ content: `<path d="m15 18-6-6 6-6"/>` });
export const ChevronRightIcon = createIcon({ content: `<path d="m9 18 6-6-6-6"/>` });
export const ChevronsUpDownIcon = createIcon({ content: `<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>` });
export const ArrowLeftIcon = createIcon({ content: `<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>` });
export const ArrowRightIcon = createIcon({ content: `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>` });
export const ArrowUpIcon = createIcon({ content: `<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>` });
export const ArrowDownIcon = createIcon({ content: `<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>` });
export const ExternalLinkIcon = createIcon({ content: `<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>` });

export const InfoIcon = createIcon({ content: `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>` });
export const AlertTriangleIcon = createIcon({ content: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>` });
export const AlertCircleIcon = createIcon({ content: `<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>` });
export const CheckCircleIcon = createIcon({ content: `<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>` });
export const XCircleIcon = createIcon({ content: `<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>` });

export const EyeIcon = createIcon({ content: `<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>` });
export const EyeOffIcon = createIcon({ content: `<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>` });
export const CopyIcon = createIcon({ content: `<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>` });
export const DownloadIcon = createIcon({ content: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>` });
export const UploadIcon = createIcon({ content: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>` });
export const TrashIcon = createIcon({ content: `<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>` });
export const EditIcon = createIcon({ content: `<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>` });
export const SettingsIcon = createIcon({ content: `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>` });

export const UserIcon = createIcon({ content: `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>` });
export const UsersIcon = createIcon({ content: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>` });
export const HomeIcon = createIcon({ content: `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>` });
export const CalendarIcon = createIcon({ content: `<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>` });
export const ClockIcon = createIcon({ content: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>` });
export const StarIcon = createIcon({ content: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>` });
export const HeartIcon = createIcon({ content: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>` });
export const MoreHorizontalIcon = createIcon({ content: `<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>` });
export const MoreVerticalIcon = createIcon({ content: `<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>` });
export const FilterIcon = createIcon({ content: `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>` });
export const GripVerticalIcon = createIcon({ content: `<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>` });

/** Spinner — para `loading` de Button, Suspense, etc. */
export const LoaderIcon = createIcon({ content: `<path d="M21 12a9 9 0 1 1-6.219-8.56"/>` });
