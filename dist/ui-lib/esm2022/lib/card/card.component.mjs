import { ChangeDetectionStrategy, Component, computed, input, output, } from '@angular/core';
import * as i0 from "@angular/core";
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
export class CardComponent {
    constructor() {
        /** Título principal del header de la card */
        this.title = input.required();
        /** Subtítulo opcional debajo del título
         * @default null
         */
        this.subtitle = input(null);
        /** Estilo visual del contenedor
         * @default 'raised'
         */
        this.elevation = input('raised');
        /** Emite void al hacer clic en el área del header */
        this.headerClicked = output();
        /**
         * Clases del contenedor calculadas según elevation.
         */
        this.cardClasses = computed(() => {
            const base = 'rounded-xl overflow-hidden bg-gray-900 text-white w-full';
            const elevations = {
                flat: 'bg-gray-900/50',
                raised: 'shadow-2xl shadow-black/60',
                outlined: 'border border-green-500/30 shadow-lg shadow-green-500/5',
            };
            return `${base} ${elevations[this.elevation()]}`;
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: CardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.12", type: CardComponent, isStandalone: true, selector: "ui-card", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: true, transformFunction: null }, subtitle: { classPropertyName: "subtitle", publicName: "subtitle", isSignal: true, isRequired: false, transformFunction: null }, elevation: { classPropertyName: "elevation", publicName: "elevation", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { headerClicked: "headerClicked" }, ngImport: i0, template: `
    <article [class]="cardClasses()">
      <!-- Header clicable -->
      <header
        class="px-6 py-4 border-b border-white/10 cursor-pointer
               hover:bg-white/5 transition-colors duration-200 group"
        (click)="headerClicked.emit()"
      >
        <h3
          class="text-lg font-bold text-green-400 group-hover:text-green-300
                 transition-colors truncate"
        >
          {{ title() }}
        </h3>

        @if (subtitle()) {
          <p class="text-sm text-gray-400 mt-0.5 truncate">
            {{ subtitle() }}
          </p>
        }
      </header>

      <!-- Body: contenido proyectado -->
      <div class="px-6 py-5">
        <ng-content />
      </div>
    </article>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: CardComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ui-card',
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <article [class]="cardClasses()">
      <!-- Header clicable -->
      <header
        class="px-6 py-4 border-b border-white/10 cursor-pointer
               hover:bg-white/5 transition-colors duration-200 group"
        (click)="headerClicked.emit()"
      >
        <h3
          class="text-lg font-bold text-green-400 group-hover:text-green-300
                 transition-colors truncate"
        >
          {{ title() }}
        </h3>

        @if (subtitle()) {
          <p class="text-sm text-gray-400 mt-0.5 truncate">
            {{ subtitle() }}
          </p>
        }
      </header>

      <!-- Body: contenido proyectado -->
      <div class="px-6 py-5">
        <ng-content />
      </div>
    </article>
  `,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy91aS1saWIvc3JjL2xpYi9jYXJkL2NhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFFBQVEsRUFDUixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDOztBQUt2Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFrQ0gsTUFBTSxPQUFPLGFBQWE7SUFqQzFCO1FBa0NFLDZDQUE2QztRQUM3QyxVQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBVSxDQUFDO1FBRWpDOztXQUVHO1FBQ0gsYUFBUSxHQUFHLEtBQUssQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFFdEM7O1dBRUc7UUFDSCxjQUFTLEdBQUcsS0FBSyxDQUFnQixRQUFRLENBQUMsQ0FBQztRQUUzQyxxREFBcUQ7UUFDckQsa0JBQWEsR0FBRyxNQUFNLEVBQVEsQ0FBQztRQUUvQjs7V0FFRztRQUNPLGdCQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUNwQyxNQUFNLElBQUksR0FDUiwwREFBMEQsQ0FBQztZQUU3RCxNQUFNLFVBQVUsR0FBa0M7Z0JBQ2hELElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLE1BQU0sRUFBRSw0QkFBNEI7Z0JBQ3BDLFFBQVEsRUFBRSx5REFBeUQ7YUFDcEUsQ0FBQztZQUVGLE9BQU8sR0FBRyxJQUFJLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7S0FDSjsrR0FoQ1ksYUFBYTttR0FBYixhQUFhLHdmQTdCZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJUOzs0RkFFVSxhQUFhO2tCQWpDekIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIGNvbXB1dGVkLFxuICBpbnB1dCxcbiAgb3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIEVzdGlsbyB2aXN1YWwgZGVsIGNvbnRlbmVkb3IgZGUgbGEgY2FyZCAqL1xuZXhwb3J0IHR5cGUgQ2FyZEVsZXZhdGlvbiA9ICdmbGF0JyB8ICdyYWlzZWQnIHwgJ291dGxpbmVkJztcblxuLyoqXG4gKiBDYXJkIGNvbnRlbmVkb3JhIGNvbiBoZWFkZXIgY2xpY2FibGUgeSBwcm95ZWNjacOzbiBkZSBjb250ZW5pZG8gYXJiaXRyYXJpby5cbiAqXG4gKiBFbCBib2R5IGFjZXB0YSBjdWFscXVpZXIgY29udGVuaWRvIHZpYSBgbmctY29udGVudGAuXG4gKiBFbCBoZWFkZXIgZW1pdGUgdW4gZXZlbnRvIGFsIGhhY2VyIGNsaWMuXG4gKlxuICogQGV4YW1wbGVcbiAqIDx1aS1jYXJkXG4gKiAgIHRpdGxlPVwiUmljayBTYW5jaGV6XCJcbiAqICAgc3VidGl0bGU9XCJBbGl2ZSDCtyBIdW1hblwiXG4gKiAgIGVsZXZhdGlvbj1cInJhaXNlZFwiXG4gKiAgIChoZWFkZXJDbGlja2VkKT1cIm9wZW5EZXRhaWwoKVwiXG4gKiA+XG4gKiAgIDxwPkNvbnRlbmlkbyBwcm95ZWN0YWRvIGFxdcOtPC9wPlxuICogPC91aS1jYXJkPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1aS1jYXJkJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGFydGljbGUgW2NsYXNzXT1cImNhcmRDbGFzc2VzKClcIj5cbiAgICAgIDwhLS0gSGVhZGVyIGNsaWNhYmxlIC0tPlxuICAgICAgPGhlYWRlclxuICAgICAgICBjbGFzcz1cInB4LTYgcHktNCBib3JkZXItYiBib3JkZXItd2hpdGUvMTAgY3Vyc29yLXBvaW50ZXJcbiAgICAgICAgICAgICAgIGhvdmVyOmJnLXdoaXRlLzUgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwIGdyb3VwXCJcbiAgICAgICAgKGNsaWNrKT1cImhlYWRlckNsaWNrZWQuZW1pdCgpXCJcbiAgICAgID5cbiAgICAgICAgPGgzXG4gICAgICAgICAgY2xhc3M9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWdyZWVuLTQwMCBncm91cC1ob3Zlcjp0ZXh0LWdyZWVuLTMwMFxuICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLWNvbG9ycyB0cnVuY2F0ZVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyB0aXRsZSgpIH19XG4gICAgICAgIDwvaDM+XG5cbiAgICAgICAgQGlmIChzdWJ0aXRsZSgpKSB7XG4gICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LXNtIHRleHQtZ3JheS00MDAgbXQtMC41IHRydW5jYXRlXCI+XG4gICAgICAgICAgICB7eyBzdWJ0aXRsZSgpIH19XG4gICAgICAgICAgPC9wPlxuICAgICAgICB9XG4gICAgICA8L2hlYWRlcj5cblxuICAgICAgPCEtLSBCb2R5OiBjb250ZW5pZG8gcHJveWVjdGFkbyAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJweC02IHB5LTVcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvYXJ0aWNsZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZENvbXBvbmVudCB7XG4gIC8qKiBUw610dWxvIHByaW5jaXBhbCBkZWwgaGVhZGVyIGRlIGxhIGNhcmQgKi9cbiAgdGl0bGUgPSBpbnB1dC5yZXF1aXJlZDxzdHJpbmc+KCk7XG5cbiAgLyoqIFN1YnTDrXR1bG8gb3BjaW9uYWwgZGViYWpvIGRlbCB0w610dWxvXG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIHN1YnRpdGxlID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLyoqIEVzdGlsbyB2aXN1YWwgZGVsIGNvbnRlbmVkb3JcbiAgICogQGRlZmF1bHQgJ3JhaXNlZCdcbiAgICovXG4gIGVsZXZhdGlvbiA9IGlucHV0PENhcmRFbGV2YXRpb24+KCdyYWlzZWQnKTtcblxuICAvKiogRW1pdGUgdm9pZCBhbCBoYWNlciBjbGljIGVuIGVsIMOhcmVhIGRlbCBoZWFkZXIgKi9cbiAgaGVhZGVyQ2xpY2tlZCA9IG91dHB1dDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBDbGFzZXMgZGVsIGNvbnRlbmVkb3IgY2FsY3VsYWRhcyBzZWfDum4gZWxldmF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIGNhcmRDbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGJhc2UgPVxuICAgICAgJ3JvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGJnLWdyYXktOTAwIHRleHQtd2hpdGUgdy1mdWxsJztcblxuICAgIGNvbnN0IGVsZXZhdGlvbnM6IFJlY29yZDxDYXJkRWxldmF0aW9uLCBzdHJpbmc+ID0ge1xuICAgICAgZmxhdDogJ2JnLWdyYXktOTAwLzUwJyxcbiAgICAgIHJhaXNlZDogJ3NoYWRvdy0yeGwgc2hhZG93LWJsYWNrLzYwJyxcbiAgICAgIG91dGxpbmVkOiAnYm9yZGVyIGJvcmRlci1ncmVlbi01MDAvMzAgc2hhZG93LWxnIHNoYWRvdy1ncmVlbi01MDAvNScsXG4gICAgfTtcblxuICAgIHJldHVybiBgJHtiYXNlfSAke2VsZXZhdGlvbnNbdGhpcy5lbGV2YXRpb24oKV19YDtcbiAgfSk7XG59XG4iXX0=