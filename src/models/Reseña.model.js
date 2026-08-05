import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({

    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },

    producto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Producto",
        required:true
    },

    calificacion:{
        type:Number,
        required:true,
        min:1,
        max:5
    },

    comentario:{
        type:String,
        trim:true
    }

},{timestamps:true});

resenaSchema.index({ usuario: 1, producto: 1 }, { unique: true });

export const ReseñaModel=mongoose.model("Resena",resenaSchema);