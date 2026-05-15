import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TableAction, TableColumn } from './table.types';

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
@Component({
  selector: 'ui-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-x-auto rounded-xl border border-gray-700/60">
      <table class="w-full text-sm text-left">

        <!-- Encabezados -->
        <thead class="bg-gray-800/90 border-b border-gray-700">
          <tr>
            @for (col of columns(); track col.key) {
              <th
                class="px-6 py-3.5 text-xs font-semibold text-green-400
                       uppercase tracking-widest whitespace-nowrap"
              >
                {{ col.header }}
              </th>
            }
            <th
              class="px-6 py-3.5 text-xs font-semibold text-green-400
                     uppercase tracking-widest"
            >
              Acciones
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-700/50">

          <!-- Estado: loading → skeleton rows -->
          @if (loading()) {
            @for (_ of skeletonRows; track $index) {
              <tr class="bg-gray-900/50">
                @for (col of columns(); track col.key) {
                  <td class="px-6 py-4">
                    <div
                      class="h-3.5 rounded-full animate-pulse"
                      [class]="skeletonWidths[$index % skeletonWidths.length]"
                    ></div>
                  </td>
                }
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <div class="h-3.5 w-10 bg-gray-700 rounded-full animate-pulse"></div>
                    <div class="h-3.5 w-14 bg-gray-700 rounded-full animate-pulse"></div>
                  </div>
                </td>
              </tr>
            }

          <!-- Estado: error de red -->
          } @else if (errorMessage()) {
            <tr class="bg-red-950/30">
              <td
                [attr.colspan]="columns().length + 1"
                class="px-6 py-12 text-center"
              >
                <div class="flex flex-col items-center gap-3">
                  <span class="text-3xl">⚠️</span>
                  <p class="text-red-400 font-medium">{{ errorMessage() }}</p>
                </div>
              </td>
            </tr>

          <!-- Estado: sin resultados -->
          } @else if (rows().length === 0) {
            <tr class="bg-gray-900/30">
              <td
                [attr.colspan]="columns().length + 1"
                class="px-6 py-16 text-center"
              >
                <div class="flex flex-col items-center gap-3">
                  <span class="text-4xl">🛸</span>
                  <p class="text-gray-500 italic">{{ emptyMessage() }}</p>
                </div>
              </td>
            </tr>

          <!-- Estado normal: datos -->
          } @else {
            @for (row of rows(); track $index) {
              <tr
                class="bg-gray-900/40 hover:bg-green-500/5
                       transition-colors duration-150"
              >
                @for (col of columns(); track col.key) {
                  <td class="px-6 py-3.5 text-gray-300 whitespace-nowrap">
                    {{ getCell(row, col.key) }}
                  </td>
                }
                <td class="px-6 py-3.5">
                  <div class="flex items-center gap-3">
                    <button
                      class="text-xs font-medium text-green-400
                             hover:text-green-300 transition-colors
                             underline underline-offset-2"
                      (click)="actionTriggered.emit({ action: 'view', row })"
                    >
                      Ver detalle
                    </button>
                    <button
                      class="text-xs font-medium text-red-400
                             hover:text-red-300 transition-colors
                             underline underline-offset-2"
                      (click)="actionTriggered.emit({ action: 'delete', row })"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            }
          }

        </tbody>
      </table>
    </div>
  `,
})
export class TableComponent<T extends Record<string, unknown>> {
  /** Definición de columnas a renderizar */
  columns = input.required<TableColumn[]>();

  /** Array de datos. Genérico: funciona con cualquier tipo de recurso */
  rows = input.required<T[]>();

  /** Cuando true, muestra skeleton rows animados en lugar de los datos
   * @default false
   */
  loading = input<boolean>(false);

  /** Mensaje a mostrar cuando rows está vacío
   * @default 'No hay resultados'
   */
  emptyMessage = input<string>('No hay resultados');

  /** Mensaje de error de red visible en la tabla. null oculta el estado de error
   * @default null
   */
  errorMessage = input<string | null>(null);

  /**
   * Emite un TableAction con la acción ('view' | 'delete') y el row completo.
   * El componente padre interpreta y maneja cada acción.
   */
  actionTriggered = output<TableAction<T>>();

  /** Filas de skeleton (cantidad fija para efecto visual consistente) */
  protected readonly skeletonRows = Array(6).fill(null);

  /** Anchos variables para los skeleton, para verse más naturales */
  protected readonly skeletonWidths = [
    'bg-gray-700 w-3/4',
    'bg-gray-700 w-1/2',
    'bg-gray-700 w-5/6',
    'bg-gray-700 w-2/3',
    'bg-gray-700 w-4/5',
  ];

  /**
   * Accede de forma segura a una propiedad dinámica del row.
   * Convierte el valor a string para renderizado, o muestra '—' si es nulo.
   *
   * @param row - El objeto de datos de la fila
   * @param key - La clave de la columna a obtener
   */
  protected getCell(row: T, key: string): string {
    const val = row[key];
    if (val === null || val === undefined || val === '') return '—';
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  }
}
