<div align="center">

# 🐛 ERRORES ENCONTRADOS
## FIXIT — TIENDA API

---

**EQUIPO 2**

📅 28 de noviembre de 2026
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

</div>

---
<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 14px 0;">
<span style="background:#1D4ED8;color:#EFF6FF;padding:6px 12px;border-radius:5px;"><strong>01 · Jesús</strong></span>
<span style="background:#047857;color:#ECFDF5;padding:6px 12px;border-radius:5px;"><strong>02 · Gus</strong></span>
<span style="background:#B45309;color:#FFFBEB;padding:6px 12px;border-radius:5px;"><strong>03 · Esdras</strong></span>
<span style="background:#6D28D9;color:#F5F3FF;padding:6px 12px;border-radius:5px;"><strong>04 · Jorge</strong></span>
</div><div style="border-left: 8px solid #3B82F6; background-color: #172554; padding: 16px 20px; margin: 28px 0 18px; border-radius: 6px;">
<h2 style="margin: 0; color: #DBEAFE;">01 · JESÚS CERDÁN</h2>
<p style="margin: 8px 0 0; color: #BFDBFE;"><strong>Módulo:</strong> Configuración, Prisma y pedidos <span style="float: right;"><strong>18 hallazgos</strong></span></p>
</div>Módulo de configuración, Prisma y pedidos
<table>
<thead><tr><th>Archivo / Línea / Tipo</th><th>¿Qué estaba mal?</th><th>¿Cómo lo detectaste?</th><th>¿Cómo lo solucionaste?</th></tr></thead>
<tbody>
<tr><td><strong>`prisma/schema.prisma`</strong><br>Línea: 20<br>Tipo: Typo</td><td>El atributo `@uniqe` estaba escrito incorrectamente. Prisma no reconocía el atributo debido al error ortográfico.</td><td>Al revisar el esquema y ejecutar la generación de Prisma, se identificó que el atributo no era válido.</td><td>Se corrigió la escritura de `@uniqe` a `@unique`, utilizando el atributo correcto para establecer la unicidad.</td></tr>
<tr><td><strong>`prisma/schema.prisma`</strong><br>Línea: 48<br>Tipo: Lógica / Relación</td><td>El modelo no contaba con la relación inversa correspondiente para los detalles de los pedidos, lo que provocaba problemas en la validación de las relaciones entre modelos.</td><td>Al validar el esquema de Prisma, se identificaron errores relacionados con la definición de las relaciones entre los modelos.</td><td>Se agregó la relación inversa `detalles DetallePedido[]` al modelo correspondiente, completando la relación entre los modelos.</td></tr>
<tr><td><strong>`prisma/schema.prisma`</strong><br>Línea: 53<br>Tipo: Typo</td><td>El valor por defecto del estado del pedido estaba escrito como `PENDENTE`, cuando el valor correcto definido era `PENDIENTE`.</td><td>Al revisar los valores del enum y la configuración del esquema, se detectó la inconsistencia en el nombre del estado.</td><td>Se corrigió el valor `PENDENTE` a `PENDIENTE`, utilizando el nombre correcto del estado.</td></tr>
<tr><td><strong>`package.json`</strong><br>Línea: 12<br>Tipo: Terminal / Comando</td><td>El comando para iniciar el servidor en modo desarrollo estaba escrito como `nest star --watch`, en lugar de `nest start --watch`.</td><td>Al ejecutar el comando, la terminal indicaba que la instrucción no era reconocida correctamente.</td><td>Se corrigió el comando reemplazando `star` por `start`, permitiendo ejecutar NestJS en modo desarrollo.</td></tr>
<tr><td><strong>`src/prisma/prisma.service.ts`</strong><br>Línea: 7<br>Tipo: Sintaxis / Constructor</td><td>La clase `PrismaService` extendía `PrismaClient`, pero no inicializaba correctamente el constructor mediante `super({ adapter })`, lo que generaba problemas en la inicialización del servicio.</td><td>Al revisar la implementación del servicio y los errores relacionados con el constructor de Prisma, se identificó que faltaba la inicialización de la clase padre.</td><td>Se agregó la llamada correspondiente a `super({ adapter })` después de la configuración del adaptador, completando correctamente la inicialización del servicio.</td></tr>
<tr><td><strong>`src/app.module.ts`</strong><br>Línea: 5<br>Tipo: Importación</td><td>La ruta de importación del módulo de clientes estaba escrita como `./clientes/cliente.module.js`, utilizando el nombre de carpeta incorrecto.</td><td>Al revisar las importaciones del módulo principal, se identificó que la ruta no correspondía con la estructura real del proyecto.</td><td>Se corrigió la ruta de `./clientes/cliente.module.js` a `./cliente/cliente.module.js`, utilizando el nombre correcto de la carpeta.</td></tr>
<tr><td><strong>`src/main.ts`</strong><br>Línea: 2<br>Tipo: Importación</td><td>`ValidationPipe` estaba siendo importado desde `@nestjs/core`, cuando debía importarse desde `@nestjs/common`.</td><td>Al revisar las importaciones y compilar el proyecto, se identificó que el módulo de origen no exportaba correctamente el elemento solicitado.</td><td>Se corrigió la importación de `ValidationPipe`, utilizando `@nestjs/common` como módulo de origen.</td></tr>
<tr><td><strong>`src/pedido/pedido.module.ts`</strong><br>Línea: 9<br>Tipo: Typo</td><td>La clase del módulo estaba nombrada como `PedidoModulo`, en lugar de `PedidoModule`, provocando inconsistencias en la identificación e importación del módulo.</td><td>Al revisar la estructura de los módulos y sus importaciones, se identificó que el nombre de la clase no coincidía con el esperado.</td><td>Se corrigió el nombre de la clase a `PedidoModule`, utilizando la nomenclatura correcta de NestJS.</td></tr>
<tr><td><strong>`src/pedido/dto/cambiar-estado.dto.ts`</strong><br>Línea: 6<br>Tipo: Sintaxis</td><td>Faltaba una coma entre las propiedades `enum: EstadoPedido` y `example: EstadoPedido.PAGADO` dentro de la configuración del DTO.</td><td>Al revisar el código, el editor señalaba un error de sintaxis relacionado con la separación de las propiedades.</td><td>Se agregó la coma faltante, completando correctamente la estructura de la configuración.</td></tr>
<tr><td><strong>`src/pedido/dto/create-pedido.dto.ts`</strong><br>Línea: 30<br>Tipo: Lógica / Validación</td><td>El campo anidado `items` no contaba con el decorador `@Type(() =&gt; ItemPedidoDto)`, necesario para transformar correctamente los objetos recibidos y permitir su validación.</td><td>Al revisar las validaciones del DTO y el comportamiento de los datos anidados, se identificó que faltaba la transformación correspondiente.</td><td>Se agregó el decorador `@Type(() =&gt; ItemPedidoDto)` para permitir la transformación y validación de los elementos anidados.</td></tr>
<tr><td><strong>`src/pedido/pedido.controller.ts`</strong><br>Línea: 28<br>Tipo: Lógica</td><td>La ruta para consultar pedidos de un cliente utilizaba `cliente/:clienteId`, pero el parámetro recibido mediante `@Param()` estaba identificado como `id`, provocando que no coincidiera con el nombre definido en la ruta.</td><td>Al revisar el endpoint y realizar solicitudes, se identificó que el parámetro recibido no correspondía con el nombre establecido en la ruta.</td><td>Se corrigió el parámetro a `@Param(&#x27;clienteId&#x27;, ParseIntPipe)`, utilizando el nombre correcto definido en el endpoint.</td></tr>
<tr><td><strong>`src/pedido/pedido.service.ts`</strong><br>Línea: 37<br>Tipo: Lógica</td><td>La condición utilizada para comprobar el stock del producto estaba invertida. Se comparaba `producto.stock &gt; item.cantidad` cuando la condición debía identificar correctamente los casos en los que la cantidad solicitada superaba el stock disponible.</td><td>Al revisar la lógica de validación de stock y el comportamiento esperado al solicitar productos, se identificó que la condición no detectaba correctamente la falta de existencias.</td><td>Se corrigió la comparación para validar adecuadamente si la cantidad solicitada excedía el stock disponible, evitando procesar pedidos con existencias insuficientes.</td></tr>
<tr><td><strong>`src/pedido/pedido.service.ts`</strong><br>Línea: 54<br>Tipo: Lógica</td><td>Al actualizar el inventario después de realizar un pedido, se utilizaba `decrement: 1`, disminuyendo únicamente una unidad, independientemente de la cantidad solicitada por el cliente.</td><td>Al revisar la actualización del inventario y compararla con la cantidad de productos solicitados en cada línea del pedido, se identificó que el decremento era incorrecto.</td><td>Se reemplazó `decrement: 1` por `decrement: linea.cantidad`, permitiendo descontar del inventario la cantidad realmente solicitada.</td></tr>
<tr><td><strong>`src/pedido/pedido.service.ts`</strong><br>Línea: 73<br>Tipo: Lógica</td><td>En la consulta de pedidos por cliente, el ordenamiento utilizaba `createdAt: &#x27;asc&#x27;`, mostrando primero los pedidos más antiguos, cuando se requería priorizar los más recientes.</td><td>Al revisar la consulta y el orden en que se recuperaban los pedidos, se identificó que la ordenación no correspondía con el comportamiento esperado.</td><td>Se cambió el ordenamiento de `asc` a `desc`, permitiendo mostrar primero los pedidos más recientes.</td></tr>
<tr><td><strong>`src/pedido/pedido.service.ts`</strong><br>Línea: 78<br>Tipo: Sintaxis</td><td>El método `findOne(id: number)` utilizaba `await`, pero no estaba declarado como una función asíncrona mediante `async`.</td><td>Al revisar y compilar el servicio, se identificó un error relacionado con el uso de `await` dentro de una función que no estaba declarada como asíncrona.</td><td>Se agregó `async` a la declaración del método `findOne`, permitiendo utilizar correctamente `await`.</td></tr>
<tr><td><strong>`src/pedido/pedido.service.ts`</strong><br>Línea: 96<br>Tipo: Lógica</td><td>La condición para comprobar si un pedido cambiaba al estado `CANCELADO` utilizaba una asignación `=` en lugar de una comparación `===`, lo que provocaba que se asignara el estado en lugar de comprobarlo.</td><td>Al revisar la lógica de cambio de estado y la devolución de stock, se identificó que la condición no estaba realizando una comparación correctamente.</td><td>Se reemplazó la asignación por `===`, permitiendo comprobar correctamente si el nuevo estado era `CANCELADO` antes de ejecutar la lógica correspondiente.</td></tr>
<tr><td><strong>`src/pedido/utils/calculos.ts`</strong><br>Línea: 12<br>Tipo: Lógica</td><td>La función `calcularSubtotal` sumaba el precio y la cantidad (`precio + cantidad`) en lugar de multiplicarlos, generando un subtotal incorrecto.</td><td>Al revisar los cálculos y ejecutar las pruebas correspondientes, se identificó que el resultado del subtotal no coincidía con el valor esperado.</td><td>Se corrigió la operación utilizando `precio * cantidad`, permitiendo calcular correctamente el subtotal de cada producto.</td></tr>
<tr><td><strong>`src/pedido/utils/calculos.ts`</strong><br>Línea: 17<br>Tipo: Lógica</td><td>La función `calcularTotal` acumulaba `linea.precioUnitario` en lugar de `linea.subtotal`, provocando que el total del pedido no considerara correctamente la cantidad de productos de cada línea.</td><td>Al revisar los cálculos y los resultados de las pruebas, se identificó que el total no correspondía con la suma de los subtotales de las líneas.</td><td>Se corrigió la acumulación para utilizar `linea.subtotal`, permitiendo obtener el total correcto del pedido.</td></tr>
</tbody></table><div style="border-left: 8px solid #10B981; background-color: #064E3B; padding: 16px 20px; margin: 36px 0 18px; border-radius: 6px;">
<h2 style="margin: 0; color: #D1FAE5;">02 · GUS</h2>
<p style="margin: 8px 0 0; color: #A7F3D0;"><strong>Módulo:</strong> Clientes <span style="float: right;"><strong>3 hallazgos</strong></span></p>
</div>Módulo de clientes
<table>
<thead><tr><th>Archivo / Línea / Tipo</th><th>¿Qué estaba mal?</th><th>¿Cómo lo detectaste?</th><th>¿Cómo lo solucionaste?</th></tr></thead>
<tbody>
<tr><td><strong>`src/cliente/dto/create-cliente.dto.ts`</strong><br>Línea: 12<br>Tipo: Typo</td><td>El nombre de la propiedad destinada al correo electrónico estaba escrito incorrectamente como `emial`, lo que generaba una inconsistencia en el nombre del campo esperado.</td><td>Al revisar el DTO y comparar sus propiedades con el esquema y la estructura de datos del cliente, se identificó que el nombre del correo no coincidía.</td><td>Se corrigió el nombre de la propiedad de `emial` a `email`, utilizando el nombre correcto del campo.</td></tr>
<tr><td><strong>`src/cliente/cliente.controller.ts`</strong><br>Línea: 29<br>Tipo: Sintaxis</td><td>El decorador `@Get(&#x27;:id&#x27;)` estaba incompleto, ya que faltaba cerrar el paréntesis de la declaración de la ruta para consultar un cliente por su identificador.</td><td>Durante la revisión del controlador se identificó que el decorador de la ruta estaba incompleto y provocaba un error de sintaxis.</td><td>Se completó la declaración del decorador, corrigiéndolo a `@Get(&#x27;:id&#x27;)`, para definir correctamente la ruta de consulta por ID.</td></tr>
<tr><td><strong>`src/cliente/cliente.service.ts`</strong><br>Línea: 16<br>Tipo: Lógica</td><td>La consulta utilizada para verificar si un correo ya estaba registrado utilizaba `data.nombre` en lugar de `data.email`, por lo que se estaba consultando el campo incorrecto para validar la duplicidad de correos.</td><td>Al revisar la lógica de registro de clientes, se identificó que la consulta de validación utilizaba el nombre del cliente en lugar de su correo electrónico.</td><td>Se corrigió la consulta sustituyendo `data.nombre` por `data.email`, para verificar correctamente si el correo electrónico ya existe.</td></tr>
</tbody></table><div style="border-left: 8px solid #F59E0B; background-color: #78350F; padding: 16px 20px; margin: 36px 0 18px; border-radius: 6px;">
<h2 style="margin: 0; color: #FEF3C7;">03 · ESDRAS BLANCO</h2>
<p style="margin: 8px 0 0; color: #FDE68A;"><strong>Módulo:</strong> Categorías <span style="float: right;"><strong>4 hallazgos</strong></span></p>
</div>Módulo de categorías
<table>
<thead><tr><th>Archivo / Línea / Tipo</th><th>¿Qué estaba mal?</th><th>¿Cómo lo detectaste?</th><th>¿Cómo lo solucionaste?</th></tr></thead>
<tbody>
<tr><td><strong>`src/categoria/dto/create-categoria.dto.ts`</strong><br>Línea: 13<br>Tipo: Sintaxis</td><td>La clase `CreateCategoriaDto` no contaba con la llave de cierre correspondiente, dejando incompleta su estructura y provocando un error de sintaxis en el archivo.</td><td>Al revisar y compilar el código, TypeScript indicaba que esperaba una llave de cierre `}`, señalando que la estructura de la clase estaba incompleta.</td><td>Se agregó la llave de cierre faltante para completar correctamente la declaración de la clase `CreateCategoriaDto`.</td></tr>
<tr><td><strong>`src/categoria/categoria.service.ts`</strong><br>Línea: 10<br>Tipo: Inyección de dependencias</td><td>El servicio `CategoriaService` no tenía correctamente importado ni aplicado el decorador `@Injectable()`, necesario para que NestJS pudiera reconocerlo y utilizarlo dentro de su sistema de inyección de dependencias.</td><td>Al revisar el servicio y su integración con NestJS, se identificó que faltaba la configuración necesaria para que el framework administrara correctamente la dependencia.</td><td>Se importó `Injectable` desde NestJS y se agregó el decorador `@Injectable()` a la clase `CategoriaService`.</td></tr>
<tr><td><strong>`src/categoria/categoria.service.ts`</strong><br>Línea: 48<br>Tipo: Lógica</td><td>La condición utilizada para impedir eliminar una categoría que tuviera productos asociados estaba invertida. Se utilizaba `cantidad &lt; 0`, cuando debía comprobarse si existían productos asociados con una cantidad mayor a cero.</td><td>Al revisar la lógica de eliminación de categorías y la regla de negocio que impide eliminar categorías que contienen productos, se identificó que la condición no estaba validando correctamente los productos asociados.</td><td>Se corrigió la condición a `cantidad &gt; 0`, permitiendo validar correctamente si la categoría tenía productos asociados antes de proceder con su eliminación.</td></tr>
<tr><td><strong>`src/categoria/categoria.service.ts`</strong><br>Línea: 35<br>Tipo: Lógica</td><td>Al actualizar una categoría, no se comprobaba si el nuevo nombre ya estaba registrado en otra categoría, lo que podía permitir nombres duplicados y generar inconsistencias en los registros.</td><td>Al revisar la lógica de actualización de categorías y las reglas de negocio relacionadas con la unicidad de los nombres, se identificó que faltaba esta validación.</td><td>Se agregó una consulta para verificar si el nombre ya existía, excluyendo la categoría que se estaba actualizando, con el objetivo de evitar duplicados.</td></tr>
</tbody></table><div style="border-left: 8px solid #A78BFA; background-color: #4C1D95; padding: 16px 20px; margin: 36px 0 18px; border-radius: 6px;">
<h2 style="margin: 0; color: #EDE9FE;">04 · JORGE ROMAINVILLE</h2>
<p style="margin: 8px 0 0; color: #DDD6FE;"><strong>Módulo:</strong> Productos <span style="float: right;"><strong>4 hallazgos</strong></span></p>
</div>Módulo de productos
<table>
<thead><tr><th>Archivo / Línea / Tipo</th><th>¿Qué estaba mal?</th><th>¿Cómo lo detectaste?</th><th>¿Cómo lo solucionaste?</th></tr></thead>
<tbody>
<tr><td><strong>`src/app.module.ts`</strong><br>Línea: 8 y 16<br>Tipo: Importación</td><td>El módulo de categoría estaba identificado incorrectamente como `CategoriaAppModule` o `CategoriaModulo`, en lugar de utilizar el nombre correcto `CategoriaModule`. Esta inconsistencia afectaba la importación y el registro del módulo dentro de la aplicación.</td><td>Al revisar las importaciones y la configuración de módulos en `app.module.ts`, se identificó que el nombre utilizado no correspondía con la clase exportada por el módulo de categoría.</td><td>Se corrigió la importación y el registro del módulo, utilizando `CategoriaModule` desde `./categoria/categoria.module.js`, para que NestJS pudiera reconocerlo correctamente.</td></tr>
<tr><td><strong>`src/producto/producto.service.ts`</strong><br>Línea: 24<br>Tipo: Typo</td><td>La propiedad utilizada para configurar la búsqueda sin distinción entre mayúsculas y minúsculas estaba escrita como `insensitiv`, en lugar de `insensitive`, provocando que la opción no correspondiera al valor esperado por Prisma.</td><td>Al revisar la consulta y los errores de TypeScript, se identificó una incompatibilidad en el valor de la propiedad relacionada con `QueryMode` de Prisma.</td><td>Se corrigió la escritura de la propiedad a `insensitive`, utilizando el valor reconocido por Prisma para realizar búsquedas sin distinguir entre mayúsculas y minúsculas.</td></tr>
<tr><td><strong>`src/producto/producto.service.ts`</strong><br>Línea: 32<br>Tipo: Lógica / Prisma</td><td>Dentro de la propiedad `include` de la consulta de Prisma se utilizaba `categorias: true`, cuando la relación definida en el modelo correspondía a `categoria`. Esto provocaba una inconsistencia entre la consulta y la estructura de las relaciones del modelo.</td><td>Al revisar la consulta de Prisma y los errores de tipo reportados por el editor y TypeScript, se identificó que el nombre de la relación no coincidía con el definido en el modelo.</td><td>Se corrigió la propiedad de `categorias: true` a `categoria: true`, utilizando el nombre correcto de la relación para incluir la categoría asociada al producto.</td></tr>
<tr><td><strong>`src/producto/dto/create-producto.dto.ts`</strong><br>Línea: 24<br>Tipo: Validación</td><td>El campo del precio utilizaba el decorador `@IsInt()`, que solamente permite validar números enteros, impidiendo aceptar precios que incluyeran valores decimales.</td><td>Al revisar las validaciones del DTO de creación de productos, se identificó que el decorador utilizado no permitía manejar precios con decimales.</td><td>Se sustituyó `@IsInt()` por `@IsNumber()`, permitiendo validar valores numéricos que incluyan decimales para el precio del producto.</td></tr>
</tbody></table>Resumen general de hallazgos
Integrante	Módulo	Cantidad de errores
Jesús Cerdán	Configuración, Prisma y Pedidos	18
Gus	Clientes	3
Esdras Blanco	Categorías	4
Jorge Romainville	Productos	4
Total	Proyecto Fixit – Tienda API	29


