import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  ButtonComponent,
  CardComponent,
  SelectComponent,
  TableComponent,
  TableAction,
  TableColumn,
  SelectOption,
} from 'ui-lib';
import { ExplorerService } from '../../services/explorer.service';
import { ResourceType, StatusFilter } from '../../models/rick-and-morty.models';

/** Mapa de columnas por recurso */
const COLUMN_MAP: Record<ResourceType, TableColumn[]> = {
  character: [
    { key: 'name', header: 'Nombre' },
    { key: 'status', header: 'Estado' },
    { key: 'species', header: 'Especie' },
    { key: 'gender', header: 'Género' },
  ],
  episode: [
    { key: 'name', header: 'Título' },
    { key: 'episode', header: 'Cód. Episodio' },
    { key: 'air_date', header: 'Fecha de Emisión' },
  ],
  location: [
    { key: 'name', header: 'Nombre' },
    { key: 'type', header: 'Tipo' },
    { key: 'dimension', header: 'Dimensión' },
  ],
};

/**
 * Página principal del Explorer de Rick & Morty.
 *
 * Orquesta los cuatro componentes de ui-lib en un flujo cohesivo:
 * - ui-select para recurso activo y filtro de status
 * - ui-table para mostrar los resultados
 * - Modal con ui-card para ver el detalle de un registro
 *
 * No hace llamadas HTTP directas — delega todo al ExplorerService.
 */
