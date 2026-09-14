// src/ui/label.ts — COPIADO.
import { defineComponent, html } from "@elurjs/core";

export interface LabelProps {
    for?: string;
    required?: boolean;
    [key: string]: unknown;
}

export const Label = defineComponent<LabelProps>((props, ctx) => html`
    <label data-elur="label" for=${() => props?.for} props=${() => {
        const { for: _f, required: _r, ...rest } = props ?? {};
        return rest;
    }}>
        ${() => ctx.slot()}
        ${() => (props?.required ? html`<span aria-hidden="true" data-elur="required">*</span>` : "")}
    </label>`);
