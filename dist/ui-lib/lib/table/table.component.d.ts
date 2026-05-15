import { TableAction, TableColumn } from './table.types';
import * as i0 from "@angular/core";
/**
 * Tabla genérica y agnóstica al dominio de datos.
 *
 * Solo renderiza las columnas definidas y emite acciones al componente padre.
 * El padre es responsable de interpretar cada acción recibida.
 *
 * Maneja tres estados visuales:
 * - **loading**: muestra skeleton rows animados
 * - **error**: muestra el mensaje de error recibido
 * - **empty**: muestra el mensaje de estado vacío
 *
 * @template T Tipo del objeto de datos. Debe ser un objeto con claves string.
 *
 * @example
 * <ui-table
 *   [columns]="[{ key: 'name', header: 'Nombre' }, { key: 'status', header: 'Estado' }]"
 *   [rows]="characters"
 *   [loading]="isLoading"
 *   [errorMessage]="errorMsg"
 *   emptyMessage="No hay personajes para mostrar"
 *   (actionTriggered)="onTableAction($event)"
 * />
 */
export declare class TableComponent<T extends Record<string, unknown>> {
    /** Definición de columnas a renderizar */
    columns: import("@angular/core").InputSignal<TableColumn[]>;
    /** Array de datos. Genérico: funciona con cualquier tipo de recurso */
    rows: import("@angular/core").InputSignal<T[]>;
    /** Cuando true, muestra skeleton rows animados en lugar de los datos
     * @default false
     */
    loading: import("@angular/core").InputSignal<boolean>;
    /** Mensaje a mostrar cuando rows está vacío
     * @default 'No hay resultados'
     */
    emptyMessage: import("@angular/core").InputSignal<string>;
    /** Mensaje de error de red visible en la tabla. null oculta el estado de error
     * @default null
     */
    errorMessage: import("@angular/core").InputSignal<string | null>;
    /**
     * Emite un TableAction con la acción ('view' | 'delete') y el row completo.
     * El componente padre interpreta y maneja cada acción.
     */
    actionTriggered: import("@angular/core").OutputEmitterRef<TableAction<T>>;
    /** Filas de skeleton (cantidad fija para efecto visual consistente) */
    protected readonly skeletonRows: any[];
    /** Anchos variables para los skeleton, para verse más naturales */
    protected readonly skeletonWidths: string[];
    /**
     * Accede de forma segura a una propiedad dinámica del row.
     * Convierte el valor a string para renderizado, o muestra '—' si es nulo.
     *
     * @param row - El objeto de datos de la fila
     * @param key - La clave de la columna a obtener
     */
    protected getCell(row: T, key: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableComponent<any>, "ui-table", never, { "columns": { "alias": "columns"; "required": true; "isSignal": true; }; "rows": { "alias": "rows"; "required": true; "isSignal": true; }; "loading": { "alias": "loading"; "required": false; "isSignal": true; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; "isSignal": true; }; "errorMessage": { "alias": "errorMessage"; "required": false; "isSignal": true; }; }, { "actionTriggered": "actionTriggered"; }, never, never, true, never>;
}
//# sourceMappingURL=table.component.d.ts.map