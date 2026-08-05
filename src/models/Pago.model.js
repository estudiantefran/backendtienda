import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({

    pedido:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Pedido",
        required:true
    },

    metodoPago:{
        type:String,
        required:true,
        trim:true
    },

    referencia:{
        type:String,
        trim:true
    },

    valor:{
        type:Number,
        required:true,
        min:0
    },

    estado:{
        type:String,
        enum:["Pendiente","Aprobado","Rechazado","Reembolsado"],
        default:"Pendiente"
    }

},{timestamps:true});

export const PagoModel=mongoose.model("Pago",pagoSchema);