# DEVELOPMENT_LOG.md

Bitácora de desarrollo del proyecto UI Component Library.

---

## Fase 1 — Scaffolding del workspace

**Decisión:** Usar un Angular workspace con dos proyectos internos (`ui-lib` y `demo-app`) en lugar de una sola aplicación monolítica.

**Por qué:** El workspace obliga a mantener la separación real entre librería y consumidor. Si `demo-app` intenta importar desde rutas internas de `ui-lib`, TypeScript lo detecta. Esto es un guardrail estructural, no solo una convención.

**Reto:** Configurar el path mapping en `tsconfig.json` para que `import from 'ui-lib'` resuelva al build local sin necesitar publicar en npm. Se resuelve con `"ui-lib": ["dist/ui-lib"]` en `paths`.

---

## Fase 2 — Componentes de la librería

**Decisión:** Usar `computed()` para las clases Tailwind en Button y Card.

**Por qué:** `computed()` es más explícito que un método: comunica "este valor depende de otros signals y se recalcula automáticamente". Un método también funciona en OnPush, pero `computed()` es semánticamente más correcto.

**Reto — Tabla genérica sin `any`:**
El mayor reto tipado del proyecto. La tabla debe renderizar cualquier tipo de dato sin conocer el dominio. Solución: `T extends Record<string, unknown>`. La restricción garantiza que `T` tiene claves string, permitiendo `row[key]` sin `any`. El cast `response.results as Record<string, unknown>[]` en el servicio es el único punto de "apertura" tipada, y está encapsulado en un solo lugar.

**Decisión — `model()` en ui-select:**
`model()` es el reemplazo oficial de `@Input() value + @Output() valueChange`. Permite `[(value)]="myVar"` en el padre (banana-in-a-box syntax). Es más semántico y más limpio que gestionar dos signals separados.

---

## Fase 3 — Servicio con Signals

**Decisión:** Exponer signals como `readonly` con `.asReadonly()`.

**Por qué:** Previene que un componente llame `.set()` directamente sobre el estado del servicio, lo que rompería el flujo unidireccional. Todas las mutaciones pasan por los métodos públicos del servicio.

**Decisión — `computed()` para `endpointUrl`:**
En lugar de calcular la URL en cada método, `endpointUrl` es un computed signal que depende de `activeResource` y `activeStatus`. Se recalcula automáticamente cuando cualquiera cambia. Esto hace el código más declarativo.

**Reto — Reset del filtro al cambiar recurso:**
`setResource()` llama `this._activeStatus.set('')` antes de `fetchData()`. Así, cuando `fetchData()` lee `endpointUrl()`, ya tiene el status reseteado. El orden importa.

---

## Fase 4 — Integración y UX

**Decisión — Columnas como objeto constante fuera del componente:**
`COLUMN_MAP` se define como `const` a nivel de módulo, no dentro de la clase. Es más eficiente (no se recrea en cada instancia) y más legible.

**Decisión — Modal sin router:**
Para mantener la demo simple y enfocada en los componentes de la librería, el modal usa un signal `modalOpen` en el servicio en lugar de rutas. Si el proyecto creciera, se migraría a un outlet secundario de Angular Router.

**Reto — Contenido del modal según tipo de recurso:**
El modal debe mostrar campos diferentes para Character, Episode y Location. Solución: `detailFields` filtra propiedades primitivas del `selectedRow` y maneja `LocationRef` (objeto anidado) extrayendo su `name`. Esto evita tener tres componentes de detalle separados manteniendo la genericidad.

---

## Uso de herramientas de IA

### Prompt utilizado
"Necesito implementar los cuatro componentes de la librería Angular 17+ con Signals API, sin decoradores clásicos, tipado estricto sin any, y Tailwind CSS v3..."

### Lo que se aceptó
- Estructura base de los componentes con `input()`, `output()`, `model()`
- Patrón de `computed()` para clases Tailwind
- `T extends Record<string, unknown>` para la tabla genérica
- Patrón de signals con `asReadonly()` en el servicio

### Lo que se modificó
- Las clases Tailwind se ajustaron para el tema Rick & Morty (paleta oscura + verde)
- El servicio se refactorizó para separar signals privados de los expuestos públicamente
- El componente Explorer se dividió en responsabilidades más claras
- Se añadió `COLUMN_MAP` como constante de módulo para optimización

### Lo que se rechazó
- Propuestas que usaban `@Input()` / `@Output()` en lugar de la Signals API
- Uso de `any` en la tabla genérica (reemplazado por el tipo genérico correcto)
- Importaciones directas desde rutas internas de `ui-lib`

### Errores de configuración resueltos con IA
- Instalación de `ng-packagr@17` que faltaba como dependencia
- Configuración del `paths` en `tsconfig.json` para resolver `ui-lib` desde `dist/`
- Cast `as unknown as Record<string, unknown>[]` en el servicio para compatibilidad de tipos estrictos

## Fase 5 — Modal de confirmación personalizado estilo Rick & Morty

**Decisión:** Reemplazar `window.confirm()` nativo por un modal completamente personalizado.

**Por qué:** El diálogo nativo del navegador no se puede estilizar y rompe la inmersión visual del tema. Un modal propio permite aplicar la paleta oscura, tipografía Orbitron, animaciones y el tono de humor característico de Rick & Morty.

**Implementación:** Se agregó el signal `rowToDelete` en `ExplorerComponent`. Cuando es `null` el modal está oculto; cuando contiene un row, se muestra el modal con el nombre del personaje. Los métodos `cancelDelete()` y `confirmDelete()` gestionan el estado sin necesidad de librerías externas.

**Reto:** Mantener el tipado estricto al acceder a `row['name']` siendo `row` de tipo `Record<string, unknown>`. Solución: cast explícito con `String(row['name'] ?? 'este registro')`.

**Resultado:** Modal con calavera animada, título en Orbitron, mensaje con personalidad de la serie y botones diferenciados visualmente.