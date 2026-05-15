import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

/** Estilo visual del contenedor de la card */
export type CardElevation = 'flat' | 'raised' | 'outlined';

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
@Component({
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
})
export class CardComponent {
  /** Título principal del header de la card */
  title = input.required<string>();

  /** Subtítulo opcional debajo del título
   * @default null
   */
  subtitle = input<string | null>(null);

  /** Estilo visual del contenedor
   * @default 'raised'
   */
  elevation = input<CardElevation>('raised');

  /** Emite void al hacer clic en el área del header */
  headerClicked = output<void>();

  /**
   * Clases del contenedor calculadas según elevation.
   */
  protected cardClasses = computed(() => {
    const base =
      'rounded-xl overflow-hidden bg-gray-900 text-white w-full';

    const elevations: Record<CardElevation, string> = {
      flat: 'bg-gray-900/50',
      raised: 'shadow-2xl shadow-black/60',
      outlined: 'border border-green-500/30 shadow-lg shadow-green-500/5',
    };

    return `${base} ${elevations[this.elevation()]}`;
  });
}
