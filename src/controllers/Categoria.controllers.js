import { CategoriaModel } from '../models/Categoria.model.js';

const normalizarTexto = (valor = '') => String(valor).trim();

const existeCategoriaConNombre = async (nombre, idActual = null) => {
    const nombreNormalizado = normalizarTexto(nombre);
    if (!nombreNormalizado) return false;

    const filtro = {
        nombre: { $regex: `^${nombreNormalizado.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' }
    };

    if (idActual) {
        filtro._id = { $ne: idActual };
    }

    const categoria = await CategoriaModel.findOne(filtro);
    return Boolean(categoria);
};

export const postCategoria = async (request, response) => {
    try {
        const nombre = normalizarTexto(request.body.nombre);
        const descripcion = normalizarTexto(request.body.descripcion ?? '');
        const imagen = normalizarTexto(request.body.imagen ?? '');

        if (!nombre) {
            return response.status(400).json({
                mensaje: 'el nombre de la categoría es requerido'
            });
        }

        if (await existeCategoriaConNombre(nombre)) {
            return response.status(409).json({
                mensaje: 'ya existe una categoría con ese nombre'
            });
        }

        const nuevaCategoria = await CategoriaModel.create({
            nombre,
            descripcion: descripcion || undefined,
            imagen: imagen || undefined,
            estado: request.body.estado ?? true
        });

        return response.status(201).json({
            mensaje: 'categoría creada satisfactoriamente',
            datos: nuevaCategoria
        });
    } catch (error) {
        const problema = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al crear la categoría',
            problema
        });
    }
};

export const getCategorias = async (request, response) => {
    try {
        const categorias = await CategoriaModel.find();
        if (!categorias || categorias.length === 0) {
            return response.status(200).json({
                mensaje: 'no se encontraron categorías en la base de datos',
                datos: []
            });
        }
        return response.status(200).json({
            mensaje: 'estas son todas las categorías encontradas',
            datos: categorias
        });
    } catch (error) {
        const problema = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al buscar las categorías',
            problema
        });
    }
};

export const putCategoriaById = async (request, response) => {
    try {
        const idForPut = request.params.id;
        const dataForUpdate = { ...request.body };

        if (dataForUpdate.nombre !== undefined) {
            dataForUpdate.nombre = normalizarTexto(dataForUpdate.nombre);
            if (!dataForUpdate.nombre) {
                return response.status(400).json({
                    mensaje: 'el nombre de la categoría no puede quedar vacío'
                });
            }

            if (await existeCategoriaConNombre(dataForUpdate.nombre, idForPut)) {
                return response.status(409).json({
                    mensaje: 'ya existe una categoría con ese nombre'
                });
            }
        }

        if (dataForUpdate.descripcion !== undefined) {
            dataForUpdate.descripcion = normalizarTexto(dataForUpdate.descripcion);
        }

        if (dataForUpdate.imagen !== undefined) {
            dataForUpdate.imagen = normalizarTexto(dataForUpdate.imagen);
        }

        const categoriaUpdated = await CategoriaModel.findByIdAndUpdate(
            idForPut,
            dataForUpdate,
            { new: true, runValidators: true }
        );

        if (!categoriaUpdated) {
            return response.status(404).json({
                mensaje: 'no se encontró la categoría para actualizar'
            });
        }

        return response.status(200).json({
            mensaje: 'categoría actualizada satisfactoriamente',
            datos: categoriaUpdated
        });
    } catch (error) {
        const problem = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al actualizar la categoría',
            problem
        });
    }
};

export const deleteCategoriaById = async (request, response) => {
    try {
        const idForDelete = request.params.id;
        const categoriaDeleted = await CategoriaModel.findByIdAndDelete(idForDelete);
        if (!categoriaDeleted) {
            return response.status(404).json({
                mensaje: 'no se encontró la categoría para eliminar'
            });
        }
        return response.status(200).json({
            mensaje: 'categoría eliminada satisfactoriamente'
        });
    } catch (error) {
        return response.status(400).json({
            mensaje: 'ocurrió un error al eliminar la categoría',
            problem: (error && error.message) || error
        });
    }
};

