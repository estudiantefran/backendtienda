import { PedidoModel } from '../models/Pedido.model.js';

const calcularTotalesPedido = (productos = [], envio = 0) => {
    const subtotal = productos.reduce((acumulador, item) => {
        const precio = Number(item?.precio || 0);
        const cantidad = Number(item?.cantidad || 0);
        return acumulador + (precio * cantidad);
    }, 0);

    const envioCalculado = Number(envio || 0);
    const total = subtotal + envioCalculado;

    return {
        subtotal,
        envio: envioCalculado,
        total
    };
};

export const postPedido = async (request, response) => {
    try {
        const { productos = [], envio = 0, ...restoPedido } = request.body;
        const totales = calcularTotalesPedido(productos, envio);

        const newPedido = await PedidoModel.create({
            ...restoPedido,
            productos,
            envio: totales.envio,
            subtotal: totales.subtotal,
            total: totales.total
        });

        return response.status(201).json({
            mensaje: 'pedido creado satisfactoriamente',
            datos: newPedido
        });
    } catch (error) {
        const problema = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al crear el pedido',
            problema
        });
    }
}

export const getPedidos = async (request, response) => {
    try {
        const pedidos = await PedidoModel.find().populate('usuario productos.producto');
        if (!pedidos || pedidos.length === 0) {
            return response.status(200).json({
                mensaje: 'no se encontraron pedidos en la base de datos',
                datos: []
            });
        }
        return response.status(200).json({
            mensaje: 'estos son todos los pedidos encontrados',
            datos: pedidos
        });
    } catch (error) {
        const problema = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al buscar los pedidos',
            problema
        });
    }
}

export const putPedidoById = async (request, response) => {
    try {
        const idForPut = request.params.id;
        const dataForUpdate = request.body;

        if (dataForUpdate.productos || dataForUpdate.envio !== undefined) {
            const productos = dataForUpdate.productos || [];
            const envio = Number(dataForUpdate.envio ?? 0);
            const totales = calcularTotalesPedido(productos, envio);

            dataForUpdate.subtotal = totales.subtotal;
            dataForUpdate.total = totales.total;
            dataForUpdate.envio = totales.envio;
        }

        const pedidoUpdated = await PedidoModel.findByIdAndUpdate(
            idForPut,
            dataForUpdate,
            { new: true, runValidators: true }
        );
        if (!pedidoUpdated) {
            return response.status(404).json({
                mensaje: 'no se encontró el pedido para actualizar'
            });
        }
        return response.status(200).json({
            mensaje: 'pedido actualizado satisfactoriamente',
            datos: pedidoUpdated
        });
    } catch (error) {
        const problem = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al actualizar el pedido',
            problem
        });
    }
}

export const deletePedidoById = async (request, response) => {
    try {
        const idForDelete = request.params.id;
        const pedidoDeleted = await PedidoModel.findByIdAndDelete(idForDelete);
        if (!pedidoDeleted) {
            return response.status(404).json({
                mensaje: 'no se encontró el pedido para eliminar'
            });
        }
        return response.status(200).json({
            mensaje: 'pedido eliminado satisfactoriamente'
        });
    } catch (error) {
        return response.status(400).json({
            mensaje: 'ocurrió un error al eliminar el pedido',
            problem: (error && error.message) || error
        });
    }
}
