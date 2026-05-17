import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Injectable, computed, inject, signal } from '@angular/core';
import {
  ApiResponse,
  Character,
  Episode,
  RMLocation,
  ResourceType,
  StatusFilter,
} from '../models/rick-and-morty.models';

const BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Servicio central del Explorer.
 *
 * Gestiona todo el estado de la aplicación usando Signals de Angular 17+.
 * Los componentes NO hacen llamadas HTTP — solo leen signals y llaman métodos.
 *
 * Estado disponible (solo lectura desde el exterior):
 * - `activeResource` — recurso seleccionado actualmente
 * - `activeStatus`   — filtro de status activo
 * - `rows`           — datos de la tabla
 * - `loading`        — true mientras hay una petición en curso
 * - `errorMessage`   — mensaje de error o null
 * - `selectedRow`    — fila seleccionada para el modal
 * - `modalOpen`      — true cuando el modal de detalle está visible
 */
@Injectable({ providedIn: 'root' })
export class ExplorerService {
  private readonly http = inject(HttpClient);

  // ─── Estado privado con signals ──────────────────────────────────────────

  private readonly _activeResource = signal<ResourceType>('character');
  private readonly _activeStatus = signal<StatusFilter>('');
  private readonly _rows = signal<Record<string, unknown>[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _errorMessage = signal<string | null>(null);
  private readonly _selectedRow = signal<Record<string, unknown> | null>(null);
  private readonly _modalOpen = signal<boolean>(false);

  // ─── Signals de solo lectura expuestas al exterior ───────────────────────

  /** Recurso activo actualmente en el Explorer */
  readonly activeResource = this._activeResource.asReadonly();

  /** Filtro de status activo. Cadena vacía significa "todos" */
  readonly activeStatus = this._activeStatus.asReadonly();

  /** Filas de datos para la tabla */
  readonly rows = this._rows.asReadonly();

  /** true mientras hay una petición HTTP en curso */
  readonly loading = this._loading.asReadonly();

  /** Mensaje de error de la última petición, o null si no hubo error */
  readonly errorMessage = this._errorMessage.asReadonly();

  /** Fila seleccionada para mostrar en el modal de detalle */
  readonly selectedRow = this._selectedRow.asReadonly();

  /** true cuando el modal de detalle está abierto */
  readonly modalOpen = this._modalOpen.asReadonly();

  // ─── Computed signals ────────────────────────────────────────────────────

  /**
   * URL del endpoint actual, calculada desde el recurso y filtro activos.
   * Se recalcula automáticamente cuando cambian `activeResource` o `activeStatus`.
   */
  readonly endpointUrl = computed(() => {
    const base = `${BASE_URL}/${this._activeResource()}`;
    const status = this._activeStatus();
    return status ? `${base}?status=${status}` : base;
  });

  // ─── Acciones públicas ───────────────────────────────────────────────────

  /**
   * Cambia el recurso activo y resetea el filtro de status.
   * Dispara automáticamente una nueva carga de datos.
   *
   * @param resource - Nuevo recurso a explorar
   */
  setResource(resource: ResourceType): void {
    this._activeResource.set(resource);
    this._activeStatus.set(''); // Reset del filtro al cambiar recurso
    this.fetchData();
  }

  /**
   * Aplica un filtro de status y recarga los datos.
   *
   * @param status - Status a filtrar, o cadena vacía para "todos"
   */
  setStatus(status: StatusFilter): void {
    this._activeStatus.set(status);
    this.fetchData();
  }

  /**
   * Abre el modal de detalle con el row seleccionado.
   *
   * @param row - Objeto de datos completo de la fila seleccionada
   */
  openDetail(row: Record<string, unknown>): void {
    this._selectedRow.set(row);
    this._modalOpen.set(true);
  }

  /** Cierra el modal de detalle y limpia la fila seleccionada */
  closeModal(): void {
    this._modalOpen.set(false);
    this._selectedRow.set(null);
  }

  /**
   * Carga datos del endpoint activo.
   * Gestiona los estados loading, error y éxito.
   */
  fetchData(): void {
    this._loading.set(true);
    this._errorMessage.set(null);
    this._rows.set([]);

    this.http
      .get<ApiResponse<Character | Episode | RMLocation>>(this.endpointUrl())
      .pipe(delay(1500))
      .subscribe({
        next: (response) => {
          // Cast seguro: la tabla genérica trabaja con Record<string, unknown>
          this._rows.set(response.results as unknown as Record<string, unknown>[]);
          this._loading.set(false);
        },
        error: () => {
          this._errorMessage.set(
            'No se pudo conectar con la API de Rick & Morty. ' +
              'Verifica tu conexión e intenta de nuevo.'
          );
          this._loading.set(false);
        },
      });
  }

  /** Carga inicial con Characters preseleccionados */
  initialize(): void {
    this.fetchData();
  }
}
