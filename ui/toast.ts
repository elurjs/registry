// src/ui/toast.ts — COPIADO. @zag-js/toast (group machine + store).
//
//   const toaster = createToaster({ placement: "bottom-end" });
//   toaster.success({ title: "Guardado" });
//   mountComponent(Toaster({ toaster }), root);   // una vez, normalmente en App

import { defineComponent, html, repeat } from "@elurjs/core";
import { createToaster } from "@elurjs/ui-brain/toast";
import type { ToastStore } from "@elurjs/ui-brain/toast";
import { XIcon } from "./icons.js";

export interface ToasterProps {
    /** El handle de `createToaster` — compartido con quien dispara toasts. */
    toaster: ReturnType<typeof createToaster>;
    [key: string]: unknown;
}

interface ToastEntry {
    id?: string;
    title?: string;
    description?: string;
    type?: string;
    dismiss?: () => void;
}

export const Toaster = defineComponent<ToasterProps>((props, ctx) => {
    const toaster = () => props!.toaster;
    ctx.onMount(() => toaster().start());
    ctx.onUnmount(() => toaster().stop());

    const toasts = () => (toaster().api.value.getToasts() as unknown as ToastEntry[]) ?? [];

    return html`
        <div data-elur="toaster" props=${() => toaster().api.value.getGroupProps()}>
            ${() => repeat(toasts(), (t, i) => t.id ?? i, (t) => html`
                <div data-elur="toast" data-type=${t.type ?? "info"}>
                    <div data-elur="toast-body">
                        ${t.title ? html`<p data-elur="toast-title">${t.title}</p>` : ""}
                        ${t.description ? html`<p data-elur="toast-desc">${t.description}</p>` : ""}
                    </div>
                    <button data-elur="toast-close"
                            aria-label="Cerrar"
                            @click=${() => (t.id != null ? toaster().store.dismiss(t.id) : t.dismiss?.())}>
                        ${XIcon({ size: 14, "aria-hidden": "true" })}
                    </button>
                </div>`)}
        </div>`;
});

export { createToaster };
export type { ToastStore };
