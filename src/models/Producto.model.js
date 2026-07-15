import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({

    nombre:{
        type:String,
        required:true
    },

    descripcion:{
        type:String,
        required:true
    },

    precio:{
        type:Number,
        required:true
    },

    stock:{
        type:Number,
        required:true
    },

    peso:{
        type:String
    },

    porcentajeCacao:{
        type:String
    },

    ingredientes:[
        {
            type:String
        }
    ],

    imagenes:[
        {
            type:String
        }
    ],

    categoria:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categoria"
    },

    estado:{
        type:Boolean,
        default:true
    }

},{timestamps:true});

export default mongoose.model("Producto",productoSchema);