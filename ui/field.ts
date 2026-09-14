// src/ui/field.ts — label + control + descripción + error. COPIADO.
//
//   Field({ label: "Email", field: form.fields.email }, {
//       default: slot(() => Input({ field: form.fields.email })),
//   })
//
// `field` (FieldState de createForm) provee error automático con role="alert".

import { defineComponent, html } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { createId } from "@elurjs/ui-brain/utils";

export interface FieldProps {
    label?: string;
    description?: string;
    field?: {
        error?: Signal<string | null>;
    };
    /** id del control — se genera si no se pasa (para `for`/`aria-*`). */
    controlId?: string;
    [key: string]: unknown;
}

export const Field = defineComponent<FieldProps>((props, ctx) => {
    const id = props?.controlId ?? createId("field");
    const descId = `${id}-desc`;
    const errId = `${id}-error`;
    return html`
        <div data-elur="field" data-invalid=${() => (props?.field?.error?.value ? "" : undefined)}>
            ${() => (props?.label ? html`
                <label data-elur="label" for=${id}>${props.label}</label>` : "")}
            ${() => ctx.slot()}
            ${() => (props?.description ? html`
                <p data-elur="field-desc" id=${descId}>${props.description}</p>` : "")}
            ${() => {
                const err = props?.field?.error?.value;
                return err ? html`<p data-elur="field-error" id=${errId} role="alert">${err}</p>` : "";
            }}
        </div>`;
});
