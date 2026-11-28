# Errores Encontrados y Corregidos — Proyecto Tienda (NestJS + Prisma)

Registro consolidado de los **29 errores** detectados y resueltos por el equipo durante la auditoría, corrección y verificación integral del proyecto, organizados por colaborador según la entidad asignada.

---

### 1 — Jesús Cerdán (Coordinador) : Configuración Base, Prisma y Entidad `Pedido`

| # | Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `prisma/schema.prisma` | 20 | Typo | El decorador del campo `email` decía `@uniqe` en lugar de `@unique`. | VS Code lo subrayaba en rojo y `npx prisma generate` fallaba por atributo desconocido. | Cambié `@uniqe` por `@unique`. |
| 2 | `prisma/schema.prisma` | 48 | Lógica | Falta la relación inversa `detalles DetallePedido[]` en el modelo `Producto`. | Prisma arrojaba error de validación de relación al ejecutar `npx prisma generate`. | Agregué `detalles DetallePedido[]` dentro del modelo `Producto`. |
| 3 | `prisma/schema.prisma` | 53 | Typo | El valor por defecto de `estado` decía `@default(PENDENTE)` en lugar de `PENDIENTE`. | VS Code lo marcaba en rojo y Prisma fallaba porque `PENDENTE` no existe en el enum `EstadoPedido`. | Corregí el valor a `@default(PENDIENTE)`. |
| 4 | `package.json` | 12 | Typo | El script `"start:dev"` decía `"nest star --watch"` en lugar de `"nest start --watch"`. | Al ejecutar `npm run start:dev` en la terminal mostraba comando desconocido. | Corregí `"nest star --watch"` por `"nest start --watch"`. |
| 5 | `src/prisma/prisma.service.ts` | 7 | Sintaxis | En el `constructor()` de `PrismaService` que extiende `PrismaClient`, faltaba llamar a `super({ adapter })`. | TypeScript marcaba error porque una clase derivada debe llamar a `super()` con el adaptador. | Agregué `super({ adapter });` después de crear la instancia `adapter`. |
| 6 | `src/app.module.ts` | 5 | Typo | La ruta de importación decía `'./clientes/cliente.module.js'` (en plural) en lugar de `'./cliente/cliente.module.js'`. | VS Code indicaba que no encontraba el módulo porque la carpeta se llama `src/cliente`. | Cambié `'./clientes/cliente.module.js'` por `'./cliente/cliente.module.js'`. |
| 7 | `src/main.ts` | 2 | Importación | `ValidationPipe` se importaba desde `'@nestjs/core'` en lugar de `'@nestjs/common'`. | Error de compilación TS2305 al ejecutar `npm run build`. | Moví `ValidationPipe` a `import { ValidationPipe } from '@nestjs/common';`. |
| 8 | `src/pedido/pedido.module.ts` | 9 | Typo | La clase se exportaba como `PedidoModulo` en lugar de `PedidoModule`. | `app.module.ts` marcaba en rojo que `pedido.module.js` no exportaba `PedidoModule`. | Renombré `PedidoModulo` a `PedidoModule`. |
| 9 | `src/pedido/dto/cambiar-estado.dto.ts` | 6 | Sintaxis | Faltaba una coma `,` entre `enum: EstadoPedido` y `example: EstadoPedido.PAGADO` en `@ApiProperty`. | VS Code subrayaba un error de sintaxis (`',' expected`). | Agregué la coma en `@ApiProperty({ enum: EstadoPedido, example: EstadoPedido.PAGADO })`. |
| 10 | `src/pedido/dto/create-pedido.dto.ts` | 30 | Lógica | Faltaba `@Type(() => ItemPedidoDto)` en `items` para transformar los objetos anidados antes de validarlos. | `Type` estaba importado sin usarse y `class-validator` no validaba cada ítem del arreglo. | Agregué `@Type(() => ItemPedidoDto)` encima de `items!: ItemPedidoDto[];`. |
| 11 | `src/pedido/pedido.controller.ts` | 28 | Lógica | El decorador decía `@Param('id', ParseIntPipe)` en la ruta `@Get('cliente/:clienteId')`. | Al consultar `GET /pedidos/cliente/1`, NestJS lanzaba `400 Bad Request` al buscar `:id`. | Cambié `@Param('id', ParseIntPipe)` por `@Param('clienteId', ParseIntPipe)`. |
| 12 | `src/pedido/pedido.service.ts` | 37 | Lógica | La validación de stock decía `if (producto.stock > item.cantidad)` en lugar de `<`. | Al crear un pedido con stock disponible devolvía `400 Stock insuficiente`. | Cambié el operador a `if (producto.stock < item.cantidad)`. |
| 13 | `src/pedido/pedido.service.ts` | 54 | Lógica | Al descontar el stock del producto decía `decrement: 1` en lugar de `decrement: linea.cantidad`. | Revisión de reglas de negocio: el stock debe descontar la cantidad total pedida. | Cambié `decrement: 1` por `decrement: linea.cantidad`. |
| 14 | `src/pedido/pedido.service.ts` | 73 | Lógica | En `findByCliente`, el orden estaba en `orderBy: { createdAt: 'asc' }`. | Reglas de negocio: el historial debe ordenarse del más reciente al más antiguo (`'desc'`). | Cambié `'asc'` por `'desc'`. |
| 15 | `src/pedido/pedido.service.ts` | 78 | Sintaxis | El método `findOne(id: number)` utilizaba `await` sin estar declarado como `async`. | Error de compilación en TypeScript (`'await' expressions are only allowed within async functions`). | Agregué `async` antes de `findOne(id: number)`. |
| 16 | `src/pedido/pedido.service.ts` | 96 | Lógica | La condición usaba asignación `if ((nuevo = EstadoPedido.CANCELADO))` en lugar de comparación `===`. | Siempre devolvía el stock al cambiar cualquier estado, violando la regla de solo hacerlo al cancelar. | Cambié la condición a `if (nuevo === EstadoPedido.CANCELADO)`. |
| 17 | `src/pedido/utils/calculos.ts` | 12 | Lógica | `calcularSubtotal` sumaba `precio + cantidad` en lugar de multiplicar `precio * cantidad`. | Fallo en test unitario `calculos.spec.ts`. | Cambié `precio + cantidad` por `precio * cantidad`. |
| 18 | `src/pedido/utils/calculos.ts` | 17 | Lógica | `calcularTotal` sumaba `linea.precioUnitario` en lugar de `linea.subtotal`. | Fallo en test unitario `calculos.spec.ts`. | Cambié `acc + linea.precioUnitario` por `acc + linea.subtotal`. |

