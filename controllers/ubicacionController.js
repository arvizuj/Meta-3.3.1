const Ubicacion = require('../models').Ubicacion;

const obtenerDatos = async function (req, res) {
    let p = await Ubicacion.findAll();
    await res.json(p);
}

const obtenerPorId = async function (req, res) {
    const id = parseInt(req.params.id);
    let p = Ubicacion.findByPk(id);
    await res.json(p);
}

const agregarUbicacion = async function (req, res) {
    const { descripcion, imagenUbicacion } = req.body;
    await Ubicacion.create({
        descripcion,
        imagenUbicacion, 
        createdAt: new Date(), 
        updatedAt: new Date()
    });
    res.status(201).send('Ubicación agregada con éxito');
}

const actualizarUbicacion = async function (req, res) {
    const id = parseInt(req.params.id);
    const { descripcion, imagenUbicacion } = req.body;
    try {
        const ubicacion = await Ubicacion.findByPk(id);
        if (!ubicacion) {
            return res.status(404).json({ error: 'Ubicación no encontrada' });
        }
        await ubicacion.update({
            descripcion,
            imagenUbicacion
        });
        res.status(201).send('Ubicación actualizada con éxito');
    } catch (error) {
        console.error('Error al actualizar la ubicación:', error);
        res.status(500).json({ error: 'Error al actualizar la ubicación' });
    }
}

const borrarUbicacion = async function (req, res) {
    const id = parseInt(req.params.id);
    try {
        const ubicacion = await Ubicacion.findByPk(id);
        if (!ubicacion) {
          return res.status(404).json({ error: 'Ubicación no encontrada' });
        }
        ubicacion.destroy();
        res.status(201).send('Ubicación eliminada con éxito');
    } catch (error) {
        console.error('Error al eliminar la ubicación:', error);
        res.status(500).json({ error: 'Error al eliminar la ubicación' });
    }
}

exports.obtenerDatos = obtenerDatos;
exports.obtenerPorId = obtenerPorId;
exports.agregarUbicacion = agregarUbicacion;
exports.actualizarUbicacion = actualizarUbicacion;
exports.borrarUbicacion = borrarUbicacion;