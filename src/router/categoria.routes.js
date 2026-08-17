import { Router } from 'express';
import {
    postCategoria,
    getCategorias,
    putCategoriaById,
    deleteCategoriaById
} from '../controllers/Categoria.controllers.js';

const router = Router();

router.post('/crearcategoria', postCategoria);
router.get('/mostrarcategoria', getCategorias);
router.put('/actualizarcategoria/:id', putCategoriaById);
router.delete('/eliminarcategoria/:id', deleteCategoriaById);

export default router;
