import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({

    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },

    productos:[
        {

            producto:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Producto",
                required:true
            },

            cantidad:{
                type:Number,
                required:true,
                min:1
            },

            precio:{
                type:Number,
                required:true,
                min:0
            }

        }
    ],

    subtotal:{
        type:Number,
        required:true,
        min:0
    },

    envio:{
        type:Number,
        default:0,
        min:0
    },

    total:{
        type:Number,
        required:true,
        min:0
    },

    metodoPago:{
        type:String,
        trim:true
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

pedidoSchema.pre("validate", function(next){
    if (!this.productos || this.productos.length === 0) {
        this.invalidate("productos", "Un pedido debe tener al menos un producto");
    }
    next();
});

export const PedidoModel= mongoose.model("Pedido",pedidoSchema);