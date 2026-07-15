import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({

    pedido:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Pedido"
    },

    metodoPago:{
        type:String
    },

    referencia:{
        type:String
    },

    valor:{
        type:Number
    },

    estado:{
        type:String,
        default:"Pendiente"
    }

},{timestamps:true});

export default mongoose.model("Pago",pagoSchema);