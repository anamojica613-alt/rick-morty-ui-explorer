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

@Component({
  selector: 'app-explorer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, CardComponent, SelectComponent, TableComponent],
  template: `
    <div class="min-h-screen bg-gray-950 text-white">
      <header class="border-b border-green-500/20 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🛸</span>
            <div>
              <h1 class="text-xl font-bold text-green-400 leading-none">Rick & Morty</h1>
              <p class="text-xs text-gray-500 mt-0.5">Universe Explorer</p>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <section class="flex flex-col sm:flex-row gap-4 mb-8 p-5 rounded-xl bg-gray-900/60 border border-gray-800">
          <div class="flex-1">
            <ui-select label="Recurso" placeholder="Selecciona un recurso" [options]="resourceOptions" [value]="explorer.activeResource()" (selectionChange)="onResourceChange($event)" />
          </div>
          <div class="flex-1">
            <ui-select label="Filtrar por estado" placeholder="Todos los estados" [options]="statusOptions" [value]="explorer.activeStatus()" (selectionChange)="onStatusChange($event)" />
          </div>
        </section>
        @if (!explorer.loading() && !explorer.errorMessage() && explorer.rows().length > 0) {
          <p class="text-xs text-gray-500 mb-3">Mostrando {{ explorer.rows().length }} resultados</p>
        }
        <ui-table [columns]="currentColumns" [rows]="explorer.rows()" [loading]="explorer.loading()" [errorMessage]="explorer.errorMessage()" emptyMessage="No se encontraron resultados 🛸" (actionTriggered)="onAction($event)" />
      </main>
      @if (explorer.modalOpen()) {
        <div class="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm" (click)="explorer.closeModal()">
          <div class="w-full max-w-lg max-h-[85vh] overflow-y-auto" (click)="$event.stopPropagation()">
            <ui-card [title]="getRowField('name')" [subtitle]="buildSubtitle()" elevation="raised" (headerClicked)="explorer.closeModal()">
              <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-5">
                @for (field of detailFields; track field.key) {
                  <div class="min-w-0">
                    <dt class="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{{ field.key }}</dt>
                    <dd class="text-white font-medium truncate" [title]="field.value">{{ field.value }}</dd>
                  </div>
                }
              </dl>
              <div class="flex justify-end pt-3 border-t border-gray-700/50">
                <ui-button label="Cerrar" variant="secondary" size="sm" (clicked)="explorer.closeModal()" />
              </div>
            </ui-card>
          </div>
        </div>
      }
      @if (rowToDelete()) {
        <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm" (click)="cancelDelete()">
          <div class="w-full max-w-sm rounded-2xl border border-red-500/40 bg-gray-900 p-6" (click)="$event.stopPropagation()">
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

  readonly resourceOptions: SelectOption[] = [
    { label: '👤 Personajes', value: 'character' },
    { label: '📺 Episodios', value: 'episode' },
    { label: '📍 Ubicaciones', value: 'location' },
  ];

  readonly statusOptions: SelectOption[] = [
    { label: '🟢 Vivo', value: 'alive' },
    { label: '💀 Muerto', value: 'dead' },
    { label: '❓ Desconocido', value: 'unknown' },
  ];

  get currentColumns(): TableColumn[] {
    return COLUMN_MAP[this.explorer.activeResource()];
  }

  get detailFields(): { key: string; value: string }[] {
    const row = this.explorer.selectedRow();
    if (!row) return [];
    return Object.entries(row)
      .filter(([, v]) => {
        if (v === null || v === undefined) return false;
        if (Array.isArray(v)) return false;
        if (typeof v === 'object') return true;
        return true;
      })
      .map(([key, value]) => ({
        key,
        value: typeof value === 'object'
          ? (value as Record<string, unknown>)['name']?.toString() ?? '—'
          : String(value),
      }));
  }

  ngOnInit(): void {
    this.explorer.initialize();
  }

  onResourceChange(opt: SelectOption): void {
    this.explorer.setResource(opt.value as ResourceType);
  }

  onStatusChange(opt: SelectOption): void {
    this.explorer.setStatus(opt.value as StatusFilter);
  }

  onAction(event: TableAction<Record<string, unknown>>): void {
    if (event.action === 'view') {
      this.explorer.openDetail(event.row);
    }
    if (event.action === 'delete') {
      this.rowToDelete.set(event.row);
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

  getRowField(key: string): string {
    const row = this.explorer.selectedRow();
    if (!row) return '';
    const val = row[key];
    return val !== null && val !== undefined ? String(val) : '';
  }

  buildSubtitle(): string {
    const resource = this.explorer.activeResource();
    const row = this.explorer.selectedRow();
    if (!row) return '';
    if (resource === 'character') return `${row['status'] ?? ''} · ${row['species'] ?? ''}`;
    if (resource === 'episode') return String(row['episode'] ?? '');
    if (resource === 'location') return String(row['type'] ?? '');
    return '';
  }
}
