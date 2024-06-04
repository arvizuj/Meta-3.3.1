const { Activo, Tags, ActivoTags } = require('../models');

const obtenerDatos = async function (req, res) {
    let p = await ActivoTags.findAll();
    await res.json(p);
}

const asignarRelación = async function(req, res) {
    const { activoId, tagId } = req.body;
    try {
        // Verificar si el activo y el tag existen
        const activo = await Activo.findByPk(activoId);
        const tag = await Tags.findByPk(tagId);
        if (!activo || !tag) {
            return res.status(404).json({ error: 'Activo o tag no encontrado' });
        }

        // Verificar si la relación ya existe
        const hayRelación = await ActivoTags.findOne({
            where: {
                activoId,
                tagId
            }
        });
        if (hayRelación) {
            return res.status(400).json({ error: 'La relación entre el activo y el tag ya existe' });
        }

        // Crear la relación entre el activo y el tag
        await activo.addTag(tag);

        res.json({ mensaje: 'Tag asignado correctamente al activo' });
    } catch (error) {
        console.error('Error al asignar el tag al activo:', error);
        res.status(500).json({ error: 'Error al asignar el tag al activo' });
    }
}

// Desasignar un tag de un activo
const desasignarRelación = async function(req, res) {
    const { activoId, tagId } = req.body;
    try {
        // Verificar si el activo y el tag existen
        const activo = await Activo.findByPk(activoId);
        const tag = await Tags.findByPk(tagId);
        if (!activo || !tag) {
            return res.status(404).json({ error: 'Activo o tag no encontrado' });
        }

        // Verificar si la relación existe
        const hayRelación = await ActivoTags.findOne({
            where: {
                activoId,
                tagId
            }
        });
        if (!hayRelación) {
            return res.status(400).json({ error: 'La relación entre el activo y el tag no existe' });
        }

        // Eliminar la relación entre el activo y el tag
        await activo.removeTag(tag);

        res.json({ mensaje: 'Tag desasignado correctamente del activo' });
    } catch (error) {
        console.error('Error al desasignar el tag del activo:', error);
        res.status(500).json({ error: 'Error al desasignar el tag del activo' });
    }
}

exports.obtenerDatos = obtenerDatos;
exports.asignarRelación = asignarRelación;
exports.desasignarRelación = desasignarRelación;