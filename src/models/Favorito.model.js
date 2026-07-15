import mongoose from "mongoose";

const favoritoSchema = new mongoose.Schema({

    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },

    productos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Producto"
        }
    ]

},{timestamps:true});

export default mongoose.model("Favorito",favoritoSchema);