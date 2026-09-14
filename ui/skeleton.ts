// src/ui/skeleton.ts — placeholder de carga. COPIADO.
import { defineComponent, html } from "@elurjs/core";

export interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    [key: string]: unknown;
}

const px = (v?: string | number) => (typeof v === "number" ? `${v}px` : v);

export const Skeleton = defineComponent<SkeletonProps>((props) => html`
    <div data-elur="skeleton"
         aria-hidden="true"
         style=${() => `width:${px(props?.width) ?? "100%"};height:${px(props?.height) ?? "1rem"}`}
         props=${() => {
             const { width: _w, height: _h, style: _s, ...rest } = props ?? {};
             return rest;
         }}></div>`);
