// src/ui/table.ts — tabla semántica estilizada. COPIADO (puro CSS).
//
//   Table({ head: ["Nombre", "Email"], rows: [[…], […]] })
//   o por slots para control total.

import { defineComponent, html, repeat } from "@elurjs/core";

export interface TableProps {
    /** Cabeceras (th). */
    head?: unknown[];
    /** Filas — cada fila es un array de celdas (td). */
    rows?: unknown[][];
    caption?: string;
    [key: string]: unknown;
}

export const Table = defineComponent<TableProps>((props, ctx) => html`
    <div data-elur="table-wrap" props=${() => {
        const { head: _h, rows: _r, caption: _c, ...rest } = props ?? {};
        return rest;
    }}>
        <table>
            ${props?.caption ? html`<caption data-elur="table-caption">${props.caption}</caption>` : ""}
            ${props?.head ? html`
                <thead>
                    <tr>${() => repeat(props!.head!, (_c, i) => i, (c) => html`<th>${c}</th>`)}</tr>
                </thead>` : ""}
            <tbody>
                ${() => {
                    const s = ctx.slot();
                    if (s) return s;
                    return repeat(props?.rows ?? [], (_r, i) => i, (row) => html`
                        <tr>${repeat(row as unknown[], (_c, j) => j, (cell) => html`<td>${cell}</td>`)}</tr>`);
                }}
            </tbody>
        </table>
    </div>`);
