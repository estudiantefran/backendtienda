import { Router } from 'express';
import {
    postPedido,
    getPedidos,
    putPedidoById,
    deletePedidoById
} from '../controllers/Pedido.controllers.js';

const router = Router();

router.post('/agregarpedido', postPedido);
router.get('/mostrarpedidos', getPedidos);
router.put('/actualizarpedido/:id', putPedidoById);
router.delete('/eliminarpedido/:id', deletePedidoById);

export default router;
