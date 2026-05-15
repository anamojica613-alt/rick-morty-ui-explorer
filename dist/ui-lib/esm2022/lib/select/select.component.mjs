import { ChangeDetectionStrategy, Component, input, model, output, } from '@angular/core';
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
export class SelectComponent {
    constructor() {
        /** Lista de opciones disponibles */
        this.options = input.required();
        /** Etiqueta visible encima del select */
        this.label = input.required();
        /** Texto cuando no hay ninguna opción seleccionada
         * @default 'Selecciona una opción'
         */
        this.placeholder = input('Selecciona una opción');
        /** Muestra un skeleton de carga en lugar del select
         * @default false
         */
        this.loading = input(false);
        /** Bloquea la interacción con el select
         * @default false
         */
        this.disabled = input(false);
        /**
         * Two-way binding del valor seleccionado.
         * Usar con [(value)]="miVariable" en el padre.
         * @default null
         */
        this.value = model(null);
        /** Emite el objeto SelectOption completo cuando cambia la selección */
        this.selectionChange = output();
    }
    /** Maneja el evento change nativo y actualiza el model */
    onSelectChange(event) {
        const target = event.target;
        const selected = this.options().find((o) => o.value === target.value);
        if (selected) {
            this.value.set(selected.value);
            this.selectionChange.emit(selected);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.12", type: SelectComponent, isStandalone: true, selector: "ui-select", inputs: { options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange", selectionChange: "selectionChange" }, ngImport: i0, template: `
    <div class="flex flex-col gap-1.5">
      <!-- Etiqueta -->
      <label
        class="text-xs font-semibold text-green-400 uppercase tracking-widest"
      >
        {{ label() }}
      </label>

      @if (loading()) {
        <!-- Skeleton de carga -->
        <div
          class="h-10 bg-gray-700/80 rounded-lg animate-pulse"
          aria-busy="true"
          aria-label="Cargando opciones..."
        ></div>
      } @else {
        <select
          class="bg-gray-800 text-white border border-gray-600 rounded-lg
                 px-3 py-2.5 text-sm
                 focus:outline-none focus:ring-2 focus:ring-green-500
                 focus:border-transparent
                 hover:border-green-500/60 transition-colors duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed
                 cursor-pointer"
          [disabled]="disabled()"
          [value]="value() ?? ''"
          (change)="onSelectChange($event)"
        >
          <!-- Placeholder no seleccionable -->
          <option value="" disabled hidden>{{ placeholder() }}</option>

          @for (opt of options(); track opt.value) {
            <option [value]="opt.value">{{ opt.label }}</option>
          }
        </select>
      }
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SelectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ui-select',
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div class="flex flex-col gap-1.5">
      <!-- Etiqueta -->
      <label
        class="text-xs font-semibold text-green-400 uppercase tracking-widest"
      >
        {{ label() }}
      </label>

      @if (loading()) {
        <!-- Skeleton de carga -->
        <div
          class="h-10 bg-gray-700/80 rounded-lg animate-pulse"
          aria-busy="true"
          aria-label="Cargando opciones..."
        ></div>
      } @else {
        <select
          class="bg-gray-800 text-white border border-gray-600 rounded-lg
                 px-3 py-2.5 text-sm
                 focus:outline-none focus:ring-2 focus:ring-green-500
                 focus:border-transparent
                 hover:border-green-500/60 transition-colors duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed
                 cursor-pointer"
          [disabled]="disabled()"
          [value]="value() ?? ''"
          (change)="onSelectChange($event)"
        >
          <!-- Placeholder no seleccionable -->
          <option value="" disabled hidden>{{ placeholder() }}</option>

          @for (opt of options(); track opt.value) {
            <option [value]="opt.value">{{ opt.label }}</option>
          }
        </select>
      }
    </div>
  `,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWxpYi9zcmMvbGliL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDOztBQUd2Qjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQTZDSCxNQUFNLE9BQU8sZUFBZTtJQTVDNUI7UUE2Q0Usb0NBQW9DO1FBQ3BDLFlBQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFrQixDQUFDO1FBRTNDLHlDQUF5QztRQUN6QyxVQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBVSxDQUFDO1FBRWpDOztXQUVHO1FBQ0gsZ0JBQVcsR0FBRyxLQUFLLENBQVMsdUJBQXVCLENBQUMsQ0FBQztRQUVyRDs7V0FFRztRQUNILFlBQU8sR0FBRyxLQUFLLENBQVUsS0FBSyxDQUFDLENBQUM7UUFFaEM7O1dBRUc7UUFDSCxhQUFRLEdBQUcsS0FBSyxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBRWpDOzs7O1dBSUc7UUFDSCxVQUFLLEdBQUcsS0FBSyxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUVuQyx1RUFBdUU7UUFDdkUsb0JBQWUsR0FBRyxNQUFNLEVBQWdCLENBQUM7S0FXMUM7SUFUQywwREFBMEQ7SUFDaEQsY0FBYyxDQUFDLEtBQVk7UUFDbkMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQTJCLENBQUM7UUFDakQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEUsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0gsQ0FBQzsrR0F4Q1UsZUFBZTttR0FBZixlQUFlLDY0QkF4Q2hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDVDs7NEZBRVUsZUFBZTtrQkE1QzNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDVDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIGlucHV0LFxuICBtb2RlbCxcbiAgb3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4vc2VsZWN0LnR5cGVzJztcblxuLyoqXG4gKiBTZWxlY3QgYWNjZXNpYmxlIGNvbiB0d28td2F5IGJpbmRpbmcgdmlhIGBtb2RlbCgpYC5cbiAqXG4gKiBTb3BvcnRhIGVzdGFkbyBkZSBjYXJnYSAoc2tlbGV0b24pLCBkZXNoYWJpbGl0YWRvLCBwbGFjZWhvbGRlclxuICogeSBlbWl0ZSBlbCBvYmpldG8gY29tcGxldG8gYFNlbGVjdE9wdGlvbmAgYWwgY2FtYmlhci5cbiAqXG4gKiBAZXhhbXBsZVxuICogPHVpLXNlbGVjdFxuICogICBsYWJlbD1cIlJlY3Vyc28gYWN0aXZvXCJcbiAqICAgcGxhY2Vob2xkZXI9XCJFbGlnZSB1biByZWN1cnNvXCJcbiAqICAgW29wdGlvbnNdPVwicmVzb3VyY2VPcHRpb25zXCJcbiAqICAgWyh2YWx1ZSldPVwic2VsZWN0ZWRWYWx1ZVwiXG4gKiAgIChzZWxlY3Rpb25DaGFuZ2UpPVwib25SZXNvdXJjZUNoYW5nZSgkZXZlbnQpXCJcbiAqIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VpLXNlbGVjdCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtY29sIGdhcC0xLjVcIj5cbiAgICAgIDwhLS0gRXRpcXVldGEgLS0+XG4gICAgICA8bGFiZWxcbiAgICAgICAgY2xhc3M9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmVlbi00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdFwiXG4gICAgICA+XG4gICAgICAgIHt7IGxhYmVsKCkgfX1cbiAgICAgIDwvbGFiZWw+XG5cbiAgICAgIEBpZiAobG9hZGluZygpKSB7XG4gICAgICAgIDwhLS0gU2tlbGV0b24gZGUgY2FyZ2EgLS0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImgtMTAgYmctZ3JheS03MDAvODAgcm91bmRlZC1sZyBhbmltYXRlLXB1bHNlXCJcbiAgICAgICAgICBhcmlhLWJ1c3k9XCJ0cnVlXCJcbiAgICAgICAgICBhcmlhLWxhYmVsPVwiQ2FyZ2FuZG8gb3BjaW9uZXMuLi5cIlxuICAgICAgICA+PC9kaXY+XG4gICAgICB9IEBlbHNlIHtcbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGNsYXNzPVwiYmctZ3JheS04MDAgdGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLWdyYXktNjAwIHJvdW5kZWQtbGdcbiAgICAgICAgICAgICAgICAgcHgtMyBweS0yLjUgdGV4dC1zbVxuICAgICAgICAgICAgICAgICBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctZ3JlZW4tNTAwXG4gICAgICAgICAgICAgICAgIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFxuICAgICAgICAgICAgICAgICBob3Zlcjpib3JkZXItZ3JlZW4tNTAwLzYwIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMFxuICAgICAgICAgICAgICAgICBkaXNhYmxlZDpvcGFjaXR5LTUwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFxuICAgICAgICAgICAgICAgICBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkKClcIlxuICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZSgpID8/ICcnXCJcbiAgICAgICAgICAoY2hhbmdlKT1cIm9uU2VsZWN0Q2hhbmdlKCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAgPCEtLSBQbGFjZWhvbGRlciBubyBzZWxlY2Npb25hYmxlIC0tPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBoaWRkZW4+e3sgcGxhY2Vob2xkZXIoKSB9fTwvb3B0aW9uPlxuXG4gICAgICAgICAgQGZvciAob3B0IG9mIG9wdGlvbnMoKTsgdHJhY2sgb3B0LnZhbHVlKSB7XG4gICAgICAgICAgICA8b3B0aW9uIFt2YWx1ZV09XCJvcHQudmFsdWVcIj57eyBvcHQubGFiZWwgfX08L29wdGlvbj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgfVxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb21wb25lbnQge1xuICAvKiogTGlzdGEgZGUgb3BjaW9uZXMgZGlzcG9uaWJsZXMgKi9cbiAgb3B0aW9ucyA9IGlucHV0LnJlcXVpcmVkPFNlbGVjdE9wdGlvbltdPigpO1xuXG4gIC8qKiBFdGlxdWV0YSB2aXNpYmxlIGVuY2ltYSBkZWwgc2VsZWN0ICovXG4gIGxhYmVsID0gaW5wdXQucmVxdWlyZWQ8c3RyaW5nPigpO1xuXG4gIC8qKiBUZXh0byBjdWFuZG8gbm8gaGF5IG5pbmd1bmEgb3BjacOzbiBzZWxlY2Npb25hZGFcbiAgICogQGRlZmF1bHQgJ1NlbGVjY2lvbmEgdW5hIG9wY2nDs24nXG4gICAqL1xuICBwbGFjZWhvbGRlciA9IGlucHV0PHN0cmluZz4oJ1NlbGVjY2lvbmEgdW5hIG9wY2nDs24nKTtcblxuICAvKiogTXVlc3RyYSB1biBza2VsZXRvbiBkZSBjYXJnYSBlbiBsdWdhciBkZWwgc2VsZWN0XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBsb2FkaW5nID0gaW5wdXQ8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qKiBCbG9xdWVhIGxhIGludGVyYWNjacOzbiBjb24gZWwgc2VsZWN0XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBkaXNhYmxlZCA9IGlucHV0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKipcbiAgICogVHdvLXdheSBiaW5kaW5nIGRlbCB2YWxvciBzZWxlY2Npb25hZG8uXG4gICAqIFVzYXIgY29uIFsodmFsdWUpXT1cIm1pVmFyaWFibGVcIiBlbiBlbCBwYWRyZS5cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgdmFsdWUgPSBtb2RlbDxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICAvKiogRW1pdGUgZWwgb2JqZXRvIFNlbGVjdE9wdGlvbiBjb21wbGV0byBjdWFuZG8gY2FtYmlhIGxhIHNlbGVjY2nDs24gKi9cbiAgc2VsZWN0aW9uQ2hhbmdlID0gb3V0cHV0PFNlbGVjdE9wdGlvbj4oKTtcblxuICAvKiogTWFuZWphIGVsIGV2ZW50byBjaGFuZ2UgbmF0aXZvIHkgYWN0dWFsaXphIGVsIG1vZGVsICovXG4gIHByb3RlY3RlZCBvblNlbGVjdENoYW5nZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLm9wdGlvbnMoKS5maW5kKChvKSA9PiBvLnZhbHVlID09PSB0YXJnZXQudmFsdWUpO1xuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgdGhpcy52YWx1ZS5zZXQoc2VsZWN0ZWQudmFsdWUpO1xuICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChzZWxlY3RlZCk7XG4gICAgfVxuICB9XG59XG4iXX0=