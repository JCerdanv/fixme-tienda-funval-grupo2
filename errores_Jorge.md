# Errores encontrados en producto (jorge Romainville)

src/producto/app.module.ts

- el modulo categoria no se encuentraba importado correctamente (decia "CategoriaAppModule" y deberia ser "CategoriaModulo" ) (linea 8 y 16)

src/producto/producto.service.ts

- estaba "insensitiv" en vez de "insensitive" (linea 24)
- pusieron "categorias" en vez de ser "categoria" (linea 32) pues

src/producto/dto/create-producto.dto.ts

- estaba IsInt() en vez de IsNumber() (linea 24)
