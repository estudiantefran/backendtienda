import { Router } from 'express';
import {
    postResena,
    getResenas,
    putResenaById,
    deleteResenaById
} from '../controllers/Reseña.controllers.js';

const router = Router();

router.post('/', postResena);
router.get('/', getResenas);
router.put('/:id', putResenaById);
router.delete('/:id', deleteResenaById);

export default router;
