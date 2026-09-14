// src/ui/toggle-group.ts — COPIADO. @zag-js/toggle-group.
//   ToggleGroup({ value: sig, items: [{ value: "l", label: "◧" }, …] })

import { defineComponent, html, repeat } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createToggleGroup } from "@elurjs/ui-brain/toggle-group";

export interface ToggleGroupItem {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface ToggleGroupProps {
    value?: Signal<string[]> | string[];
    items: ToggleGroupItem[];
    multiple?: boolean;
    disabled?: boolean;
    [key: string]: unknown;
}

export const ToggleGroup = defineComponent<ToggleGroupProps>((props, ctx) => {
    const g = createToggleGroup({
        value: props?.value,
        multiple: props?.multiple,
        disabled: props?.disabled,
    });
    ctx.onMount(() => g.start());
    ctx.onUnmount(() => g.stop());

    return html`
        <div data-elur="toggle-group" props=${() => g.api.value.getRootProps()}>
            ${() => repeat(props?.items ?? [], (i) => i.value, (i) => html`
                <button data-elur="toggle-group-item" props=${() => g.api.value.getItemProps({ value: i.value, disabled: i.disabled })}>
                    ${i.label}
                </button>`)}
        </div>`;
});
