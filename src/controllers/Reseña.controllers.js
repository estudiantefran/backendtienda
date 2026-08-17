import { ReseñaModel } from '../models/Reseña.model.js';

const normalizarComentario = (valor = '') => String(valor).trim();

export const postResena = async (request, response) => {
    try {
        const { usuario, producto, calificacion, comentario } = request.body;

        if (!usuario || !producto) {
            return response.status(400).json({
                mensaje: 'usuario y producto son requeridos'
            });
        }

        const calificacionValue = Number(calificacion);
        if (Number.isNaN(calificacionValue) || calificacionValue < 1 || calificacionValue > 5) {
            return response.status(400).json({
                mensaje: 'la calificación debe estar entre 1 y 5'
            });
        }

        const reseñaExistente = await ReseñaModel.findOne({ usuario, producto });
        if (reseñaExistente) {
            return response.status(409).json({
                mensaje: 'este usuario ya dejó una reseña para este producto'
            });
        }

        const nuevaResena = await ReseñaModel.create({
            usuario,
            producto,
            calificacion: calificacionValue,
            comentario: comentario !== undefined ? normalizarComentario(comentario) : undefined
        });

        return response.status(201).json({
            mensaje: 'reseña creada satisfactoriamente',
            datos: nuevaResena
        });
    } catch (error) {
        const problema = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al crear la reseña',
            problema
        });
    }
};

export const getResenas = async (request, response) => {
    try {
        const resenas = await ReseñaModel.find().populate('usuario producto');
        if (!resenas || resenas.length === 0) {
            return response.status(200).json({
                mensaje: 'no se encontraron reseñas en la base de datos',
                datos: []
            });
        }
        return response.status(200).json({
            mensaje: 'estas son todas las reseñas encontradas',
            datos: resenas
        });
    } catch (error) {
        const problema = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al buscar las reseñas',
            problema
        });
    }
};

export const putResenaById = async (request, response) => {
    try {
        const idForPut = request.params.id;
        const dataForUpdate = { ...request.body };

        if (dataForUpdate.calificacion !== undefined) {
            const calificacionValue = Number(dataForUpdate.calificacion);
            if (Number.isNaN(calificacionValue) || calificacionValue < 1 || calificacionValue > 5) {
                return response.status(400).json({
                    mensaje: 'la calificación debe estar entre 1 y 5'
                });
            }
            dataForUpdate.calificacion = calificacionValue;
        }

        if (dataForUpdate.comentario !== undefined) {
            dataForUpdate.comentario = normalizarComentario(dataForUpdate.comentario);
        }

        const resenaUpdated = await ReseñaModel.findByIdAndUpdate(
            idForPut,
            dataForUpdate,
            { new: true, runValidators: true }
        );
        if (!resenaUpdated) {
            return response.status(404).json({
                mensaje: 'no se encontró la reseña para actualizar'
            });
        }
        return response.status(200).json({
            mensaje: 'reseña actualizada satisfactoriamente',
            datos: resenaUpdated
        });
    } catch (error) {
        const problem = (error && error.message) || error;
        return response.status(400).json({
            mensaje: 'ocurrió un error al actualizar la reseña',
            problem
        });
    }
};

export const deleteResenaById = async (request, response) => {
    try {
        const idForDelete = request.params.id;
        const resenaDeleted = await ReseñaModel.findByIdAndDelete(idForDelete);
        if (!resenaDeleted) {
            return response.status(404).json({
                mensaje: 'no se encontró la reseña para eliminar'
            });
        }
        return response.status(200).json({
            mensaje: 'reseña eliminada satisfactoriamente'
        });
    } catch (error) {
        return response.status(400).json({
            mensaje: 'ocurrió un error al eliminar la reseña',
            problem: (error && error.message) || error
        });
    }
};
