// src/ui/toggle.ts — COPIADO. @zag-js/toggle.
//   Toggle({ pressed: sig, label: "Negrita" })

import { defineComponent, html } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createToggle } from "@elurjs/ui-brain/toggle";

export interface ToggleProps {
    pressed?: Signal<boolean> | boolean;
    label?: string;
    disabled?: boolean;
    [key: string]: unknown;
}

export const Toggle = defineComponent<ToggleProps>((props, ctx) => {
    const t = createToggle({ pressed: props?.pressed, disabled: props?.disabled });
    ctx.onMount(() => t.start());
    ctx.onUnmount(() => t.stop());

    return html`
        <button data-elur="toggle" props=${() => t.api.value.getRootProps()}>
            ${() => ctx.slot() ?? props?.label ?? ""}
        </button>`;
});
