// src/ui/input.ts — componente COPIADO.
//
//   Input({ placeholder: "Email", field: form.fields.email })
//   — `field` acepta un FieldState de createForm (value/onInput/onBlur/error)
//
// Sin field también funciona: Input({ value: sig, on: { input: fn } })

import { defineComponent, html } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { eventsOf, mergeProps } from "@elurjs/ui-brain/internal";

export interface InputProps {
    type?: string;
    placeholder?: string;
    value?: Signal<string> | string;
    disabled?: boolean;
    invalid?: boolean;
    /** FieldState de `createForm` — enlaza value/onInput/onBlur/invalid. */
    field?: {
        value: Signal<string>;
        onInput: (e: Event) => void;
        onBlur?: (e: Event) => void;
        error?: Signal<string | null>;
    };
    on?: Record<string, (e: Event) => void>;
    [key: string]: unknown;
}

export const Input = defineComponent<InputProps>((props) => {
    const field = () => props?.field;
    const invalid = () => !!props?.invalid || !!field()?.error?.value;
    return html`
        <input
            data-elur="input"
            type=${() => props?.type ?? "text"}
            placeholder=${() => props?.placeholder}
            value=${() => field()?.value.value ?? (typeof props?.value === "object" ? (props.value as Signal<string>).value : props?.value) ?? ""}
            disabled=${() => props?.disabled || undefined}
            aria-invalid=${() => (invalid() ? "true" : undefined)}
            data-invalid=${() => (invalid() ? "" : undefined)}
            props=${() => {
                const { type: _t, placeholder: _p, value: _v, disabled: _d, invalid: _i, field, on, ...rest } = props ?? {};
                return mergeProps(rest, eventsOf({
                    input: (e: Event) => field?.onInput(e),
                    blur: (e: Event) => field?.onBlur?.(e),
                    ...on,
                }));
            }}
        />`;
});
