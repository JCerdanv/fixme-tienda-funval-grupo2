// prisma/seed.ts

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(' Limpiando tablas y reiniciando IDs...');

  // Limpia todas las tablas y reinicia las secuencias (IDs vuelven a 1)
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "detalles_pedido", "pedidos", "productos", "categorias", "clientes"
    RESTART IDENTITY CASCADE;
  `);

  console.log(' Insertando datos de prueba...');

  // 1. Clientes (ID 1 = activo, ID 2 = inactivo para probar error 404) validación en pedidos)
  const clienteActivo = await prisma.cliente.create({
    data: {       nombre: 'Juan García',
      email: 'juan.garcia@tienda.com',
      telefono: '987654321',       activo: true,
    },
  });

  const clienteInactivo = await prisma.cliente.create({
    data: {       nombre: 'Carlos Barco',
      email: 'carlos.barco@tienda.com',
      telefono: '912345678',       activo: false, 
    },
  });

  // 2. Categorías (ID 1 = Bebidas, ID 2 = Snacks)
  const catBebidas = await prisma.categoria.create({
    data: {       nombre: 'Bebidas',
      descripcion: 'Aguas, jugos y refrescos',
    },
  });

  const catSnacks = await prisma.categoria.create({
    data: {       nombre: 'Snacks',
      descripcion: 'Bocaditos dulces y salados',
    },
  });

  // 3. Productos (ID 1 = Agua, ID 2 = Jugo, ID 3 = Papas)
  //    distinto stock para probar compras exitosas y stock insuficiente
  const agua = await prisma.producto.create({
    data: {
      nombre: 'Agua Mineral 500ml',
      descripcion: 'Agua sin gas',
      precio: 2.5,
      stock: 20,
      categoriaId: catBebidas.id,
    },
  });

  const jugo = await prisma.producto.create({
    data: {
      nombre: 'Jugo de Naranja 1L',
      descripcion: 'Jugo natural',
      precio: 6.75,
      stock: 5,
      categoriaId: catBebidas.id,
    },
  });

  const papas = await prisma.producto.create({
    data: {
      nombre: 'Papas Fritas Clásicas',
      descripcion: 'Bolsa 150g',
      precio: 4.99,
      stock: 2, // Stock bajo para probar error 400 "Stock insuficiente"
      categoriaId: catSnacks.id,
    },
  });

  console.log('✅ Seed completado con IDs reiniciados:', {
    clientes: [
      { id: clienteActivo.id, nombre: clienteActivo.nombre, activo: clienteActivo.activo },
      { id: clienteInactivo.id, nombre: clienteInactivo.nombre, activo: clienteInactivo.activo },
    ],
    categorias: [
      { id: catBebidas.id, nombre: catBebidas.nombre },
      { id: catSnacks.id, nombre: catSnacks.nombre },
    ],
    productos: [
      { id: agua.id, nombre: agua.nombre, precio: agua.precio, stock: agua.stock },
      { id: jugo.id, nombre: jugo.nombre, precio: jugo.precio, stock: jugo.stock },
      { id: papas.id, nombre: papas.nombre, precio: papas.precio, stock: papas.stock },
    ],
  });
}

main()
  .catch((e) => {
    console.error('> Error ejecutando seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });