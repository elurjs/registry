// src/ui/progress.ts — COPIADO. @zag-js/progress.
//   Progress({ value: sig })

import { defineComponent, html } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createProgress } from "@elurjs/ui-brain/progress";

export interface ProgressProps {
    value?: Signal<number> | number;
    min?: number;
    max?: number;
    [key: string]: unknown;
}

export const Progress = defineComponent<ProgressProps>((props, ctx) => {
    const p = createProgress({ value: props?.value, min: props?.min, max: props?.max });
    ctx.onMount(() => p.start());
    ctx.onUnmount(() => p.stop());

    return html`
        <div data-elur="progress" props=${() => p.api.value.getRootProps()}>
            <div data-elur="progress-track" props=${() => p.api.value.getTrackProps()}>
                <div data-elur="progress-range" props=${() => p.api.value.getRangeProps()}></div>
            </div>
        </div>`;
});
