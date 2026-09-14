// src/ui/avatar.ts — COPIADO. @zag-js/avatar (maneja estado de carga/fallback).
//   Avatar({ src: user.avatarUrl, name: user.name })

import { defineComponent, html } from "@elurjs/core";
import { createAvatar } from "@elurjs/ui-brain/avatar";

export interface AvatarProps {
    src?: string;
    name?: string;
    [key: string]: unknown;
}

const initials = (name?: string) =>
    (name ?? "?").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export const Avatar = defineComponent<AvatarProps>((props, ctx) => {
    const a = createAvatar({});
    ctx.onMount(() => a.start());
    ctx.onUnmount(() => a.stop());

    return html`
        <span data-elur="avatar" props=${() => a.api.value.getRootProps()}>
            <span data-elur="avatar-fallback" props=${() => a.api.value.getFallbackProps()}>
                ${() => initials(props?.name)}
            </span>
            <img data-elur="avatar-image"
                 src=${() => props?.src}
                 alt=${() => props?.name ?? ""}
                 props=${() => a.api.value.getImageProps()} />
        </span>`;
});
