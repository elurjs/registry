// src/ui/alert.ts — mensaje de estado. COPIADO.
//   Alert({ title: "Error", variant: "destructive" }, { default: slot(...) })
// Variantes: info | success | warning | destructive
import { defineComponent, html } from "@elurjs/core";
import { InfoIcon, CheckCircleIcon, AlertTriangleIcon, AlertCircleIcon } from "./icons.js";

const ICONS = {
    info: InfoIcon,
    success: CheckCircleIcon,
    warning: AlertTriangleIcon,
    destructive: AlertCircleIcon,
} as const;

export interface AlertProps {
    variant?: keyof typeof ICONS;
    title?: string;
    [key: string]: unknown;
}

export const Alert = defineComponent<AlertProps>((props, ctx) => {
    const variant = () => props?.variant ?? "info";
    return html`
        <div data-elur="alert" data-variant=${variant} role="alert" props=${() => {
            const { variant: _v, title: _t, ...rest } = props ?? {};
            return rest;
        }}>
            ${() => ICONS[variant()]({ size: 16, "aria-hidden": "true" })}
            <div data-elur="alert-body">
                ${() => (props?.title ? html`<p data-elur="alert-title">${props.title}</p>` : "")}
                <div data-elur="alert-desc">${() => ctx.slot()}</div>
            </div>
        </div>`;
});
