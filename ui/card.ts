// src/ui/card.ts — superficie elevada. COPIADO.
//
//   Card({ title: "Cuenta", description: "…" }, { default: slot(...), footer: slot(...) })

import { defineComponent, html } from "@elurjs/core";

export interface CardProps {
    title?: string;
    description?: string;
    [key: string]: unknown;
}

export const Card = defineComponent<CardProps>((props, ctx) => html`
    <div data-elur="card" props=${() => {
        const { title: _t, description: _d, ...rest } = props ?? {};
        return rest;
    }}>
        ${() => (props?.title || props?.description ? html`
            <div data-elur="card-header">
                ${props?.title ? html`<h3 data-elur="card-title">${props.title}</h3>` : ""}
                ${props?.description ? html`<p data-elur="card-desc">${props.description}</p>` : ""}
            </div>` : "")}
        <div data-elur="card-content">${() => ctx.slot()}</div>
        ${() => {
            const f = ctx.slot("footer");
            return f ? html`<div data-elur="card-footer">${f}</div>` : "";
        }}
    </div>`);
