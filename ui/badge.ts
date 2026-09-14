// src/ui/badge.ts — etiqueta de estado. COPIADO.
//   Badge({ label: "Beta", variant: "accent" })
// Variantes: neutral | accent | success | warning | destructive | outline
import { defineComponent, html } from "@elurjs/core";

export interface BadgeProps {
    variant?: "neutral" | "accent" | "success" | "warning" | "destructive" | "outline";
    label?: string;
    [key: string]: unknown;
}

export const Badge = defineComponent<BadgeProps>((props, ctx) => html`
    <span data-elur="badge" data-variant=${() => props?.variant ?? "neutral"} props=${() => {
        const { variant: _v, label: _l, ...rest } = props ?? {};
        return rest;
    }}>${() => ctx.slot() ?? props?.label ?? ""}</span>`);
