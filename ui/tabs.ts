// src/ui/tabs.ts — COPIADO. @zag-js/tabs.
//
//   Tabs({ value: tabSignal, items: [
//       { value: "a", label: "Cuenta", content: html`…` },
//       { value: "b", label: "Seguridad", content: html`…` },
//   ]})

import { defineComponent, html, repeat } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createTabs } from "@elurjs/ui-brain/tabs";

export interface TabItem {
    value: string;
    label: string;
    disabled?: boolean;
    content: unknown;
}

export interface TabsProps {
    value?: Signal<string> | string;
    items: TabItem[];
    [key: string]: unknown;
}

export const Tabs = defineComponent<TabsProps>((props, ctx) => {
    const t = createTabs({ value: props?.value });
    ctx.onMount(() => t.start());
    ctx.onUnmount(() => t.stop());

    const items = () => props?.items ?? [];
    return html`
        <div data-elur="tabs" props=${() => t.api.value.getRootProps()}>
            <div data-elur="tabs-list" props=${() => t.api.value.getListProps()}>
                ${() => repeat(items(), (i) => i.value, (i) => html`
                    <button data-elur="tabs-trigger" props=${() => t.api.value.getTriggerProps({ value: i.value, disabled: i.disabled })}>
                        ${i.label}
                    </button>`)}
                <div data-elur="tabs-indicator" props=${() => t.api.value.getIndicatorProps()}></div>
            </div>
            ${() => repeat(items(), (i) => i.value, (i) => html`
                <div data-elur="tabs-content" props=${() => t.api.value.getContentProps({ value: i.value })}>
                    ${i.content}
                </div>`)}
        </div>`;
});
