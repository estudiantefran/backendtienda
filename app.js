import express from 'express';
import dotenv from 'dotenv';
import { conectionMongo } from './src/config/dataBase.js';
import usuarioRouter from './src/router/usuario.routes.js';
import categoriaRouter from './src/router/categoria.routes.js';
import productoRouter from './src/router/producto.routes.js';
import favoritoRouter from './src/router/favorito.routes.js';
import resenaRouter from './src/router/resena.routes.js';
import pedidoRouter from './src/router/pedido.routes.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

conectionMongo();

app.get('/', (req, res) => {
    res.send('el backend funciona correctamente');
});

app.use('/api/usuarios', usuarioRouter);
app.use('/api/categorias', categoriaRouter);
app.use('/api/productos', productoRouter);
app.use('/api/favoritos', favoritoRouter);
app.use('/api/resenas', resenaRouter);
app.use('/api/pedidos', pedidoRouter);

app.listen(port, () => {
    console.log(`el servidor se esta ejecutando en http://localhost:${port}`);
});