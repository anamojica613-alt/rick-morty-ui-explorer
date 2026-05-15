import * as i0 from "@angular/core";
/** Estilo visual del contenedor de la card */
export type CardElevation = 'flat' | 'raised' | 'outlined';
/**
 * Card contenedora con header clicable y proyección de contenido arbitrario.
 *
 * El body acepta cualquier contenido via `ng-content`.
 * El header emite un evento al hacer clic.
 *
 * @example
 * <ui-card
 *   title="Rick Sanchez"
 *   subtitle="Alive · Human"
 *   elevation="raised"
 *   (headerClicked)="openDetail()"
 * >
 *   <p>Contenido proyectado aquí</p>
 * </ui-card>
 */
export declare class CardComponent {
    /** Título principal del header de la card */
    title: import("@angular/core").InputSignal<string>;
    /** Subtítulo opcional debajo del título
     * @default null
     */
    subtitle: import("@angular/core").InputSignal<string | null>;
    /** Estilo visual del contenedor
     * @default 'raised'
     */
    elevation: import("@angular/core").InputSignal<CardElevation>;
    /** Emite void al hacer clic en el área del header */
    headerClicked: import("@angular/core").OutputEmitterRef<void>;
    /**
     * Clases del contenedor calculadas según elevation.
     */
    protected cardClasses: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardComponent, "ui-card", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; "elevation": { "alias": "elevation"; "required": false; "isSignal": true; }; }, { "headerClicked": "headerClicked"; }, never, ["*"], true, never>;
}
//# sourceMappingURL=card.component.d.ts.map