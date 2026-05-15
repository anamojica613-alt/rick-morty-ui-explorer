import { SelectOption } from './select.types';
import * as i0 from "@angular/core";
/**
 * Select accesible con two-way binding via `model()`.
 *
 * Soporta estado de carga (skeleton), deshabilitado, placeholder
 * y emite el objeto completo `SelectOption` al cambiar.
 *
 * @example
 * <ui-select
 *   label="Recurso activo"
 *   placeholder="Elige un recurso"
 *   [options]="resourceOptions"
 *   [(value)]="selectedValue"
 *   (selectionChange)="onResourceChange($event)"
 * />
 */
export declare class SelectComponent {
    /** Lista de opciones disponibles */
    options: import("@angular/core").InputSignal<SelectOption[]>;
    /** Etiqueta visible encima del select */
    label: import("@angular/core").InputSignal<string>;
    /** Texto cuando no hay ninguna opción seleccionada
     * @default 'Selecciona una opción'
     */
    placeholder: import("@angular/core").InputSignal<string>;
    /** Muestra un skeleton de carga en lugar del select
     * @default false
     */
    loading: import("@angular/core").InputSignal<boolean>;
    /** Bloquea la interacción con el select
     * @default false
     */
    disabled: import("@angular/core").InputSignal<boolean>;
    /**
     * Two-way binding del valor seleccionado.
     * Usar con [(value)]="miVariable" en el padre.
     * @default null
     */
    value: import("@angular/core").ModelSignal<string | null>;
    /** Emite el objeto SelectOption completo cuando cambia la selección */
    selectionChange: import("@angular/core").OutputEmitterRef<SelectOption>;
    /** Maneja el evento change nativo y actualiza el model */
    protected onSelectChange(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectComponent, "ui-select", never, { "options": { "alias": "options"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "loading": { "alias": "loading"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; "selectionChange": "selectionChange"; }, never, never, true, never>;
}
//# sourceMappingURL=select.component.d.ts.map