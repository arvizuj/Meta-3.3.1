'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ubicacion.init({
    descripcion: DataTypes.STRING,
    imagenUbicacion: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Ubicacion',
  });
  return Ubicacion;
};