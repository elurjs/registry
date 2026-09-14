// src/ui/textarea.ts — COPIADO. Igual contrato que Input.
import { defineComponent, html } from "@elurjs/core";
import type { Signal } from "@elurjs/core";
import { eventsOf, mergeProps } from "@elurjs/ui-brain/internal";

export interface TextareaProps {
    placeholder?: string;
    value?: Signal<string> | string;
    rows?: number;
    disabled?: boolean;
    invalid?: boolean;
    field?: {
        value: Signal<string>;
        onInput: (e: Event) => void;
        onBlur?: (e: Event) => void;
        error?: Signal<string | null>;
    };
    on?: Record<string, (e: Event) => void>;
    [key: string]: unknown;
}

export const Textarea = defineComponent<TextareaProps>((props) => {
    const field = () => props?.field;
    const invalid = () => !!props?.invalid || !!field()?.error?.value;
    return html`
        <textarea
            data-elur="textarea"
            placeholder=${() => props?.placeholder}
            rows=${() => props?.rows ?? 3}
            disabled=${() => props?.disabled || undefined}
            aria-invalid=${() => (invalid() ? "true" : undefined)}
            data-invalid=${() => (invalid() ? "" : undefined)}
            props=${() => {
                const { placeholder: _p, value, rows: _r, disabled: _d, invalid: _i, field, on, ...rest } = props ?? {};
                return mergeProps(rest, eventsOf({
                    input: (e: Event) => field?.onInput(e),
                    blur: (e: Event) => field?.onBlur?.(e),
                    ...on,
                }), {
                    value: field?.value.value ?? (typeof value === "object" ? (value as Signal<string>).value : value) ?? "",
                });
            }}
        ></textarea>`;
});
