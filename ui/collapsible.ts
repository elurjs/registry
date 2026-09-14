// src/ui/collapsible.ts — COPIADO. @zag-js/collapsible.
//   Collapsible({ open: sig, trigger: "Más info" }, { default: slot(...) })

import { defineComponent, html } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createCollapsible } from "@elurjs/ui-brain/collapsible";
import { createPresence } from "@elurjs/ui-brain/utils";

export interface CollapsibleProps {
    open?: Signal<boolean> | boolean;
    trigger?: string;
    [key: string]: unknown;
}

export const Collapsible = defineComponent<CollapsibleProps>((props, ctx) => {
    const c = createCollapsible({ open: props?.open });
    ctx.onMount(() => c.start());
    ctx.onUnmount(() => c.stop());
    const presence = createPresence(() => c.api.value.open);

    return html`
        <div data-elur="collapsible" props=${() => c.api.value.getRootProps()}>
            ${() => (props?.trigger ? html`
                <button data-elur="collapsible-trigger" props=${() => c.api.value.getTriggerProps()}>
                    ${props.trigger}
                    <span data-elur="collapsible-indicator" aria-hidden="true">▾</span>
                </button>` : ctx.slot("trigger"))}
            <div show=${() => presence.mounted.value}
                 data-elur="collapsible-content"
                 ref=${presence.ref}
                 data-state=${() => (c.api.value.open ? "open" : "closed")}
                 props=${() => c.api.value.getContentProps()}>
                ${() => ctx.slot()}
            </div>
        </div>`;
});
