// src/ui/dialog.ts — COPIADO. Máquina @zag-js/dialog vía @elurjs/ui-brain.
//
//   Dialog({ open: dlgSignal, title: "Confirmar" }, {
//       default: slot(() => html`<p>…</p>`),
//       actions: slot(() => Button({ label: "Aceptar", on: { click: … } })),
//   })

import { defineComponent, html } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createDialog } from "@elurjs/ui-brain/dialog";
import { createPresence } from "@elurjs/ui-brain/utils";

export interface DialogProps {
    /** Controlado: signal bidireccional — la máquina escribe aquí al cerrar. */
    open?: Signal<boolean> | boolean;
    title?: string;
    description?: string;
    [key: string]: unknown;
}

export const Dialog = defineComponent<DialogProps>((props, ctx) => {
    const d = createDialog({ open: props?.open });
    ctx.onMount(() => d.start());
    ctx.onUnmount(() => d.stop());

    const presence = createPresence(() => d.api.value.open);

    return html`
        <div show=${() => presence.mounted.value}>
            <div data-elur="dialog-backdrop" props=${() => d.api.value.getBackdropProps()}></div>
            <div data-elur="dialog-positioner" props=${() => d.api.value.getPositionerProps()}>
                <div data-elur="dialog-content"
                     ref=${presence.ref}
                     data-state=${() => (d.api.value.open ? "open" : "closed")}
                     props=${() => d.api.value.getContentProps()}>
                    ${() => (props?.title ? html`
                        <h2 data-elur="dialog-title" props=${() => d.api.value.getTitleProps()}>${props.title}</h2>` : "")}
                    ${() => (props?.description ? html`
                        <p data-elur="dialog-desc" props=${() => d.api.value.getDescriptionProps()}>${props.description}</p>` : "")}
                    ${() => ctx.slot()}
                    <div data-elur="dialog-actions">${() => ctx.slot("actions")}</div>
                </div>
            </div>
        </div>`;
});
