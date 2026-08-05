 import express from 'express';
 import dotenv from 'dotenv';
 import { conectionMongo } from './src/config/dataBase.js';
 import usuarioRouter from './src/router/usuario.routes.js';
 const app = express();
 dotenv.config();
 console.log('MONGO_URI:', process.env.MONGO_URI);
 const port = process.env.PORT || 3000;
 
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 
 conectionMongo();
 app.get('/', (req, res) => {
     res.send('el backend funciona correctamente');
 });

 app.use('/api/usuarios', usuarioRouter);

 app.listen(port, () => {
     console.log(`el servidor se esta ejecutando en http://localhost:${port}`);
 });