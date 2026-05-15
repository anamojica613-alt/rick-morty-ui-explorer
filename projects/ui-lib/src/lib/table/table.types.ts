/**
 * Definición de una columna de la tabla genérica.
 */
export interface TableColumn {
  /** Clave del objeto de datos que se renderizará en esta columna */
  key: string;
  /** Texto del encabezado visible en la tabla */
  header: string;
}

/**
 * Acción emitida por la tabla al interactuar con un row.
 * La tabla no interpreta la acción — esa responsabilidad es del padre.
 *
 * @template T Tipo del objeto de datos de cada fila
 */
export interface TableAction<T = unknown> {
  /** Tipo de acción: ver detalle o eliminar */
  action: 'view' | 'delete';
  /** Objeto completo del row sobre el que se ejecutó la acción */
  row: T;
}
