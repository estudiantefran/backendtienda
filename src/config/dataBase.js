import mongoose from "mongoose";
import dns from 'node:dns';
dns.setServers(['8.8.8.8','1.1.1.1']);

export async function conectionMongo(){
        try{
            console.log("intentado conectar a:", process.env.MONGO_URI);
            await mongoose.connect(process.env.MONGO_URI, {
             ServerSelectionTimeoutMs:1000
                });
                 console.log("conexion exitosa a la bases de datos");
            }catch(error){
        console.log("error al conectarse a la bases de datos "+error);
                        }
    }
