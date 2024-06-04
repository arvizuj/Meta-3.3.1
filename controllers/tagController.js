const { Activo, Tags } =require("../models");

const obtenerDatos = async function (req, res) {
    let p = await Tags.findAll();
    await res.json(p);
}

const obtenerPorId = async function (req, res) {
    const id = parseInt(req.params.id);
    let p = Tags.findByPk(id);
    await res.json(p);
}

const agregarTag = async function (req, res) {
    const { descripcion } = req.body;
    await Tags.create({
        descripcion,
        createdAt: new Date(), 
        updatedAt: new Date()
    });
    res.status(201).send('Tag agregado con éxito');
}

const actualizarTag = async function (req, res) {
    const id = parseInt(req.params.id);
    const descripcion = req.body;
    try {
        const tag = await Tags.findByPk(id);
        if (!tag) {
          return res.status(404).json({ error: 'Tag no encontrado' });
        }
        await tag.update({
          descripcion
        });
        res.json(tag);
    } catch (error) {
        console.error('Error al actualizar el tag:', error);
        res.status(500).json({ error: 'Error al actualizar el tag' });
    }
}

const borrarTag = async function (req, res) {
    const id = parseInt(req.params.id);
    try {
        const tag = await Tags.findByPk(id);
        if (!tag) {
          return res.status(404).json({ error: 'Tag no encontrado' });
        }
        await tag.destroy({
          descripcion
        });
        res.json(tag);
    } catch (error) {
        console.error('Error al eliminar el tag:', error);
        res.status(500).json({ error: 'Error al eliminar el tag' });
    }
}

const asignarTag = async function(req, res) {
    const { tagId, activoId } = req.body;
    try {
      const tag = await Tags.findByPk(tagId);
      const activo = await Activo.findByPk(activoId);
      if (!tag || !activo) {
        return res.status(404).json({ error: 'No se encontró el Tag o Activo' });
      }
      await activo.addTag(tag);
      res.json({ mensaje: 'Tag asignado correctamente al activo' });
    } catch (error) {
      console.error('Error al asignar el tag al activo:', error);
      res.status(500).json({ error: 'Error al asignar el tag al activo' });
    }
}

const desasignarTag =  async function(req, res) {
    const { tagId, activoId } = req.body;
    try {
      const tag = await Tags.findByPk(tagId);
      const activo = await Activo.findByPk(activoId);
      if (!tag || !activo) {
        return res.status(404).json({ error: 'No se encontró el Tag o Activo' });
      }
      await activo.removeTag(tag);
      res.json({ mensaje: 'Tag desasignado correctamente del activo' });
    } catch (error) {
      console.error('Error al desasignar el tag del activo:', error);
      res.status(500).json({ error: 'Error al desasignar el tag del activo' });
    }
}

exports.obtenerDatos = obtenerDatos;
exports.obtenerPorId = obtenerPorId;
exports.agregarTag = agregarTag;
exports.actualizarTag = actualizarTag;
exports.borrarTag = borrarTag;
exports.asignarTag = asignarTag;
exports.desasignarTag = desasignarTag;