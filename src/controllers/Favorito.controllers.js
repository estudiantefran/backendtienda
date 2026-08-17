import { FavoritoModel } from '../models/Favorito.model.js';

const normalizarListaProductos = (productos = []) => {
    if (!Array.isArray(productos)) return [];
    return productos.filter(Boolean);
};

export const postFavorito = async (request, response) => {
    try {
        const { usuario, productos } = request.body;

        if (!usuario) {
            return response.status(400).json({
                mensaje: 'el usuario es requerido'
            });
        }

        const productosValidos = normalizarListaProductos(productos);
        if (!Array.isArray(productos) || productosValidos.length === 0) {
            return response.status(400).json({
                mensaje: 'debe enviar al menos un producto en favoritos'
            });
        }

        const nuevoFavorito = await FavoritoModel.create({
            usuario,
            productos: productosValidos
        });

        return response.status(201).json({
            mensaje: 'favorito creado satisfactoriamente',
            datos: nuevoFavorito
        });
    } catch (error) {
        const problema = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al crear el favorito',
            problema
        });
    }
};

export const getFavoritos = async (request, response) => {
    try {
        const favoritos = await FavoritoModel.find().populate('usuario productos');
        if (!favoritos || favoritos.length === 0) {
            return response.status(200).json({
                mensaje: 'no se encontraron favoritos en la base de datos',
                datos: []
            });
        }
        return response.status(200).json({
            mensaje: 'estos son todos los favoritos encontrados',
            datos: favoritos
        });
    } catch (error) {
        const problema = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al buscar los favoritos',
            problema
        });
    }
};

export const putFavoritoById = async (request, response) => {
    try {
        const idForPut = request.params.id;
        const dataForUpdate = { ...request.body };

        if (dataForUpdate.productos !== undefined) {
            const productosValidos = normalizarListaProductos(dataForUpdate.productos);
            if (productosValidos.length === 0) {
                return response.status(400).json({
                    mensaje: 'debe enviar al menos un producto en favoritos'
                });
            }
            dataForUpdate.productos = productosValidos;
        }

        const favoritoUpdated = await FavoritoModel.findByIdAndUpdate(
            idForPut,
            dataForUpdate,
            { new: true, runValidators: true }
        );
        if (!favoritoUpdated) {
            return response.status(404).json({
                mensaje: 'no se encontró el favorito para actualizar'
            });
        }
        return response.status(200).json({
            mensaje: 'favorito actualizado satisfactoriamente',
            datos: favoritoUpdated
        });
    } catch (error) {
        const problem = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al actualizar el favorito',
            problem
        });
    }
};

export const deleteFavoritoById = async (request, response) => {
    try {
        const idForDelete = request.params.id;
        const favoritoDeleted = await FavoritoModel.findByIdAndDelete(idForDelete);
        if (!favoritoDeleted) {
            return response.status(404).json({
                mensaje: 'no se encontró el favorito para eliminar'
            });
        }
        return response.status(200).json({
            mensaje: 'favorito eliminado satisfactoriamente'
        });
    } catch (error) {
        return response.status(400).json({
            mensaje: 'ocurrió un error al eliminar el favorito',
            problem: (error && error.message) || error
        });
    }
};
