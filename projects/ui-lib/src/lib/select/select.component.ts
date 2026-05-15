import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { SelectOption } from './select.types';

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
@Component({
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
})
export class SelectComponent {
  /** Lista de opciones disponibles */
  options = input.required<SelectOption[]>();

  /** Etiqueta visible encima del select */
  label = input.required<string>();

  /** Texto cuando no hay ninguna opción seleccionada
   * @default 'Selecciona una opción'
   */
  placeholder = input<string>('Selecciona una opción');

  /** Muestra un skeleton de carga en lugar del select
   * @default false
   */
  loading = input<boolean>(false);

  /** Bloquea la interacción con el select
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Two-way binding del valor seleccionado.
   * Usar con [(value)]="miVariable" en el padre.
   * @default null
   */
  value = model<string | null>(null);

  /** Emite el objeto SelectOption completo cuando cambia la selección */
  selectionChange = output<SelectOption>();

  /** Maneja el evento change nativo y actualiza el model */
  protected onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selected = this.options().find((o) => o.value === target.value);
    if (selected) {
      this.value.set(selected.value);
      this.selectionChange.emit(selected);
    }
  }
}
