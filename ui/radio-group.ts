// src/ui/radio-group.ts — COPIADO. @zag-js/radio-group.
//
//   RadioGroup({ value: sig, items: [{ value: "a", label: "Opción A" }] })

import { defineComponent, html, repeat } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createRadioGroup } from "@elurjs/ui-brain/radio-group";

export interface RadioItem {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface RadioGroupProps {
    value?: Signal<string> | string;
    items: RadioItem[];
    disabled?: boolean;
    [key: string]: unknown;
}

export const RadioGroup = defineComponent<RadioGroupProps>((props, ctx) => {
    const r = createRadioGroup({ value: props?.value, disabled: props?.disabled });
    ctx.onMount(() => r.start());
    ctx.onUnmount(() => r.stop());

    return html`
        <div data-elur="radio-group" role="radiogroup" props=${() => r.api.value.getRootProps()}>
            ${() => repeat(props?.items ?? [], (i) => i.value, (i) => html`
                <label data-elur="radio-item" props=${() => r.api.value.getItemProps({ value: i.value, disabled: i.disabled })}>
                    <input props=${() => r.api.value.getItemHiddenInputProps({ value: i.value, disabled: i.disabled })} />
                    <span data-elur="radio-control" props=${() => r.api.value.getItemControlProps({ value: i.value, disabled: i.disabled })}></span>
                    <span data-elur="radio-label" props=${() => r.api.value.getItemTextProps({ value: i.value, disabled: i.disabled })}>${i.label}</span>
                </label>`)}
        </div>`;
});
