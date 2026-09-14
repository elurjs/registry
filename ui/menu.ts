// src/ui/menu.ts — COPIADO. @zag-js/menu + createFloating.
//
//   Menu({ trigger: "Opciones", items: [
//       { value: "edit", label: "Editar" },
//       { value: "del", label: "Eliminar" },
//   ], on: { select: (v) => console.log(v) } })

import { defineComponent, html, repeat, ref, effect } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createMenu } from "@elurjs/ui-brain/menu";
import { createFloating, createPresence, offset, flip, shift } from "@elurjs/ui-brain/utils";
import { ChevronDownIcon } from "./icons.js";

export interface MenuItem {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface MenuProps {
    open?: Signal<boolean> | boolean;
    trigger?: string;
    items: MenuItem[];
    /** select: (value: string) => void — callback de selección de item. */
    on?: { select?: (value: string) => void };
    [key: string]: unknown;
}

export const Menu = defineComponent<MenuProps>((props, ctx) => {
    const triggerRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const items = () => props?.items ?? [];

    const m = createMenu({
        open: props?.open,
        onSelect: (d: { value: string }) => props?.on?.select?.(d.value),
    });
    ctx.onMount(() => m.start());
    ctx.onUnmount(() => m.stop());

    const presence = createPresence(() => m.api.value.open);
    const pos = createFloating(triggerRef, contentRef, {
        placement: "bottom-start",
        middleware: [offset(4), flip(), shift({ padding: 8 })],
    });
    ctx.onMount(() => pos.start());
    effect(() => {
        if (presence.mounted.value) void pos.update();
    });

    return html`
        <button ref=${triggerRef} data-elur="menu-trigger" props=${() => m.api.value.getTriggerProps()}>
            ${() => ctx.slot("trigger") ?? props?.trigger ?? ""}
            ${ChevronDownIcon({ size: 14, "aria-hidden": "true" })}
        </button>
        <div data-elur="menu-positioner" props=${() => m.api.value.getPositionerProps()}>
            <div show=${() => presence.mounted.value}
                 ref=${contentRef}
                 data-elur="menu-content"
                 data-state=${() => (m.api.value.open ? "open" : "closed")}
                 props=${() => ({ ...m.api.value.getContentProps(), style: pos.styles.value })}>
                ${() => repeat(items(), (i) => i.value, (i) => html`
                    <div data-elur="menu-item" props=${() => m.api.value.getItemProps({ value: i.value, disabled: i.disabled })}>
                        ${i.label}
                    </div>`)}
            </div>
        </div>`;
});