@Component({
  selector: 'app-explorer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, CardComponent, SelectComponent, TableComponent],
  template: `
    <div class="min-h-screen bg-gray-950 text-white">

      <!-- Header -->
      <header
        class="border-b border-green-500/20 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🛸</span>
            <div>
              <h1 class="text-xl font-bold text-green-400 leading-none">
                Rick & Morty
              </h1>
              <p class="text-xs text-gray-500 mt-0.5">Universe Explorer</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Main content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <!-- Controles de filtro -->
        <section
          class="flex flex-col sm:flex-row gap-4 mb-8 p-5 rounded-xl
                 bg-gray-900/60 border border-gray-800"
        >
          <div class="flex-1">
            <ui-select
              label="Recurso"
              placeholder="Selecciona un recurso"
              [options]="resourceOptions"
              [value]="explorer.activeResource()"
              (selectionChange)="onResourceChange($event)"
            />
          </div>
          <div class="flex-1">
            <ui-select
              label="Filtrar por estado"
              placeholder="Todos los estados"
              [options]="statusOptions"
              [value]="explorer.activeStatus()"
              (selectionChange)="onStatusChange($event)"
            />
          </div>
        </section>

        <!-- Info de resultados -->
        @if (!explorer.loading() && !explorer.errorMessage() && explorer.rows().length > 0) {
          <p class="text-xs text-gray-500 mb-3">
            Mostrando {{ explorer.rows().length }} resultados
          </p>
        }

        <!-- Tabla principal -->
        <ui-table
          [columns]="currentColumns"
          [rows]="explorer.rows()"
          [loading]="explorer.loading()"
          [errorMessage]="explorer.errorMessage()"
          emptyMessage="No se encontraron resultados para este filtro 🛸"
          (actionTriggered)="onAction($event)"
        />
      </main>

      <!-- Modal de detalle -->
      @if (explorer.modalOpen()) {
        <div
          class="fixed inset-0 bg-black/75 flex items-center justify-center
                 z-50 p-4 backdrop-blur-sm"
          (click)="explorer.closeModal()"
        >
          <!-- Contenedor del modal: stopPropagation para no cerrar al click interno -->
          <div
            class="w-full max-w-lg max-h-[85vh] overflow-y-auto"
            (click)="$event.stopPropagation()"
          >
            <ui-card
              [title]="getRowField('name')"
              [subtitle]="buildSubtitle()"
              elevation="raised"
              (headerClicked)="explorer.closeModal()"
            >
              <!-- Contenido proyectado via ng-content -->
              <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-5">
                @for (field of detailFields; track field.key) {
                  <div class="min-w-0">
                    <dt class="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                      {{ field.key }}
                    </dt>
                    <dd class="text-white font-medium truncate" [title]="field.value">
                      {{ field.value }}
                    </dd>
                  </div>
                }
              </dl>

              <div class="flex justify-end pt-3 border-t border-gray-700/50">
                <ui-button
                  label="Cerrar"
                  variant="secondary"
                  size="sm"
                  (clicked)="explorer.closeModal()"
                />
              </div>
            </ui-card>
          </div>
        </div>
      }

      @if (rowToDelete()) {
        <div
          class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          (click)="cancelDelete()"
        >
          <div
            class="w-full max-w-sm rounded-2xl border border-red-500/40 bg-gray-900 p-6"
            (click)="$event.stopPropagation()"
          >
            <div class="flex justify-center mb-4"><span class="text-5xl animate-bounce">☠️</span></div>
            <h2 class="text-center font-bold text-lg text-red-400 mb-2" style="font-family:Orbitron,sans-serif;">Zona de peligro</h2>
            <p class="text-center text-gray-300 text-sm mb-1">Seguro que quieres eliminar del multiverso a</p>
            <p class="text-center text-green-400 font-bold text-base mb-3">{{ getDeleteName() }}</p>
            <p class="text-center text-xs text-gray-500 mb-6 italic">Esta accion no tiene vuelta atras... ni con el portal gun.</p>
            <div class="flex gap-3">
              <button class="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors text-sm" (click)="cancelDelete()">Mejor no...</button>
              <button class="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-bold" (click)="confirmDelete()">Eliminar</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class ExplorerComponent implements OnInit {
  readonly explorer = inject(ExplorerService);

  readonly rowToDelete = signal<Record<string, unknown> | null>(null);

  /** Opciones del select de recurso */
  readonly resourceOptions: SelectOption[] = [
    { label: '👤 Personajes', value: 'character' },
    { label: '📺 Episodios', value: 'episode' },
    { label: '📍 Ubicaciones', value: 'location' },
  ];

  /** Opciones del select de status */
  readonly statusOptions: SelectOption[] = [
    { label: '🟢 Vivo', value: 'alive' },
    { label: '💀 Muerto', value: 'dead' },
    { label: '❓ Desconocido', value: 'unknown' },
  ];

  /** Columnas calculadas según el recurso activo */
  get currentColumns(): TableColumn[] {
    return COLUMN_MAP[this.explorer.activeResource()];
  }

  /** Campos del registro seleccionado para mostrar en el modal */
  get detailFields(): { key: string; value: string }[] {
    const row = this.explorer.selectedRow();
    if (!row) return [];

    // Filtrar solo propiedades primitivas (no arrays ni objetos anidados complejos)
    return Object.entries(row)
      .filter(([, v]) => {
        if (v === null || v === undefined) return false;
        if (Array.isArray(v)) return false;
        if (typeof v === 'object') return true; // LocationRef, etc.
        return true;
      })
      .map(([key, value]) => ({
        key,
        value:
          typeof value === 'object'
            ? (value as Record<string, unknown>)['name']?.toString() ?? '—'
            : String(value),
      }));
  }

  ngOnInit(): void {
    this.explorer.initialize();
  }

  /** Cambia el recurso activo — el servicio resetea el filtro internamente */
  onResourceChange(opt: SelectOption): void {
    this.explorer.setResource(opt.value as ResourceType);
  }

  /** Aplica filtro de status */
  onStatusChange(opt: SelectOption): void {
    this.explorer.setStatus(opt.value as StatusFilter);
  }

  /** Maneja las acciones de la tabla */
  onAction(event: TableAction<Record<string, unknown>>): void {
    if (event.action === 'view') {
      this.explorer.openDetail(event.row);
    }
  if (event.action === 'delete') {
      const name = String(event.row['name'] ?? 'este registro');
      if (window.confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) {
        console.log('[ui-table] actionTriggered: delete confirmed', event.row);
      }
    }

  getDeleteName(): string {
    const row = this.rowToDelete();
    if (!row) return '';
    return String(row['name'] ?? 'este registro');
  }

  cancelDelete(): void {
    this.rowToDelete.set(null);
  }

  confirmDelete(): void {
    console.log('delete confirmed', this.rowToDelete());
    this.rowToDelete.set(null);
  }

  /** Obtiene un campo del row seleccionado como string */
  getRowField(key: string): string {
    const row = this.explorer.selectedRow();
    if (!row) return '';
    const val = row[key];
    return val !== null && val !== undefined ? String(val) : '';
  }

  /** Construye el subtítulo del modal según el recurso activo */
  buildSubtitle(): string {
    const resource = this.explorer.activeResource();
    const row = this.explorer.selectedRow();
    if (!row) return '';

    if (resource === 'character') {
      return `${row['status'] ?? ''} · ${row['species'] ?? ''}`;
    }
    if (resource === 'episode') {
      return String(row['episode'] ?? '');
    }
    if (resource === 'location') {
      return String(row['type'] ?? '');
    }
    return '';
  }
}
