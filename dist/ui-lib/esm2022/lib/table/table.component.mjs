import { ChangeDetectionStrategy, Component, input, output, } from '@angular/core';
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
export class TableComponent {
    constructor() {
        /** Definición de columnas a renderizar */
        this.columns = input.required();
        /** Array de datos. Genérico: funciona con cualquier tipo de recurso */
        this.rows = input.required();
        /** Cuando true, muestra skeleton rows animados en lugar de los datos
         * @default false
         */
        this.loading = input(false);
        /** Mensaje a mostrar cuando rows está vacío
         * @default 'No hay resultados'
         */
        this.emptyMessage = input('No hay resultados');
        /** Mensaje de error de red visible en la tabla. null oculta el estado de error
         * @default null
         */
        this.errorMessage = input(null);
        /**
         * Emite un TableAction con la acción ('view' | 'delete') y el row completo.
         * El componente padre interpreta y maneja cada acción.
         */
        this.actionTriggered = output();
        /** Filas de skeleton (cantidad fija para efecto visual consistente) */
        this.skeletonRows = Array(6).fill(null);
        /** Anchos variables para los skeleton, para verse más naturales */
        this.skeletonWidths = [
            'bg-gray-700 w-3/4',
            'bg-gray-700 w-1/2',
            'bg-gray-700 w-5/6',
            'bg-gray-700 w-2/3',
            'bg-gray-700 w-4/5',
        ];
    }
    /**
     * Accede de forma segura a una propiedad dinámica del row.
     * Convierte el valor a string para renderizado, o muestra '—' si es nulo.
     *
     * @param row - El objeto de datos de la fila
     * @param key - La clave de la columna a obtener
     */
    getCell(row, key) {
        const val = row[key];
        if (val === null || val === undefined || val === '')
            return '—';
        if (typeof val === 'object')
            return JSON.stringify(val);
        return String(val);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: TableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.12", type: TableComponent, isStandalone: true, selector: "ui-table", inputs: { columns: { classPropertyName: "columns", publicName: "columns", isSignal: true, isRequired: true, transformFunction: null }, rows: { classPropertyName: "rows", publicName: "rows", isSignal: true, isRequired: true, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, emptyMessage: { classPropertyName: "emptyMessage", publicName: "emptyMessage", isSignal: true, isRequired: false, transformFunction: null }, errorMessage: { classPropertyName: "errorMessage", publicName: "errorMessage", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { actionTriggered: "actionTriggered" }, ngImport: i0, template: `
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
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdWktbGliL3NyYy9saWIvdGFibGUvdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7O0FBR3ZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBeUhILE1BQU0sT0FBTyxjQUFjO0lBeEgzQjtRQXlIRSwwQ0FBMEM7UUFDMUMsWUFBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQWlCLENBQUM7UUFFMUMsdUVBQXVFO1FBQ3ZFLFNBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFPLENBQUM7UUFFN0I7O1dBRUc7UUFDSCxZQUFPLEdBQUcsS0FBSyxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBRWhDOztXQUVHO1FBQ0gsaUJBQVksR0FBRyxLQUFLLENBQVMsbUJBQW1CLENBQUMsQ0FBQztRQUVsRDs7V0FFRztRQUNILGlCQUFZLEdBQUcsS0FBSyxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUUxQzs7O1dBR0c7UUFDSCxvQkFBZSxHQUFHLE1BQU0sRUFBa0IsQ0FBQztRQUUzQyx1RUFBdUU7UUFDcEQsaUJBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRELG1FQUFtRTtRQUNoRCxtQkFBYyxHQUFHO1lBQ2xDLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixtQkFBbUI7U0FDcEIsQ0FBQztLQWVIO0lBYkM7Ozs7OztPQU1HO0lBQ08sT0FBTyxDQUFDLEdBQU0sRUFBRSxHQUFXO1FBQ25DLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssRUFBRTtZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQ2hFLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDOytHQXBEVSxjQUFjO21HQUFkLGNBQWMsMHdCQXBIZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0hUOzs0RkFFVSxjQUFjO2tCQXhIMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtIVDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIGlucHV0LFxuICBvdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVBY3Rpb24sIFRhYmxlQ29sdW1uIH0gZnJvbSAnLi90YWJsZS50eXBlcyc7XG5cbi8qKlxuICogVGFibGEgZ2Vuw6lyaWNhIHkgYWduw7NzdGljYSBhbCBkb21pbmlvIGRlIGRhdG9zLlxuICpcbiAqIFNvbG8gcmVuZGVyaXphIGxhcyBjb2x1bW5hcyBkZWZpbmlkYXMgeSBlbWl0ZSBhY2Npb25lcyBhbCBjb21wb25lbnRlIHBhZHJlLlxuICogRWwgcGFkcmUgZXMgcmVzcG9uc2FibGUgZGUgaW50ZXJwcmV0YXIgY2FkYSBhY2Npw7NuIHJlY2liaWRhLlxuICpcbiAqIE1hbmVqYSB0cmVzIGVzdGFkb3MgdmlzdWFsZXM6XG4gKiAtICoqbG9hZGluZyoqOiBtdWVzdHJhIHNrZWxldG9uIHJvd3MgYW5pbWFkb3NcbiAqIC0gKiplcnJvcioqOiBtdWVzdHJhIGVsIG1lbnNhamUgZGUgZXJyb3IgcmVjaWJpZG9cbiAqIC0gKiplbXB0eSoqOiBtdWVzdHJhIGVsIG1lbnNhamUgZGUgZXN0YWRvIHZhY8Otb1xuICpcbiAqIEB0ZW1wbGF0ZSBUIFRpcG8gZGVsIG9iamV0byBkZSBkYXRvcy4gRGViZSBzZXIgdW4gb2JqZXRvIGNvbiBjbGF2ZXMgc3RyaW5nLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8dWktdGFibGVcbiAqICAgW2NvbHVtbnNdPVwiW3sga2V5OiAnbmFtZScsIGhlYWRlcjogJ05vbWJyZScgfSwgeyBrZXk6ICdzdGF0dXMnLCBoZWFkZXI6ICdFc3RhZG8nIH1dXCJcbiAqICAgW3Jvd3NdPVwiY2hhcmFjdGVyc1wiXG4gKiAgIFtsb2FkaW5nXT1cImlzTG9hZGluZ1wiXG4gKiAgIFtlcnJvck1lc3NhZ2VdPVwiZXJyb3JNc2dcIlxuICogICBlbXB0eU1lc3NhZ2U9XCJObyBoYXkgcGVyc29uYWplcyBwYXJhIG1vc3RyYXJcIlxuICogICAoYWN0aW9uVHJpZ2dlcmVkKT1cIm9uVGFibGVBY3Rpb24oJGV2ZW50KVwiXG4gKiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1aS10YWJsZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJvdmVyZmxvdy14LWF1dG8gcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWdyYXktNzAwLzYwXCI+XG4gICAgICA8dGFibGUgY2xhc3M9XCJ3LWZ1bGwgdGV4dC1zbSB0ZXh0LWxlZnRcIj5cblxuICAgICAgICA8IS0tIEVuY2FiZXphZG9zIC0tPlxuICAgICAgICA8dGhlYWQgY2xhc3M9XCJiZy1ncmF5LTgwMC85MCBib3JkZXItYiBib3JkZXItZ3JheS03MDBcIj5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICBAZm9yIChjb2wgb2YgY29sdW1ucygpOyB0cmFjayBjb2wua2V5KSB7XG4gICAgICAgICAgICAgIDx0aFxuICAgICAgICAgICAgICAgIGNsYXNzPVwicHgtNiBweS0zLjUgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtZ3JlZW4tNDAwXG4gICAgICAgICAgICAgICAgICAgICAgIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3Qgd2hpdGVzcGFjZS1ub3dyYXBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3sgY29sLmhlYWRlciB9fVxuICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPHRoXG4gICAgICAgICAgICAgIGNsYXNzPVwicHgtNiBweS0zLjUgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtZ3JlZW4tNDAwXG4gICAgICAgICAgICAgICAgICAgICB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgQWNjaW9uZXNcbiAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cblxuICAgICAgICA8dGJvZHkgY2xhc3M9XCJkaXZpZGUteSBkaXZpZGUtZ3JheS03MDAvNTBcIj5cblxuICAgICAgICAgIDwhLS0gRXN0YWRvOiBsb2FkaW5nIOKGkiBza2VsZXRvbiByb3dzIC0tPlxuICAgICAgICAgIEBpZiAobG9hZGluZygpKSB7XG4gICAgICAgICAgICBAZm9yIChfIG9mIHNrZWxldG9uUm93czsgdHJhY2sgJGluZGV4KSB7XG4gICAgICAgICAgICAgIDx0ciBjbGFzcz1cImJnLWdyYXktOTAwLzUwXCI+XG4gICAgICAgICAgICAgICAgQGZvciAoY29sIG9mIGNvbHVtbnMoKTsgdHJhY2sgY29sLmtleSkge1xuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicHgtNiBweS00XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImgtMy41IHJvdW5kZWQtZnVsbCBhbmltYXRlLXB1bHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwic2tlbGV0b25XaWR0aHNbJGluZGV4ICUgc2tlbGV0b25XaWR0aHMubGVuZ3RoXVwiXG4gICAgICAgICAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInB4LTYgcHktNFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImgtMy41IHctMTAgYmctZ3JheS03MDAgcm91bmRlZC1mdWxsIGFuaW1hdGUtcHVsc2VcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImgtMy41IHctMTQgYmctZ3JheS03MDAgcm91bmRlZC1mdWxsIGFuaW1hdGUtcHVsc2VcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICA8IS0tIEVzdGFkbzogZXJyb3IgZGUgcmVkIC0tPlxuICAgICAgICAgIH0gQGVsc2UgaWYgKGVycm9yTWVzc2FnZSgpKSB7XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJiZy1yZWQtOTUwLzMwXCI+XG4gICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgIFthdHRyLmNvbHNwYW5dPVwiY29sdW1ucygpLmxlbmd0aCArIDFcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicHgtNiBweS0xMiB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC0zeGxcIj7imqDvuI88L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRleHQtcmVkLTQwMCBmb250LW1lZGl1bVwiPnt7IGVycm9yTWVzc2FnZSgpIH19PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cblxuICAgICAgICAgIDwhLS0gRXN0YWRvOiBzaW4gcmVzdWx0YWRvcyAtLT5cbiAgICAgICAgICB9IEBlbHNlIGlmIChyb3dzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJiZy1ncmF5LTkwMC8zMFwiPlxuICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICBbYXR0ci5jb2xzcGFuXT1cImNvbHVtbnMoKS5sZW5ndGggKyAxXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInB4LTYgcHktMTYgdGV4dC1jZW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtNHhsXCI+8J+buDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGV4dC1ncmF5LTUwMCBpdGFsaWNcIj57eyBlbXB0eU1lc3NhZ2UoKSB9fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG5cbiAgICAgICAgICA8IS0tIEVzdGFkbyBub3JtYWw6IGRhdG9zIC0tPlxuICAgICAgICAgIH0gQGVsc2Uge1xuICAgICAgICAgICAgQGZvciAocm93IG9mIHJvd3MoKTsgdHJhY2sgJGluZGV4KSB7XG4gICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYmctZ3JheS05MDAvNDAgaG92ZXI6YmctZ3JlZW4tNTAwLzVcbiAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMTUwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIEBmb3IgKGNvbCBvZiBjb2x1bW5zKCk7IHRyYWNrIGNvbC5rZXkpIHtcbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInB4LTYgcHktMy41IHRleHQtZ3JheS0zMDAgd2hpdGVzcGFjZS1ub3dyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgZ2V0Q2VsbChyb3csIGNvbC5rZXkpIH19XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJweC02IHB5LTMuNVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmVlbi00MDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG92ZXI6dGV4dC1ncmVlbi0zMDAgdHJhbnNpdGlvbi1jb2xvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZXJsaW5lIHVuZGVybGluZS1vZmZzZXQtMlwiXG4gICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImFjdGlvblRyaWdnZXJlZC5lbWl0KHsgYWN0aW9uOiAndmlldycsIHJvdyB9KVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBWZXIgZGV0YWxsZVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXJlZC00MDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG92ZXI6dGV4dC1yZWQtMzAwIHRyYW5zaXRpb24tY29sb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybGluZSB1bmRlcmxpbmUtb2Zmc2V0LTJcIlxuICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJhY3Rpb25UcmlnZ2VyZWQuZW1pdCh7IGFjdGlvbjogJ2RlbGV0ZScsIHJvdyB9KVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBFbGltaW5hclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUNvbXBvbmVudDxUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4+IHtcbiAgLyoqIERlZmluaWNpw7NuIGRlIGNvbHVtbmFzIGEgcmVuZGVyaXphciAqL1xuICBjb2x1bW5zID0gaW5wdXQucmVxdWlyZWQ8VGFibGVDb2x1bW5bXT4oKTtcblxuICAvKiogQXJyYXkgZGUgZGF0b3MuIEdlbsOpcmljbzogZnVuY2lvbmEgY29uIGN1YWxxdWllciB0aXBvIGRlIHJlY3Vyc28gKi9cbiAgcm93cyA9IGlucHV0LnJlcXVpcmVkPFRbXT4oKTtcblxuICAvKiogQ3VhbmRvIHRydWUsIG11ZXN0cmEgc2tlbGV0b24gcm93cyBhbmltYWRvcyBlbiBsdWdhciBkZSBsb3MgZGF0b3NcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGxvYWRpbmcgPSBpbnB1dDxib29sZWFuPihmYWxzZSk7XG5cbiAgLyoqIE1lbnNhamUgYSBtb3N0cmFyIGN1YW5kbyByb3dzIGVzdMOhIHZhY8Otb1xuICAgKiBAZGVmYXVsdCAnTm8gaGF5IHJlc3VsdGFkb3MnXG4gICAqL1xuICBlbXB0eU1lc3NhZ2UgPSBpbnB1dDxzdHJpbmc+KCdObyBoYXkgcmVzdWx0YWRvcycpO1xuXG4gIC8qKiBNZW5zYWplIGRlIGVycm9yIGRlIHJlZCB2aXNpYmxlIGVuIGxhIHRhYmxhLiBudWxsIG9jdWx0YSBlbCBlc3RhZG8gZGUgZXJyb3JcbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgZXJyb3JNZXNzYWdlID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqIEVtaXRlIHVuIFRhYmxlQWN0aW9uIGNvbiBsYSBhY2Npw7NuICgndmlldycgfCAnZGVsZXRlJykgeSBlbCByb3cgY29tcGxldG8uXG4gICAqIEVsIGNvbXBvbmVudGUgcGFkcmUgaW50ZXJwcmV0YSB5IG1hbmVqYSBjYWRhIGFjY2nDs24uXG4gICAqL1xuICBhY3Rpb25UcmlnZ2VyZWQgPSBvdXRwdXQ8VGFibGVBY3Rpb248VD4+KCk7XG5cbiAgLyoqIEZpbGFzIGRlIHNrZWxldG9uIChjYW50aWRhZCBmaWphIHBhcmEgZWZlY3RvIHZpc3VhbCBjb25zaXN0ZW50ZSkgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNrZWxldG9uUm93cyA9IEFycmF5KDYpLmZpbGwobnVsbCk7XG5cbiAgLyoqIEFuY2hvcyB2YXJpYWJsZXMgcGFyYSBsb3Mgc2tlbGV0b24sIHBhcmEgdmVyc2UgbcOhcyBuYXR1cmFsZXMgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNrZWxldG9uV2lkdGhzID0gW1xuICAgICdiZy1ncmF5LTcwMCB3LTMvNCcsXG4gICAgJ2JnLWdyYXktNzAwIHctMS8yJyxcbiAgICAnYmctZ3JheS03MDAgdy01LzYnLFxuICAgICdiZy1ncmF5LTcwMCB3LTIvMycsXG4gICAgJ2JnLWdyYXktNzAwIHctNC81JyxcbiAgXTtcblxuICAvKipcbiAgICogQWNjZWRlIGRlIGZvcm1hIHNlZ3VyYSBhIHVuYSBwcm9waWVkYWQgZGluw6FtaWNhIGRlbCByb3cuXG4gICAqIENvbnZpZXJ0ZSBlbCB2YWxvciBhIHN0cmluZyBwYXJhIHJlbmRlcml6YWRvLCBvIG11ZXN0cmEgJ+KAlCcgc2kgZXMgbnVsby5cbiAgICpcbiAgICogQHBhcmFtIHJvdyAtIEVsIG9iamV0byBkZSBkYXRvcyBkZSBsYSBmaWxhXG4gICAqIEBwYXJhbSBrZXkgLSBMYSBjbGF2ZSBkZSBsYSBjb2x1bW5hIGEgb2J0ZW5lclxuICAgKi9cbiAgcHJvdGVjdGVkIGdldENlbGwocm93OiBULCBrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgdmFsID0gcm93W2tleV07XG4gICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09ICcnKSByZXR1cm4gJ+KAlCc7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICByZXR1cm4gU3RyaW5nKHZhbCk7XG4gIH1cbn1cbiJdfQ==