const Responsable = require('../models').Responsable;

const obtenerDatos = async function (req, res) {
    let p = await Responsable.findAll();
    await res.json(p);
}

const obtenerPorId = async function (req, res) {
    const id = parseInt(req.params.id);
    let p = Responsable.findByPk(id);
    await res.json(p);
}

const agregarResponsable = async function (req, res) {
    const { numEmpleado, nombre, imagenResponsable } = req.body;
    await Responsable.create({
        numEmpleado, 
        nombre, 
        imagenResponsable, 
        createdAt: new Date(), 
        updatedAt: new Date()
    });
    res.status(201).send('Responsable agregado con éxito');
}

const actualizarResponsable = async function (req, res) {
    const id = parseInt(req.params.id);
    const { numEmpleado, nombre, imagenResponsable } = req.body;
    try {
        const responsable = await Responsable.findByPk(id);
        if (!responsable) {
            return res.status(404).json({ error: 'Responsable no encontrado' });
        }
        await responsable.update({
            numEmpleado,
            nombre,
            imagenResponsable
        });
        res.status(201).send('Responsable actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar el responsable:', error);
        res.status(500).json({ error: 'Error al actualizar el responsable' });
    }
}

const borrarResponsable = async function (req, res) {
    const id = parseInt(req.params.id);
    try {
        const responsable = await Responsable.findByPk(id);
        if (!responsable) {
          return res.status(404).json({ error: 'Responsable no encontrado' });
        }
        responsable.destroy();
        res.status(201).send('Responsable eliminado con éxito');
    } catch (error) {
        console.error('Error al eliminar el responsable:', error);
        res.status(500).json({ error: 'Error al eliminar el responsable' });
    }
}

exports.obtenerDatos = obtenerDatos;
exports.obtenerPorId = obtenerPorId;
exports.agregarResponsable = agregarResponsable;
exports.actualizarResponsable = actualizarResponsable;
exports.borrarResponsable = borrarResponsable;