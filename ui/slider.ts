// src/ui/slider.ts — COPIADO. @zag-js/slider.
//   Slider({ value: sig, min: 0, max: 100, step: 1 })

import { defineComponent, html } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createSlider } from "@elurjs/ui-brain/slider";

export interface SliderProps {
    value?: Signal<number[] | number> | number[] | number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    [key: string]: unknown;
}

export const Slider = defineComponent<SliderProps>((props, ctx) => {
    const s = createSlider({
        value: typeof props?.value === "number" ? [props.value] : (props?.value as number[] | Signal<number[]> | undefined),
        min: props?.min,
        max: props?.max,
        step: props?.step,
        disabled: props?.disabled,
    });
    ctx.onMount(() => s.start());
    ctx.onUnmount(() => s.stop());

    return html`
        <div data-elur="slider" props=${() => s.api.value.getRootProps()}>
            <div data-elur="slider-track" props=${() => s.api.value.getControlProps()}>
                <div data-elur="slider-range" props=${() => s.api.value.getRangeProps()}></div>
                <div data-elur="slider-thumb" props=${() => s.api.value.getThumbProps({ index: 0 })}>
                    <input props=${() => s.api.value.getHiddenInputProps({ index: 0 })} />
                </div>
            </div>
        </div>`;
});
