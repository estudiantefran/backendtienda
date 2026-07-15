import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({

    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },

    productos:[
        {

            producto:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Producto"
            },

            cantidad:Number,

            precio:Number

        }
    ],

    subtotal:Number,

    envio:Number,

    total:Number,

    metodoPago:{
        type:String
    },

    estado:{
        type:String,
        enum:[
            "Pendiente",
            "Preparando",
            "Enviado",
            "Entregado",
            "Cancelado"
        ],
        default:"Pendiente"
    }

},{timestamps:true});

export default mongoose.model("Pedido",pedidoSchema);