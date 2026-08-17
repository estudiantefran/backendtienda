import { ProductoModel } from '../models/Producto.model.js';

const normalizarTexto = (valor = '') => String(valor).trim();

const validarProductoBase = ({ nombre, descripcion, precio, categoria }) => {
    if (!nombre || !descripcion || precio === undefined || !categoria) {
        return false;
    }
    return true;
};

export const postProducto = async (request, response) => {
    try {
        const datos = { ...request.body };
        const nombre = normalizarTexto(datos.nombre);
        const descripcion = normalizarTexto(datos.descripcion);
        const categoria = datos.categoria;
        const precio = Number(datos.precio);

        if (!validarProductoBase({ nombre, descripcion, precio, categoria })) {
            return response.status(400).json({
                mensaje: 'nombre, descripcion, precio y categoria son requeridos'
            });
        }

        if (Number.isNaN(precio) || precio < 0) {
            return response.status(400).json({
                mensaje: 'el precio debe ser un número válido mayor o igual a 0'
            });
        }

        const nuevoProducto = await ProductoModel.create({
            ...datos,
            nombre,
            descripcion,
            precio,
            peso: datos.peso ? normalizarTexto(datos.peso) : undefined,
            porcentajeCacao: datos.porcentajeCacao ? normalizarTexto(datos.porcentajeCacao) : undefined,
            ingredientes: Array.isArray(datos.ingredientes)
                ? datos.ingredientes.map((item) => normalizarTexto(item))
                : [],
            imagenes: Array.isArray(datos.imagenes)
                ? datos.imagenes.map((item) => normalizarTexto(item))
                : [],
            stockActual: Number(datos.stockActual ?? 0),
            stockMinimo: Number(datos.stockMinimo ?? 0),
            stockMaximo: Number(datos.stockMaximo ?? 0),
            estado: datos.estado ?? true
        });

        return response.status(201).json({
            mensaje: 'producto creado satisfactoriamente',
            datos: nuevoProducto
        });
    } catch (error) {
        const problema = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al crear el producto',
            problema
        });
    }
};

export const getProductos = async (request, response) => {
    try {
        const productos = await ProductoModel.find().populate('categoria');

        if (!productos || productos.length === 0) {
            return response.status(200).json({
                mensaje: 'no se encontraron productos en la base de datos',
                datos: []
            });
        }

        return response.status(200).json({
            mensaje: 'estos son todos los productos encontrados',
            datos: productos
        });
    } catch (error) {
        const problema = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al buscar los productos',
            problema
        });
    }
};

export const putProductoById = async (request, response) => {
    try {
        const idForPut = request.params.id;
        const dataForUpdate = { ...request.body };

        if (dataForUpdate.nombre !== undefined) {
            dataForUpdate.nombre = normalizarTexto(dataForUpdate.nombre);
        }

        if (dataForUpdate.descripcion !== undefined) {
            dataForUpdate.descripcion = normalizarTexto(dataForUpdate.descripcion);
        }

        if (dataForUpdate.precio !== undefined) {
            dataForUpdate.precio = Number(dataForUpdate.precio);
            if (Number.isNaN(dataForUpdate.precio) || dataForUpdate.precio < 0) {
                return response.status(400).json({
                    mensaje: 'el precio debe ser un número válido mayor o igual a 0'
                });
            }
        }

        if (dataForUpdate.peso !== undefined) {
            dataForUpdate.peso = normalizarTexto(dataForUpdate.peso);
        }

        if (dataForUpdate.porcentajeCacao !== undefined) {
            dataForUpdate.porcentajeCacao = normalizarTexto(dataForUpdate.porcentajeCacao);
        }

        if (Array.isArray(dataForUpdate.ingredientes)) {
            dataForUpdate.ingredientes = dataForUpdate.ingredientes.map((item) => normalizarTexto(item));
        }

        if (Array.isArray(dataForUpdate.imagenes)) {
            dataForUpdate.imagenes = dataForUpdate.imagenes.map((item) => normalizarTexto(item));
        }

        if (dataForUpdate.stockActual !== undefined) {
            dataForUpdate.stockActual = Number(dataForUpdate.stockActual);
        }

        if (dataForUpdate.stockMinimo !== undefined) {
            dataForUpdate.stockMinimo = Number(dataForUpdate.stockMinimo);
        }

        if (dataForUpdate.stockMaximo !== undefined) {
            dataForUpdate.stockMaximo = Number(dataForUpdate.stockMaximo);
        }

        const productoUpdated = await ProductoModel.findByIdAndUpdate(
            idForPut,
            dataForUpdate,
            { new: true, runValidators: true }
        );

        if (!productoUpdated) {
            return response.status(404).json({
                mensaje: 'no se encontró el producto para actualizar'
            });
        }

        return response.status(200).json({
            mensaje: 'producto actualizado satisfactoriamente',
            datos: productoUpdated
        });
    } catch (error) {
        const problem = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al actualizar el producto',
            problem
        });
    }
};

export const deleteProductoById = async (request, response) => {
    try {
        const idForDelete = request.params.id;
        const productoDeleted = await ProductoModel.findByIdAndDelete(idForDelete);

        if (!productoDeleted) {
            return response.status(404).json({
                mensaje: 'no se encontró el producto para eliminar'
            });
        }

        return response.status(200).json({
            mensaje: 'producto eliminado satisfactoriamente'
        });
    } catch (error) {
        return response.status(400).json({
            mensaje: 'ocurrió un error al eliminar el producto',
            problem: (error && error.message) || error
        });
    }
};
