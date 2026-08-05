import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({

    nombre:{
        type:String,
        required:true,
        trim:true
    },

    descripcion:{
        type:String,
        required:true,
        trim:true
    },

    precio:{
        type:Number,
        required:true,
        min:0
    },

    peso:{
        type:String,
        trim:true
    },

    porcentajeCacao:{
        type:String,
        trim:true
    },

    ingredientes:[
        {
            type:String,
            trim:true
        }
    ],

    imagenes:[
        {
            type:String,
            trim:true
        }
    ],

    categoria:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categoria",
        required:true
    },

    estado:{
        type:Boolean,
        default:true
    }

},{timestamps:true});

export const ProductoModel = mongoose.model("Producto", productoSchema);