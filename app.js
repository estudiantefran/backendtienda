 import express from 'express';
 import dotenv from 'dotenv';
 import { conectionMongo } from "./src/config/dataBase.js";
 const app=express();
 dotenv.config();
 console.log('MONGO_URI:',process.env.MONGO_URI);
 const port=process.env.PORT;
 conectionMongo();
 app.get('/' ,(req, res)=>{
res.send('el backend funciona correctamente ');
      
 })
 app.listen(port,()=>{
console.log(`el servidor se esta ejecutando en http://localhost:${port}`)
 })