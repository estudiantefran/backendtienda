import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    productos: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Producto",
                required: true
            },

            cantidad: {
                type: Number,
                required: true,
                min: 1
            },

            precio: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],

    subtotal: {
        type: Number,
        required: true,
        min: 0
    },

    envio: {
        type: Number,
        default: 0,
        min: 0
    },

    total: {
        type: Number,
        required: true,
        min: 0
    },

    metodoPago: {
        type: String,
        required: true,
        trim: true
    },

    referenciaPago: {
        type: String,
        trim: true
    },

    valorPago: {
        type: Number,
        min: 0
    },

    estadoPago: {
        type: String,
        enum: ["Pendiente", "Aprobado", "Rechazado", "Reembolsado"],
        default: "Pendiente"
    },

    estado: {
        type: String,
        enum: [
            "Pendiente",
            "Preparando",
            "Enviado",
            "Entregado",
            "Cancelado"
        ],
        default: "Pendiente"
    }

}, { timestamps: true });


pedidoSchema.pre("validate", function() {
    if (!this.productos || this.productos.length === 0) {
        this.invalidate(
            "productos",
            "Un pedido debe tener al menos un producto"
        );
    }
});


export const PedidoModel = mongoose.model("Pedido", pedidoSchema);