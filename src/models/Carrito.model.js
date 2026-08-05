
import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({

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
                default:1,
                min:1
            },

            precio:{
                type:Number,
                min:0
            }

        }
    ],

    total:{
        type:Number,
        default:0,
        min:0
    }

},{timestamps:true});

export const CarritoModel= mongoose.model("Carrito",carritoSchema);