// src/ui/select.ts — COPIADO. @zag-js/select + createFloating.
//
//   Select({ value: sig, items: [{ value: "dark", label: "Oscuro" }], placeholder: "Tema" })

import { defineComponent, html, repeat, ref, effect } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createSelect, collection } from "@elurjs/ui-brain/select";
import { createFloating, createPresence, offset, flip, shift } from "@elurjs/ui-brain/utils";
import { CheckIcon, ChevronDownIcon } from "./icons.js";

export interface SelectItem {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps {
    value?: Signal<string[]> | string[] | string;
    items: SelectItem[];
    placeholder?: string;
    disabled?: boolean;
    [key: string]: unknown;
}

export const Select = defineComponent<SelectProps>((props, ctx) => {
    const triggerRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const items = () => props?.items ?? [];

    const s = createSelect({
        value: typeof props?.value === "string" ? [props.value] : props?.value,
        disabled: props?.disabled,
        collection: collection({ items: items() }),
    });
    ctx.onMount(() => s.start());
    ctx.onUnmount(() => s.stop());

    // La colección puede cambiar si `items` es reactivo.
    effect(() => {
        s.updateProps({ collection: collection({ items: items() }) });
    });

    const presence = createPresence(() => s.api.value.open);
    const pos = createFloating(triggerRef, contentRef, {
        placement: "bottom-start",
        middleware: [offset(4), flip(), shift({ padding: 8 })],
    });
    ctx.onMount(() => pos.start());
    effect(() => {
        if (presence.mounted.value) void pos.update();
    });

    return html`
        <div data-elur="select" props=${() => s.api.value.getRootProps()}>
            <button ref=${triggerRef} data-elur="select-trigger" props=${() => s.api.value.getTriggerProps()}>
                <span data-elur="select-value" data-placeholder=${() => (s.api.value.valueAsString ? undefined : "")}>
                    ${() => s.api.value.valueAsString || props?.placeholder || ""}
                </span>
                ${ChevronDownIcon({ size: 14, "aria-hidden": "true" })}
            </button>
            <div show=${() => presence.mounted.value}
                 ref=${contentRef}
                 data-elur="select-content"
                 data-state=${() => (s.api.value.open ? "open" : "closed")}
                 props=${() => ({ ...s.api.value.getContentProps(), style: pos.styles.value })}>
                ${() => repeat(items(), (i) => i.value, (i) => {
        const item = () => ({ value: i.value, label: i.label, disabled: i.disabled });
        return html`
                        <div data-elur="select-item" props=${() => s.api.value.getItemProps({ item: item() })}>
                            <span data-elur="select-item-text" props=${() => s.api.value.getItemTextProps({ item: item() })}>${i.label}</span>
                            <span data-elur="select-item-indicator" props=${() => s.api.value.getItemIndicatorProps({ item: item() })}>
                                ${CheckIcon({ size: 12, "aria-hidden": "true" })}
                            </span>
                        </div>`;
    })}
            </div>
        </div>`;
});
