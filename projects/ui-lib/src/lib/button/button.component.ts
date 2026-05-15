import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/** Variante visual del botón */
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

/** Tamaño del botón */
export type ButtonSize = 'sm' | 'md' | 'lg';

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
@Component({
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
})
export class ButtonComponent {
  /** Texto visible del botón */
  label = input.required<string>();

  /** Estilo visual del botón
   * @default 'primary'
   */
  variant = input<ButtonVariant>('primary');

  /** Tamaño del botón
   * @default 'md'
   */
  size = input<ButtonSize>('md');

  /** Bloquea la interacción visualmente y funcionalmente
   * @default false
   */
  disabled = input<boolean>(false);

  /** Muestra spinner inline y bloquea el click
   * @default false
   */
  loading = input<boolean>(false);

  /** Emite void solo si el botón no está disabled ni en loading */
  clicked = output<void>();

  /**
   * Clases Tailwind calculadas según variant, size y estado.
   * Computed signal: se recalcula solo cuando cambia un input.
   */
  protected buttonClasses = computed(() => {
    const base =
      'inline-flex items-center justify-center font-semibold rounded-lg ' +
      'transition-all duration-200 focus:outline-none focus:ring-2 ' +
      'focus:ring-offset-2 focus:ring-offset-gray-950 ' +
      'disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-base gap-2',
      lg: 'px-7 py-3.5 text-lg gap-2.5',
    };

    const variants: Record<ButtonVariant, string> = {
      primary:
        'bg-green-500 text-gray-950 hover:bg-green-400 ' +
        'focus:ring-green-500 shadow-lg shadow-green-500/25 ' +
        'hover:shadow-green-400/40 active:scale-95',
      secondary:
        'bg-transparent border-2 border-green-500 text-green-400 ' +
        'hover:bg-green-500/10 focus:ring-green-500 active:scale-95',
      danger:
        'bg-red-600 text-white hover:bg-red-500 ' +
        'focus:ring-red-500 shadow-lg shadow-red-600/25 active:scale-95',
    };

    return `${base} ${sizes[this.size()]} ${variants[this.variant()]}`;
  });

  /** Emite el evento solo si no está bloqueado */
  protected handleClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit();
    }
  }
}
