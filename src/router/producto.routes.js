import { Router } from 'express';
import {
    postProducto,
    getProductos,
    putProductoById,
    deleteProductoById
} from '../controllers/Producto.controllers.js';

const router = Router();

router.post('/crearproducto', postProducto);
router.get('/mostrarproducto', getProductos);
router.put('/actualizarproducto/:id', putProductoById);
router.delete('/eliminarproducto/:id', deleteProductoById);

export default router;
