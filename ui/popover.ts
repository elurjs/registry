// src/ui/popover.ts — COPIADO. @zag-js/popover + createFloating.
//
//   Popover({ trigger: "Abrir" }, { default: slot(() => html`…contenido…`) })

import { defineComponent, html, ref, effect } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createPopover } from "@elurjs/ui-brain/popover";
import { createFloating, createPresence, offset, flip, shift } from "@elurjs/ui-brain/utils";
import type { Placement } from "@elurjs/ui-brain/utils";

export interface PopoverProps {
    open?: Signal<boolean> | boolean;
    trigger?: string;
    placement?: Placement;
    [key: string]: unknown;
}

export const Popover = defineComponent<PopoverProps>((props, ctx) => {
    const triggerRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const p = createPopover({ open: props?.open });
    ctx.onMount(() => p.start());
    ctx.onUnmount(() => p.stop());

    const presence = createPresence(() => p.api.value.open);
    const pos = createFloating(triggerRef, contentRef, {
        placement: props?.placement ?? "bottom-start",
        middleware: [offset(6), flip(), shift({ padding: 8 })],
    });
    ctx.onMount(() => pos.start());
    effect(() => {
        if (presence.mounted.value) void pos.update();
    });

    return html`
        <button ref=${triggerRef} data-elur="popover-trigger" props=${() => p.api.value.getTriggerProps()}>
            ${() => ctx.slot("trigger") ?? props?.trigger ?? ""}
        </button>
        <div show=${() => presence.mounted.value}
             ref=${contentRef}
             data-elur="popover-content"
             data-state=${() => (p.api.value.open ? "open" : "closed")}
             props=${() => ({ ...p.api.value.getContentProps(), style: pos.styles.value })}>
            ${() => ctx.slot()}
        </div>`;
});
