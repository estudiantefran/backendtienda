import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({

    producto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Producto",
        required:true,
        unique:true
    },

    stockActual:{
        type:Number,
        default:0,
        min:0
    },

    stockMinimo:{
        type:Number,
        default:0,
        min:0
    },

    stockMaximo:{
        type:Number,
        default:0,
        min:0
    }

},{timestamps:true});

export const InventarioModel=mongoose.model("Inventario",inventarioSchema);