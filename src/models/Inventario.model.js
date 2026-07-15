import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({

    producto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Producto"
    },

    stockActual:Number,

    stockMinimo:Number,

    stockMaximo:Number

},{timestamps:true});

export default mongoose.model("Inventario",inventarioSchema);