# Tienda Virtual Chocolate Pilar de Oro

Backend del proyecto de tienda virtual para la marca Chocolate Pilar de Oro. Este servicio está desarrollado con Node.js, Express y MongoDB, y proporciona la base para gestionar productos, usuarios, pedidos y otras operaciones de comercio electrónico.

## Descripción del proyecto

Este backend permite administrar una tienda virtual con funcionalidades como:

- Gestión de usuarios
- Gestión de productos y categorías
- Control de inventario
- Carrito de compras
- Favoritos
- Pedidos y pagos
- Reseñas de productos

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- Nodemon

## Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js 18 o superior
- pnpm (recomendado) o npm
- MongoDB en ejecución o una conexión remota válida

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd backend
```

2. Instala las dependencias:

```bash
pnpm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/tienda_pilar_de_oro
```

## Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
pnpm dev
```

Para iniciar el servidor en modo producción:

```bash
pnpm start
```

Una vez ejecutado, el servicio estará disponible en:

```text
http://localhost:3000
```

## Estructura del proyecto

```text
backend/
├── app.js
├── package.json
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   └── router/
```

## Scripts disponibles

- `pnpm start`: inicia el servidor con Node.js
- `pnpm dev`: inicia el servidor con Nodemon para desarrollo

## Rutas actuales

Actualmente el backend expone una ruta de prueba para verificar que el servicio funciona:

- `GET /` → devuelve un mensaje indicando que el backend está funcionando

## Variables de entorno

| Variable | Descripción |
|---------|-------------|
| `PORT` | Puerto en el que correrá el servidor |
| `MONGO_URI` | URI de conexión a MongoDB |

## Autor

Francisco Navarro Ramos
