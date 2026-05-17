import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TableAction, TableColumn } from './table.types';

@Component({
  selector: 'ui-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-x-auto rounded-xl border border-gray-700/60">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-800/90 border-b border-gray-700">
          <tr>
            @for (col of columns(); track col.key) {
              <th class="px-6 py-3.5 text-xs font-semibold text-green-400 uppercase tracking-widest whitespace-nowrap">
                {{ col.header }}
              </th>
            }
            <th class="px-6 py-3.5 text-xs font-semibold text-green-400 uppercase tracking-widest">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700/50">
          @if (loading()) {
            <tr>
              <td [attr.colspan]="columns().length + 1" class="px-6 py-10 text-center">
                <div class="flex flex-col items-center gap-3">
                  <span class="text-4xl animate-spin inline-block">🛸</span>
                  <p class="text-green-400 text-sm font-medium animate-pulse">Escaneando el multiverso...</p>
                </div>
              </td>
            </tr>
          } @else if (errorMessage()) {
            <tr class="bg-red-950/30">
              <td [attr.colspan]="columns().length + 1" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-3">
                  <span class="text-3xl">⚠️</span>
                  <p class="text-red-400 font-medium">{{ errorMessage() }}</p>
                </div>
              </td>
            </tr>
          } @else if (rows().length === 0) {
            <tr class="bg-gray-900/30">
              <td [attr.colspan]="columns().length + 1" class="px-6 py-16 text-center">
                <div class="flex flex-col items-center gap-3">
                  <span class="text-4xl">🛸</span>
                  <p class="text-gray-500 italic">{{ emptyMessage() }}</p>
                </div>
              </td>
            </tr>
          } @else {
            @for (row of rows(); track $index) {
              <tr class="bg-gray-900/40 hover:bg-green-500/5 transition-colors duration-150">
                @for (col of columns(); track col.key) {
                  <td class="px-6 py-3.5 text-gray-300 whitespace-nowrap">{{ getCell(row, col.key) }}</td>
                }
                <td class="px-6 py-3.5">
                  <div class="flex items-center gap-3">
                    <button class="text-xs font-medium text-green-400 hover:text-green-300 transition-colors underline underline-offset-2" (click)="actionTriggered.emit({ action: 'view', row })">Ver detalle</button>
                    <button class="text-xs font-medium text-red-400 hover:text-red-300 transition-colors underline underline-offset-2" (click)="actionTriggered.emit({ action: 'delete', row })">Eliminar</button>
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
  /** Definicion de columnas a renderizar */
  columns = input.required<TableColumn[]>();

  /** Array de datos. Generico: funciona con cualquier tipo de recurso */
  rows = input.required<T[]>();

  /** Cuando true, muestra mensaje de carga animado
   * @default false
   */
  loading = input<boolean>(false);

  /** Mensaje a mostrar cuando rows esta vacio
   * @default 'No hay resultados'
   */
  emptyMessage = input<string>('No hay resultados');

  /** Mensaje de error de red visible en la tabla
   * @default null
   */
  errorMessage = input<string | null>(null);

  /**
   * Emite un TableAction con la accion y el row completo.
   */
  actionTriggered = output<TableAction<T>>();

  /**
   * Accede de forma segura a una propiedad dinamica del row.
   */
  protected getCell(row: T, key: string): string {
    const val = row[key];
    if (val === null || val === undefined || val === '') return '—';
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  }
}