---

### 2 — Gustavo Andres Santoyo: Entidad `Cliente`

| # | Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 19 | `src/cliente/dto/create-cliente.dto.ts` | 12 | Typo | El campo estaba escrito como `emial` en lugar de `email`. | Inspección del DTO y comparación con el modelo Prisma y las reglas del README. | Cambié `emial` por `email`. |
| 20 | `src/cliente/cliente.controller.ts` | 29 | Sintaxis | El decorador `@Get(':id'` estaba incompleto (faltaba cerrar el paréntesis). | Inspección del controlador y error de sintaxis en el editor. | Completé el decorador como `@Get(':id')`. |
| 21 | `src/cliente/cliente.service.ts` | 16 | Lógica | Se utilizaba `data.nombre` para validar si ya existía un cliente con ese correo electrónico. | Inspección de la lógica de creación y comparación con el esquema Prisma. | Cambié `where: { email: data.nombre }` por `where: { email: data.email }`. |

---

### 3 — Esdras Blanco: Entidad `Categoría`

| # | Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 22 | `src/categoria/dto/create-categoria.dto.ts` | 13 | Sintaxis | Faltaba la llave de cierre `}` al final de la clase `CreateCategoriaDto`. | Error de compilación en TypeScript (`'}' expected`). | Agregué la llave de cierre `}` al final del archivo. |
| 23 | `src/categoria/categoria.service.ts` | 10 | Decorador | Faltaba importar y colocar el decorador `@Injectable()` sobre `CategoriaService`. | Fallo de inyección de dependencias de `PrismaService` al iniciar la aplicación. | Importé `Injectable` desde `@nestjs/common` y agregué `@Injectable()`. |
| 24 | `src/categoria/categoria.service.ts` | 48 | Lógica | Condición invertida al eliminar categoría (`if (cantidad < 0)` en lugar de `cantidad > 0`). | Revisión de reglas de negocio: no se debe eliminar una categoría con productos asociados. | Cambié `cantidad < 0` por `cantidad > 0`. |
| 25 | `src/categoria/categoria.service.ts` | 35 | Lógica | Faltaba validar que el nuevo nombre no estuviera duplicado en otra categoría al actualizar (`update`). | Revisión de reglas de negocio para garantizar unicidad de nombre (`409 Conflict`). | Agregué validación con `findUnique` verificando `existe && existe.id !== id`. |

---

### 4 — Eduardo / Jorge Romainville: Entidad `Producto`

| # | Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 26 | `src/app.module.ts` | 8, 16 | Typo / Importación | El módulo de categoría se importaba con un nombre incorrecto (`CategoriaAppModule` / `CategoriaModulo`). | Error de compilación en TypeScript al no encontrar el módulo exportado. | Corregí la importación y registro a `CategoriaModule` desde `'./categoria/categoria.module.js'`. |
| 27 | `src/producto/producto.service.ts` | 24 | Typo | El modo de búsqueda decía `'insensitiv'` en lugar de `'insensitive'`. | TypeScript marcaba error de tipo en Prisma `QueryMode`. | Corregí `'insensitiv'` por `'insensitive'`. |
| 28 | `src/producto/producto.service.ts` | 32 | Typo | En `include` de `findOne` decía `categorias: true` (en plural) en lugar de `categoria: true`. | Error de tipado de Prisma al no existir la relación `categorias` en el modelo `Producto`. | Cambié `categorias: true` por `categoria: true`. |
| 29 | `src/producto/dto/create-producto.dto.ts` | 24 | Lógica / Validación | El campo `precio` tenía el decorador `@IsInt()` en lugar de `@IsNumber()`, rechazando precios con decimales. | Revisión de DTOs contra el tipo `Float` de Prisma y reglas de negocio. | Reemplacé `@IsInt()` por `@IsNumber()`. |

---

## Resumen Consolidado

### Por Tipo de Error
| Tipo | Cantidad |
| :--- | :---: |
| **Lógica / Validación** | 13 |
| **Typo** | 9 |
| **Sintaxis** | 4 |
| **Importación / Decorador** | 3 |
| **Total** | **29** |

### Por Colaborador y Entidad
| Colaborador | Entidad / Alcance | Errores Corregidos |
| :--- | :--- | :---: |
| **Jesús Cerdán (Coordinador)** | Configuración Base, Prisma y `Pedido` | 18 |
| **Gustavo Andres Santoyo** | `Cliente` | 3 |
| **Esdras Blanco** | `Categoría` | 4 |
| **Eduardo / Jorge Romainville** | `Producto` | 4 |
| **Total** | **Proyecto Completo** | **29** |

---

## Verificación Técnica Final
* `npm run build`: **0 errores de compilación.**
* `npm test`: **8/8 tests unitarios pasando (`src/pedido/utils/calculos.spec.ts`).**
* `npm run test:e2e`: **1/1 suite E2E pasando (`test/app.e2e-spec.ts`).**

---

## Reflexión final

### ¿Qué tipo de error te costó más encontrar y por qué?
Los **errores de lógica de negocio** fueron los más difíciles de detectar porque no generan errores de sintaxis ni impiden que el proyecto compile (`npm run build`). Por ejemplo, en `pedido.service.ts`, el operador invertido en la validación de stock (`producto.stock > item.cantidad`), el descuento fijo de una sola unidad (`decrement: 1`), el orden ascendente en lugar de descendente o la asignación en lugar de comparación al cancelar (`nuevo = EstadoPedido.CANCELADO`) pasaban desapercibidos para el compilador y requerían contrastar línea por línea cada método con las reglas del `README.md`.

### ¿Qué herramienta te ayudó más (editor, terminal, Swagger/Postman, tests)?
La combinación de **la terminal (`npm run build` y `npx prisma generate`) junto con los tests automatizados de Vitest (`npm test` y `npm run test:e2e`)** fue lo más determinante:
- El editor (VS Code) y `npm run build` permitieron ubicar de inmediato typos, rutas mal escritas e importaciones incorrectas (como `ValidationPipe` en `main.ts` o `PedidoModulo`).
- Los tests unitarios en `calculos.spec.ts` detectaron al instante los fallos matemáticos en `calcularSubtotal` y `calcularTotal`, asegurando que las reglas del negocio se cumplieran antes de integrar las ramas del equipo.

### ¿Qué harías para evitar este tipo de errores en tus propios proyectos?
1. **Activar el modo estricto de TypeScript y reglas de ESLint** (como `no-cond-assign` para evitar asignaciones accidentales dentro de un `if`).
2. **Escribir pruebas unitarias y E2E desde el inicio** para cubrir cada regla de negocio crítica (transiciones de estado, cálculos de totales, validaciones de stock y restricciones al eliminar registros).
3. **Ejecutar siempre `npm run build` y `npm test` antes de hacer `commit` o abrir un Pull Request**, manteniendo ramas por módulo y revisando los cambios en equipo antes de fusionar en `main`.
