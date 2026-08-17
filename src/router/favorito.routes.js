import { Router } from 'express';
import {
    postFavorito,
    getFavoritos,
    putFavoritoById,
    deleteFavoritoById
} from '../controllers/Favorito.controllers.js';

const router = Router();

router.post('/agregarfavorito', postFavorito);
router.get('/mostrarfavoritos', getFavoritos);
router.put('/actualizarfavorito/:id', putFavoritoById);
router.delete('/:id', deleteFavoritoById);

export default router;
