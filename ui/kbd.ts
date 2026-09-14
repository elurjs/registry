// src/ui/kbd.ts — tecla. COPIADO.
import { defineComponent, html } from "@elurjs/core";

export interface KbdProps {
    label?: string;
    [key: string]: unknown;
}

export const Kbd = defineComponent<KbdProps>((props, ctx) => html`
    <kbd data-elur="kbd" props=${() => {
        const { label: _l, ...rest } = props ?? {};
        return rest;
    }}>${() => ctx.slot() ?? props?.label ?? ""}</kbd>`);
