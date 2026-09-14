// src/ui/checkbox.ts — COPIADO. @zag-js/checkbox.
//
//   Checkbox({ checked: sig, label: "Acepto los términos" })

import { defineComponent, html } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createCheckbox } from "@elurjs/ui-brain/checkbox";
import { CheckIcon, MinusIcon } from "./icons.js";

export interface CheckboxProps {
    checked?: Signal<boolean> | boolean;
    label?: string;
    disabled?: boolean;
    [key: string]: unknown;
}

export const Checkbox = defineComponent<CheckboxProps>((props, ctx) => {
    const c = createCheckbox({ checked: props?.checked, disabled: props?.disabled });
    ctx.onMount(() => c.start());
    ctx.onUnmount(() => c.stop());

    return html`
        <label data-elur="checkbox" props=${() => c.api.value.getRootProps()}>
            <input props=${() => c.api.value.getHiddenInputProps()} />
            <span data-elur="checkbox-control" props=${() => c.api.value.getControlProps()}>
                ${() => {
                    const s = c.api.value;
                    if (s.checked) return CheckIcon({ size: 12, "aria-hidden": "true" });
                    if (s.indeterminate) return MinusIcon({ size: 12, "aria-hidden": "true" });
                    return "";
                }}
            </span>
            ${() => (props?.label ? html`
                <span data-elur="checkbox-label" props=${() => c.api.value.getLabelProps()}>${props.label}</span>` : "")}
        </label>`;
});
