import * as i0 from '@angular/core';
import { input, output, computed, ChangeDetectionStrategy, Component, model } from '@angular/core';
import { CommonModule } from '@angular/common';

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
class ButtonComponent {
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
class CardComponent {
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
class SelectComponent {
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
class TableComponent {
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

/*
 * Public API Surface of ui-lib
 * Solo exportar desde aquí. La demo-app NO debe hacer importaciones internas.
 */
// Button

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonComponent, CardComponent, SelectComponent, TableComponent };
//# sourceMappingURL=ui-lib.mjs.map
