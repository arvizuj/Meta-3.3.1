const {Activo, Ubicacion, Responsable} = require('../models');

const obtenerDatos = async function(req, res) {
    let p = await Activo.findAll();
    await res.json(p);
}

const obtenerPorId = async function (req, res) {
    const id = parseInt(req.params.id);
    let p = Activo.findByPk(id);
    await res.json(p);
}

const agregarActivo = async function (req, res) {
    const { numSerie, numInventario, descripcion, ubicacion, responsable, imagen } = req.body;
    try {
        await Activo.create({ 
            numSerie, 
            numInventario, 
            descripcion, 
            ubicacion: ubicacion || null, 
            responsable: responsable || null, 
            imagen, 
            createdAt: new Date(), 
            updatedAt: new Date()
        });
        res.status(201).send('Activo agregado con éxito');
    } catch {
        console.error('Error al crear el activo:', error);
        res.status(500).json({ error: 'Error al crear el activo' });
    }
    
}

const actualizarActivo = async function (req, res) {
    const id = parseInt(req.params.id);
    const { numSerie, numInventario, descripcion, ubicacion, responsable, imagen } = req.body;

    try {
        const activo = await Activo.findByPk(id);
        if (!activo) {
          return res.status(404).json({ error: 'Activo no encontrado' });
        }
        activo.update({
            numSerie, 
            numInventario, 
            descripcion, 
            ubicacion: ubicacion || null, 
            responsable: responsable || null, 
            imagen
        });
        res.status(201).send('Activo actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar el activo:', error);
        res.status(500).json({ error: 'Error al actualizar el activo' });
    }
}

const borrarActivo = async function (req, res) {
    const id = parseInt(req.params.id);
    try {
        const activo = await Activo.findByPk(id);
        if (!activo) {
          return res.status(404).json({ error: 'Activo no encontrado' });
        }
        activo.destroy();
        res.status(201).send('Activo eliminado con éxito');
    } catch (error) {
        console.error('Error al eliminar el activo:', error);
        res.status(500).json({ error: 'Error al eliminar el activo' });
    }
}

exports.obtenerDatos = obtenerDatos;
exports.obtenerPorId = obtenerPorId;
exports.agregarActivo = agregarActivo;
exports.actualizarActivo = actualizarActivo;
exports.borrarActivo = borrarActivo;