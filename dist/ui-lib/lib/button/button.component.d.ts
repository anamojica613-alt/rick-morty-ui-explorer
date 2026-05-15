import * as i0 from "@angular/core";
/** Variante visual del botón */
export type ButtonVariant = 'primary' | 'secondary' | 'danger';
/** Tamaño del botón */
export type ButtonSize = 'sm' | 'md' | 'lg';
/**
 * Botón reutilizable de la librería ui-lib.
 *
 * Soporta variantes visuales, tamaños, estado deshabilitado
 * y estado de carga con spinner inline.
 *
 * @example
 * <ui-button
 *   label="Guardar"
 *   variant="primary"
 *   size="md"
 *   [loading]="isSaving"
 *   (clicked)="onSave()"
 * />
 */
export declare class ButtonComponent {
    /** Texto visible del botón */
    label: import("@angular/core").InputSignal<string>;
    /** Estilo visual del botón
     * @default 'primary'
     */
    variant: import("@angular/core").InputSignal<ButtonVariant>;
    /** Tamaño del botón
     * @default 'md'
     */
    size: import("@angular/core").InputSignal<ButtonSize>;
    /** Bloquea la interacción visualmente y funcionalmente
     * @default false
     */
    disabled: import("@angular/core").InputSignal<boolean>;
    /** Muestra spinner inline y bloquea el click
     * @default false
     */
    loading: import("@angular/core").InputSignal<boolean>;
    /** Emite void solo si el botón no está disabled ni en loading */
    clicked: import("@angular/core").OutputEmitterRef<void>;
    /**
     * Clases Tailwind calculadas según variant, size y estado.
     * Computed signal: se recalcula solo cuando cambia un input.
     */
    protected buttonClasses: import("@angular/core").Signal<string>;
    /** Emite el evento solo si no está bloqueado */
    protected handleClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonComponent, "ui-button", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "loading": { "alias": "loading"; "required": false; "isSignal": true; }; }, { "clicked": "clicked"; }, never, never, true, never>;
}
//# sourceMappingURL=button.component.d.ts.map