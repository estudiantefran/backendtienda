import { Router } from 'express';
import {
    postUsuario,
    getUsuarios,
    putUsuarioById,
    deleteUsuarioById,
    loginUsuario
} from '../controllers/Usuario.controllers.js';

const router = Router();

router.post('/crear', postUsuario);
router.post('/login', loginUsuario);
router.get('/mostrar', getUsuarios);
router.put('/modificar/:id', putUsuarioById);
router.delete('/eliminar/:id', deleteUsuarioById);

export default router;
