// src/ui/button.ts — componente COPIADO: edítalo libremente.
//
//   Button({ variant: "primary", label: "Guardar", on: { click: save } })
//   Button({ loading: savingSignal, ... })  — loading puede ser Signal
//
// Variantes: primary | secondary | ghost | destructive | outline | link
// Tamaños:   sm | md | lg | icon

import { defineComponent, html } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { eventsOf, mergeProps } from "@elurjs/ui-brain/internal";
import { LoaderIcon } from "./icons.js";

export interface ButtonProps {
    variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline" | "link";
    size?: "sm" | "md" | "lg" | "icon";
    type?: "button" | "submit" | "reset";
    label?: string;
    disabled?: boolean | Signal<boolean>;
    loading?: boolean | Signal<boolean>;
    /** Eventos DOM — claves = nombre del evento (`@click` sin el `@`). */
    on?: Record<string, (e: Event) => void>;
    [key: string]: unknown;
}

export const Button = defineComponent<ButtonProps>((props, ctx) => {
    const variant = () => props?.variant ?? "primary";
    const size = () => props?.size ?? "md";
    const disabled = () => {
        const d = props?.disabled;
        return typeof d === "object" && d !== null && "value" in d ? (d as Signal<boolean>).value : !!d;
    };
    const loading = () => {
        const l = props?.loading;
        return typeof l === "object" && l !== null && "value" in l ? (l as Signal<boolean>).value : !!l;
    };

    return html`
        <button
            data-elur="button"
            data-variant=${variant}
            data-size=${size}
            type=${() => props?.type ?? "button"}
            disabled=${() => disabled() || loading() || undefined}
            aria-busy=${() => (loading() ? "true" : undefined)}
            props=${() => {
                const { variant: _v, size: _s, type: _t, label: _l, disabled: _d, loading: _lo, on, ...rest } = props ?? {};
                return mergeProps(rest, eventsOf(on));
            }}
        >
            ${() => (loading() ? html`<span data-elur="button-spinner">${LoaderIcon({ class: "elur-spin", "aria-hidden": "true" })}</span>` : "")}
            ${() => ctx.slot() ?? props?.label ?? ""}
        </button>`;
});