Reflexión final
1. ¿Qué tipo de errores fueron los más difíciles de detectar y por qué?
Respuesta:

Los errores de lógica fueron algunos de los más difíciles de identificar, debido a que el código podía estar escrito correctamente desde el punto de vista sintáctico, sin necesariamente producir el resultado esperado. En estos casos fue necesario revisar las condiciones, las consultas y las reglas de negocio para comprender cómo debía funcionar cada operación.
2. ¿Qué herramientas fueron más útiles para encontrar y corregir los errores?
Respuesta:

Las herramientas más útiles fueron Visual Studio Code, la terminal, los mensajes de error de TypeScript, NestJS y Prisma, así como la revisión directa del código. Estas herramientas permitieron identificar errores de sintaxis, importaciones incorrectas, inconsistencias en las relaciones, problemas de validación y errores en la lógica de los servicios.
3. ¿Qué aprendimos como equipo durante el proceso de depuración?
Respuesta:

Aprendimos la importancia de revisar cuidadosamente el código, comprender la estructura del proyecto y validar que cada módulo esté correctamente integrado con los demás. También comprendimos que no todos los errores se detectan únicamente mediante la compilación, ya que algunos requieren analizar la lógica y probar el comportamiento de las funciones. El trabajo colaborativo permitió identificar diferentes tipos de errores, compartir conocimientos y mejorar nuestra capacidad para resolver problemas como equipo.
Conclusión

El proceso de depuración del proyecto Fixit nos permitió identificar y corregir errores en diferentes módulos de la aplicación, desde problemas de sintaxis e importaciones hasta errores de lógica, validación y configuración.

La revisión de los 29 hallazgos contribuyó a comprender mejor la estructura del proyecto, el funcionamiento de NestJS y Prisma, y la importancia de mantener consistencia entre los modelos, DTO, servicios, controladores y módulos.

Más allá de corregir los errores encontrados, esta actividad nos permitió fortalecer nuestras habilidades de análisis, depuración y trabajo colaborativo, competencias fundamentales para el desarrollo de software.
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
