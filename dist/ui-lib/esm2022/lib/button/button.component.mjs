import { ChangeDetectionStrategy, Component, computed, input, output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
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
export class ButtonComponent {
    constructor() {
        /** Texto visible del botón */
        this.label = input.required();
        /** Estilo visual del botón
         * @default 'primary'
         */
        this.variant = input('primary');
        /** Tamaño del botón
         * @default 'md'
         */
        this.size = input('md');
        /** Bloquea la interacción visualmente y funcionalmente
         * @default false
         */
        this.disabled = input(false);
        /** Muestra spinner inline y bloquea el click
         * @default false
         */
        this.loading = input(false);
        /** Emite void solo si el botón no está disabled ni en loading */
        this.clicked = output();
        /**
         * Clases Tailwind calculadas según variant, size y estado.
         * Computed signal: se recalcula solo cuando cambia un input.
         */
        this.buttonClasses = computed(() => {
            const base = 'inline-flex items-center justify-center font-semibold rounded-lg ' +
                'transition-all duration-200 focus:outline-none focus:ring-2 ' +
                'focus:ring-offset-2 focus:ring-offset-gray-950 ' +
                'disabled:opacity-50 disabled:cursor-not-allowed select-none';
            const sizes = {
                sm: 'px-3 py-1.5 text-sm gap-1.5',
                md: 'px-5 py-2.5 text-base gap-2',
                lg: 'px-7 py-3.5 text-lg gap-2.5',
            };
            const variants = {
                primary: 'bg-green-500 text-gray-950 hover:bg-green-400 ' +
                    'focus:ring-green-500 shadow-lg shadow-green-500/25 ' +
                    'hover:shadow-green-400/40 active:scale-95',
                secondary: 'bg-transparent border-2 border-green-500 text-green-400 ' +
                    'hover:bg-green-500/10 focus:ring-green-500 active:scale-95',
                danger: 'bg-red-600 text-white hover:bg-red-500 ' +
                    'focus:ring-red-500 shadow-lg shadow-red-600/25 active:scale-95',
            };
            return `${base} ${sizes[this.size()]} ${variants[this.variant()]}`;
        });
    }
    /** Emite el evento solo si no está bloqueado */
    handleClick() {
        if (!this.disabled() && !this.loading()) {
            this.clicked.emit();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.12", type: ButtonComponent, isStandalone: true, selector: "ui-button", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { clicked: "clicked" }, ngImport: i0, template: `
    <button
      [class]="buttonClasses()"
      [disabled]="disabled() || loading()"
      (click)="handleClick()"
      [attr.aria-busy]="loading()"
      [attr.aria-disabled]="disabled() || loading()"
    >
      @if (loading()) {
        <svg
          class="animate-spin h-4 w-4 mr-2 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            class="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      }
      {{ label() }}
    </button>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ui-button',
                    standalone: true,
                    imports: [CommonModule],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <button
      [class]="buttonClasses()"
      [disabled]="disabled() || loading()"
      (click)="handleClick()"
      [attr.aria-busy]="loading()"
      [attr.aria-disabled]="disabled() || loading()"
    >
      @if (loading()) {
        <svg
          class="animate-spin h-4 w-4 mr-2 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            class="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      }
      {{ label() }}
    </button>
  `,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWxpYi9zcmMvbGliL2J1dHRvbi9idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFFBQVEsRUFDUixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFRL0M7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUF1Q0gsTUFBTSxPQUFPLGVBQWU7SUF0QzVCO1FBdUNFLDhCQUE4QjtRQUM5QixVQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBVSxDQUFDO1FBRWpDOztXQUVHO1FBQ0gsWUFBTyxHQUFHLEtBQUssQ0FBZ0IsU0FBUyxDQUFDLENBQUM7UUFFMUM7O1dBRUc7UUFDSCxTQUFJLEdBQUcsS0FBSyxDQUFhLElBQUksQ0FBQyxDQUFDO1FBRS9COztXQUVHO1FBQ0gsYUFBUSxHQUFHLEtBQUssQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUVqQzs7V0FFRztRQUNILFlBQU8sR0FBRyxLQUFLLENBQVUsS0FBSyxDQUFDLENBQUM7UUFFaEMsaUVBQWlFO1FBQ2pFLFlBQU8sR0FBRyxNQUFNLEVBQVEsQ0FBQztRQUV6Qjs7O1dBR0c7UUFDTyxrQkFBYSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDdEMsTUFBTSxJQUFJLEdBQ1IsbUVBQW1FO2dCQUNuRSw4REFBOEQ7Z0JBQzlELGlEQUFpRDtnQkFDakQsNkRBQTZELENBQUM7WUFFaEUsTUFBTSxLQUFLLEdBQStCO2dCQUN4QyxFQUFFLEVBQUUsNkJBQTZCO2dCQUNqQyxFQUFFLEVBQUUsNkJBQTZCO2dCQUNqQyxFQUFFLEVBQUUsNkJBQTZCO2FBQ2xDLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBa0M7Z0JBQzlDLE9BQU8sRUFDTCxnREFBZ0Q7b0JBQ2hELHFEQUFxRDtvQkFDckQsMkNBQTJDO2dCQUM3QyxTQUFTLEVBQ1AsMERBQTBEO29CQUMxRCw0REFBNEQ7Z0JBQzlELE1BQU0sRUFDSix5Q0FBeUM7b0JBQ3pDLGdFQUFnRTthQUNuRSxDQUFDO1lBRUYsT0FBTyxHQUFHLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7S0FRSjtJQU5DLGdEQUFnRDtJQUN0QyxXQUFXO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDSCxDQUFDOytHQWpFVSxlQUFlO21HQUFmLGVBQWUsMnRCQWpDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQlQsMkRBakNTLFlBQVk7OzRGQW1DWCxlQUFlO2tCQXRDM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCVDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIGNvbXB1dGVkLFxuICBpbnB1dCxcbiAgb3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKiBWYXJpYW50ZSB2aXN1YWwgZGVsIGJvdMOzbiAqL1xuZXhwb3J0IHR5cGUgQnV0dG9uVmFyaWFudCA9ICdwcmltYXJ5JyB8ICdzZWNvbmRhcnknIHwgJ2Rhbmdlcic7XG5cbi8qKiBUYW1hw7FvIGRlbCBib3TDs24gKi9cbmV4cG9ydCB0eXBlIEJ1dHRvblNpemUgPSAnc20nIHwgJ21kJyB8ICdsZyc7XG5cbi8qKlxuICogQm90w7NuIHJldXRpbGl6YWJsZSBkZSBsYSBsaWJyZXLDrWEgdWktbGliLlxuICpcbiAqIFNvcG9ydGEgdmFyaWFudGVzIHZpc3VhbGVzLCB0YW1hw7FvcywgZXN0YWRvIGRlc2hhYmlsaXRhZG9cbiAqIHkgZXN0YWRvIGRlIGNhcmdhIGNvbiBzcGlubmVyIGlubGluZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogPHVpLWJ1dHRvblxuICogICBsYWJlbD1cIkd1YXJkYXJcIlxuICogICB2YXJpYW50PVwicHJpbWFyeVwiXG4gKiAgIHNpemU9XCJtZFwiXG4gKiAgIFtsb2FkaW5nXT1cImlzU2F2aW5nXCJcbiAqICAgKGNsaWNrZWQpPVwib25TYXZlKClcIlxuICogLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndWktYnV0dG9uJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b25cbiAgICAgIFtjbGFzc109XCJidXR0b25DbGFzc2VzKClcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkKCkgfHwgbG9hZGluZygpXCJcbiAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygpXCJcbiAgICAgIFthdHRyLmFyaWEtYnVzeV09XCJsb2FkaW5nKClcIlxuICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZCgpIHx8IGxvYWRpbmcoKVwiXG4gICAgPlxuICAgICAgQGlmIChsb2FkaW5nKCkpIHtcbiAgICAgICAgPHN2Z1xuICAgICAgICAgIGNsYXNzPVwiYW5pbWF0ZS1zcGluIGgtNCB3LTQgbXItMiBzaHJpbmstMFwiXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICBjbGFzcz1cIm9wYWNpdHktMjVcIlxuICAgICAgICAgICAgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTBcIlxuICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgIHN0cm9rZS13aWR0aD1cIjRcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGNsYXNzPVwib3BhY2l0eS03NVwiXG4gICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgIGQ9XCJNNCAxMmE4IDggMCAwMTgtOFYwQzUuMzczIDAgMCA1LjM3MyAwIDEyaDR6XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIH1cbiAgICAgIHt7IGxhYmVsKCkgfX1cbiAgICA8L2J1dHRvbj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IHtcbiAgLyoqIFRleHRvIHZpc2libGUgZGVsIGJvdMOzbiAqL1xuICBsYWJlbCA9IGlucHV0LnJlcXVpcmVkPHN0cmluZz4oKTtcblxuICAvKiogRXN0aWxvIHZpc3VhbCBkZWwgYm90w7NuXG4gICAqIEBkZWZhdWx0ICdwcmltYXJ5J1xuICAgKi9cbiAgdmFyaWFudCA9IGlucHV0PEJ1dHRvblZhcmlhbnQ+KCdwcmltYXJ5Jyk7XG5cbiAgLyoqIFRhbWHDsW8gZGVsIGJvdMOzblxuICAgKiBAZGVmYXVsdCAnbWQnXG4gICAqL1xuICBzaXplID0gaW5wdXQ8QnV0dG9uU2l6ZT4oJ21kJyk7XG5cbiAgLyoqIEJsb3F1ZWEgbGEgaW50ZXJhY2Npw7NuIHZpc3VhbG1lbnRlIHkgZnVuY2lvbmFsbWVudGVcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRpc2FibGVkID0gaW5wdXQ8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qKiBNdWVzdHJhIHNwaW5uZXIgaW5saW5lIHkgYmxvcXVlYSBlbCBjbGlja1xuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgbG9hZGluZyA9IGlucHV0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKiogRW1pdGUgdm9pZCBzb2xvIHNpIGVsIGJvdMOzbiBubyBlc3TDoSBkaXNhYmxlZCBuaSBlbiBsb2FkaW5nICovXG4gIGNsaWNrZWQgPSBvdXRwdXQ8dm9pZD4oKTtcblxuICAvKipcbiAgICogQ2xhc2VzIFRhaWx3aW5kIGNhbGN1bGFkYXMgc2Vnw7puIHZhcmlhbnQsIHNpemUgeSBlc3RhZG8uXG4gICAqIENvbXB1dGVkIHNpZ25hbDogc2UgcmVjYWxjdWxhIHNvbG8gY3VhbmRvIGNhbWJpYSB1biBpbnB1dC5cbiAgICovXG4gIHByb3RlY3RlZCBidXR0b25DbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGJhc2UgPVxuICAgICAgJ2lubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LXNlbWlib2xkIHJvdW5kZWQtbGcgJyArXG4gICAgICAndHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgJyArXG4gICAgICAnZm9jdXM6cmluZy1vZmZzZXQtMiBmb2N1czpyaW5nLW9mZnNldC1ncmF5LTk1MCAnICtcbiAgICAgICdkaXNhYmxlZDpvcGFjaXR5LTUwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBzZWxlY3Qtbm9uZSc7XG5cbiAgICBjb25zdCBzaXplczogUmVjb3JkPEJ1dHRvblNpemUsIHN0cmluZz4gPSB7XG4gICAgICBzbTogJ3B4LTMgcHktMS41IHRleHQtc20gZ2FwLTEuNScsXG4gICAgICBtZDogJ3B4LTUgcHktMi41IHRleHQtYmFzZSBnYXAtMicsXG4gICAgICBsZzogJ3B4LTcgcHktMy41IHRleHQtbGcgZ2FwLTIuNScsXG4gICAgfTtcblxuICAgIGNvbnN0IHZhcmlhbnRzOiBSZWNvcmQ8QnV0dG9uVmFyaWFudCwgc3RyaW5nPiA9IHtcbiAgICAgIHByaW1hcnk6XG4gICAgICAgICdiZy1ncmVlbi01MDAgdGV4dC1ncmF5LTk1MCBob3ZlcjpiZy1ncmVlbi00MDAgJyArXG4gICAgICAgICdmb2N1czpyaW5nLWdyZWVuLTUwMCBzaGFkb3ctbGcgc2hhZG93LWdyZWVuLTUwMC8yNSAnICtcbiAgICAgICAgJ2hvdmVyOnNoYWRvdy1ncmVlbi00MDAvNDAgYWN0aXZlOnNjYWxlLTk1JyxcbiAgICAgIHNlY29uZGFyeTpcbiAgICAgICAgJ2JnLXRyYW5zcGFyZW50IGJvcmRlci0yIGJvcmRlci1ncmVlbi01MDAgdGV4dC1ncmVlbi00MDAgJyArXG4gICAgICAgICdob3ZlcjpiZy1ncmVlbi01MDAvMTAgZm9jdXM6cmluZy1ncmVlbi01MDAgYWN0aXZlOnNjYWxlLTk1JyxcbiAgICAgIGRhbmdlcjpcbiAgICAgICAgJ2JnLXJlZC02MDAgdGV4dC13aGl0ZSBob3ZlcjpiZy1yZWQtNTAwICcgK1xuICAgICAgICAnZm9jdXM6cmluZy1yZWQtNTAwIHNoYWRvdy1sZyBzaGFkb3ctcmVkLTYwMC8yNSBhY3RpdmU6c2NhbGUtOTUnLFxuICAgIH07XG5cbiAgICByZXR1cm4gYCR7YmFzZX0gJHtzaXplc1t0aGlzLnNpemUoKV19ICR7dmFyaWFudHNbdGhpcy52YXJpYW50KCldfWA7XG4gIH0pO1xuXG4gIC8qKiBFbWl0ZSBlbCBldmVudG8gc29sbyBzaSBubyBlc3TDoSBibG9xdWVhZG8gKi9cbiAgcHJvdGVjdGVkIGhhbmRsZUNsaWNrKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCgpICYmICF0aGlzLmxvYWRpbmcoKSkge1xuICAgICAgdGhpcy5jbGlja2VkLmVtaXQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==