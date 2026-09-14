// src/ui/switch.ts — COPIADO. @zag-js/switch.
//   Switch({ checked: sig, label: "Notificaciones" })

import { defineComponent, html } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createSwitch } from "@elurjs/ui-brain/switch";

export interface SwitchProps {
    checked?: Signal<boolean> | boolean;
    label?: string;
    disabled?: boolean;
    [key: string]: unknown;
}

export const Switch = defineComponent<SwitchProps>((props, ctx) => {
    const s = createSwitch({ checked: props?.checked, disabled: props?.disabled });
    ctx.onMount(() => s.start());
    ctx.onUnmount(() => s.stop());

    return html`
        <label data-elur="switch" props=${() => s.api.value.getRootProps()}>
            <input props=${() => s.api.value.getHiddenInputProps()} />
            <span data-elur="switch-track" props=${() => s.api.value.getControlProps()}>
                <span data-elur="switch-thumb" props=${() => s.api.value.getThumbProps()}></span>
            </span>
            ${() => (props?.label ? html`
                <span data-elur="switch-label" props=${() => s.api.value.getLabelProps()}>${props.label}</span>` : "")}
        </label>`;
});
