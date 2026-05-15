# UI Component Library — Angular 17+ · Rick & Morty Explorer

Proyecto técnico que implementa una **librería de componentes Angular propia** (`ui-lib`) y una **demo app** que la consume, explorando la Rick and Morty API con un flujo completo de filtrado y visualización.

---

## Arquitectura

```
my-workspace/
├── projects/
│   ├── ui-lib/          ← Librería de componentes (standalone, OnPush, Signals)
│   └── demo-app/        ← App consumidora (no importa rutas internas de ui-lib)
├── tailwind.config.js
└── angular.json
```

**Decisión clave:** El workspace de Angular separa la librería de la aplicación. `demo-app` solo importa desde `'ui-lib'` (el paquete compilado), nunca desde rutas internas. Esto garantiza desacoplamiento real y una Public API limpia.

---

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Compilar la librería (requerido antes de servir la demo)
ng build ui-lib

# 3. Servir la demo app
ng serve demo-app

# 4. Abrir en el navegador
# http://localhost:4200
```

---

## API de Componentes

### `<ui-button>`

| Tipo | Nombre | TypeScript | Default | Descripción |
|------|--------|-----------|---------|-------------|
| `input()` | `label` | `string` | — (requerido) | Texto visible del botón |
| `input()` | `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Estilo visual |
| `input()` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón |
| `input()` | `disabled` | `boolean` | `false` | Bloquea interacción |
| `input()` | `loading` | `boolean` | `false` | Spinner + bloqueo |
| `output()` | `clicked` | `void` | — | Emite si no está blocked |

```html
<ui-button label="Guardar" variant="primary" [loading]="isSaving" (clicked)="save()" />
<ui-button label="Cancelar" variant="secondary" (clicked)="cancel()" />
<ui-button label="Eliminar" variant="danger" [disabled]="!canDelete" (clicked)="delete()" />
```

---

### `<ui-card>`

| Tipo | Nombre | TypeScript | Default | Descripción |
|------|--------|-----------|---------|-------------|
| `input()` | `title` | `string` | — (requerido) | Título del header |
| `input()` | `subtitle` | `string \| null` | `null` | Subtítulo opcional |
| `input()` | `elevation` | `'flat' \| 'raised' \| 'outlined'` | `'raised'` | Estilo visual |
| `output()` | `headerClicked` | `void` | — | Emite al clic en header |
| `ng-content` | — | — | — | Proyecta contenido al body |

```html
<ui-card title="Rick Sanchez" subtitle="Alive · Human" elevation="raised" (headerClicked)="onHeader()">
  <p>Contenido proyectado aquí</p>
</ui-card>
```

---

### `<ui-select>`

| Tipo | Nombre | TypeScript | Default | Descripción |
|------|--------|-----------|---------|-------------|
| `input()` | `options` | `SelectOption[]` | — (requerido) | Lista de opciones |
| `input()` | `label` | `string` | — (requerido) | Etiqueta visible |
| `input()` | `placeholder` | `string` | `'Selecciona una opción'` | Texto sin selección |
| `input()` | `loading` | `boolean` | `false` | Skeleton de carga |
| `input()` | `disabled` | `boolean` | `false` | Bloquea interacción |
| `model()` | `value` | `string \| null` | `null` | Two-way binding |
| `output()` | `selectionChange` | `SelectOption` | — | Emite objeto completo |

```html
<ui-select
  label="Recurso"
  [options]="[{ label: 'Personajes', value: 'character' }]"
  [(value)]="selectedResource"
  (selectionChange)="onResourceChange($event)"
/>
```

---

### `<ui-table>`

| Tipo | Nombre | TypeScript | Default | Descripción |
|------|--------|-----------|---------|-------------|
| `input()` | `columns` | `TableColumn[]` | — (requerido) | Definición de columnas |
| `input()` | `rows` | `T[]` (genérico) | — (requerido) | Datos a renderizar |
| `input()` | `loading` | `boolean` | `false` | Skeleton rows |
| `input()` | `emptyMessage` | `string` | `'No hay resultados'` | Mensaje vacío |
| `input()` | `errorMessage` | `string \| null` | `null` | Mensaje de error |
| `output()` | `actionTriggered` | `TableAction<T>` | — | Emite acción + row |

```html
<ui-table
  [columns]="[{ key: 'name', header: 'Nombre' }, { key: 'status', header: 'Estado' }]"
  [rows]="characters"
  [loading]="isLoading"
  [errorMessage]="errorMsg"
  emptyMessage="Sin personajes encontrados"
  (actionTriggered)="onAction($event)"
/>
```

---

## Decisiones de Diseño

### Signals API sobre decoradores clásicos
Se usan `input()`, `output()` y `model()` de Angular 17+ en todos los componentes. Los decoradores `@Input()` / `@Output()` están prohibidos por las convenciones del proyecto. `model()` es especialmente importante en `ui-select` para el two-way binding limpio con `[(value)]`.

### `ChangeDetectionStrategy.OnPush` universal
Todos los componentes usan OnPush. Con Signals, Angular sabe exactamente cuándo re-renderizar: solo cuando cambia un signal/input. Esto elimina el ciclo de detección de cambios innecesario y mejora el rendimiento.

### Tabla genérica `T extends Record<string, unknown>`
La tabla no conoce el dominio. Usa un tipo genérico con la restricción `Record<string, unknown>` para permitir acceso dinámico seguro por clave sin usar `any`. El padre define las columnas y maneja las acciones.

### Estado centralizado en `ExplorerService` con Signals
Ningún componente hace HTTP. El servicio expone signals de solo lectura (`asReadonly()`) y métodos de acción. Los componentes son "tontos" — solo leen estado y emiten eventos. Esto facilita testing y mantenimiento.

### Tailwind CSS v3 con tema Rick & Morty
Paleta oscura (gray-950, gray-900) con verde portal (green-400/500) como acento principal. Tipografías Orbitron (headings) + Exo 2 (cuerpo) para evocar la estética sci-fi de la serie.

---

## Uso de IA

Este proyecto fue desarrollado con asistencia de Claude (Anthropic). Cada decisión fue revisada, entendida y validada manualmente. Las partes generadas fueron aceptadas cuando:
- El tipado era correcto y sin `any`
- Las convenciones de Angular 17+ (Signals, standalone, OnPush) se aplicaban correctamente
- La lógica era coherente con la arquitectura definida

Se modificaron o rechazaron partes cuando el tipado era impreciso o la lógica no seguía el patrón de signals del servicio.
