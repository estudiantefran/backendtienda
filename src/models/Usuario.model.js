import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({

    nombre:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    telefono:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    rol:{
        type:String,
        enum:["cliente","administrador"],
        default:"cliente"
    },

    direccion:{
        departamento:String,
        ciudad:String,
        barrio:String,
        direccion:String
    },

    estado:{
        type:Boolean,
        default:true
    }

},{timestamps:true});

export default mongoose.model("Usuario",usuarioSchema);