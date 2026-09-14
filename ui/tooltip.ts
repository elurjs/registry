// src/ui/tooltip.ts — COPIADO. @zag-js/tooltip + createFloating.
//
//   Tooltip({ content: "Copiar" }, {
//       default: slot(() => Button({ label: "?", variant: "ghost" })),
//   })

import { defineComponent, html, ref, effect } from "@elurjs/core";
import { createTooltip } from "@elurjs/ui-brain/tooltip";
import { createFloating, createPresence, offset, flip, shift } from "@elurjs/ui-brain/utils";
import type { Placement } from "@elurjs/ui-brain/utils";

export interface TooltipProps {
    /** Texto del tooltip. El trigger es el slot default. */
    content?: string;
    /** Lado preferido (top | bottom | left | right…). */
    side?: Placement;
    openDelay?: number;
    closeDelay?: number;
    [key: string]: unknown;
}

export const Tooltip = defineComponent<TooltipProps>((props, ctx) => {
    const triggerRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const t = createTooltip({
        openDelay: props?.openDelay ?? 400,
        closeDelay: props?.closeDelay ?? 150,
    });
    ctx.onMount(() => t.start());
    ctx.onUnmount(() => t.stop());

    const presence = createPresence(() => t.api.value.open);
    const pos = createFloating(triggerRef, contentRef, {
        placement: props?.side ?? "top",
        middleware: [offset(6), flip(), shift({ padding: 8 })],
    });
    ctx.onMount(() => pos.start());
    effect(() => {
        if (presence.mounted.value) void pos.update();
    });

    return html`
        <span ref=${triggerRef} data-elur="tooltip-trigger" props=${() => t.api.value.getTriggerProps()}>
            ${() => ctx.slot()}
        </span>
        <div show=${() => presence.mounted.value}
             ref=${contentRef}
             data-elur="tooltip-content"
             data-state=${() => (t.api.value.open ? "open" : "closed")}
             props=${() => ({ ...t.api.value.getContentProps(), style: pos.styles.value })}>
            ${() => props?.content ?? ctx.slot("content")}
        </div>`;
});
