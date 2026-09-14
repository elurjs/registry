// src/ui/accordion.ts — COPIADO. @zag-js/accordion.
//
//   Accordion({ value: openSig, items: [{ value: "a", title: "…", content: html`…` }] })

import { defineComponent, html, repeat } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createAccordion } from "@elurjs/ui-brain/accordion";
import { createPresence } from "@elurjs/ui-brain/utils";
import type { AccordionApi } from "@elurjs/ui-brain/accordion";

export interface AccordionItemDef {
    value: string;
    title: string;
    content: unknown;
    disabled?: boolean;
}

export interface AccordionProps {
    /** value controlado: array de values abiertos (o string único). */
    value?: Signal<string[] | string | null> | string[] | string | null;
    multiple?: boolean;
    collapsible?: boolean;
    items: AccordionItemDef[];
    [key: string]: unknown;
}

const AccordionItem = defineComponent<{ item: AccordionItemDef; api: () => AccordionApi }>((props) => {
    const item = () => props!.item;
    const itemProps = () => ({ value: item().value, disabled: item().disabled });
    const api = () => props!.api();
    const presence = createPresence(() => api().getItemState(itemProps()).expanded);
    return html`
        <div data-elur="accordion-item" props=${() => api().getItemProps(itemProps())}>
            <h3 data-elur="accordion-heading">
                <button data-elur="accordion-trigger" props=${() => api().getItemTriggerProps(itemProps())}>
                    ${item().title}
                    <span data-elur="accordion-indicator" aria-hidden="true">▾</span>
                </button>
            </h3>
            <div show=${() => presence.mounted.value}
                 data-elur="accordion-content"
                 ref=${presence.ref}
                 data-state=${() => (api().getItemState(itemProps()).expanded ? "open" : "closed")}
                 props=${() => api().getItemContentProps(itemProps())}>
                <div data-elur="accordion-body">${item().content}</div>
            </div>
        </div>`;
});

const toArray = (v: AccordionProps["value"]): string[] | Signal<string[]> | undefined =>
    typeof v === "string" ? [v] : v === null ? [] : (v as string[] | Signal<string[]> | undefined);

export const Accordion = defineComponent<AccordionProps>((props, ctx) => {
    const a = createAccordion({
        value: toArray(props?.value),
        multiple: props?.multiple,
        collapsible: props?.collapsible,
    });
    ctx.onMount(() => a.start());
    ctx.onUnmount(() => a.stop());

    return html`
        <div data-elur="accordion" props=${() => a.api.value.getRootProps()}>
            ${() => repeat(props?.items ?? [], (i) => i.value, (i) =>
        html`${AccordionItem({ item: i, api: () => a.api.value })}`)}
        </div>`;
});
