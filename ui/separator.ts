// src/ui/separator.ts — hairline. COPIADO.
import { defineComponent, html } from "@elurjs/core";

export interface SeparatorProps {
    orientation?: "horizontal" | "vertical";
    [key: string]: unknown;
}

export const Separator = defineComponent<SeparatorProps>((props) => html`
    <div data-elur="separator"
         role="separator"
         data-orientation=${() => props?.orientation ?? "horizontal"}
         aria-orientation=${() => props?.orientation ?? "horizontal"}
         props=${() => {
             const { orientation: _o, ...rest } = props ?? {};
             return rest;
         }}></div>`);
