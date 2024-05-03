'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Responsable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Responsable.init({
    numEmpleado: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    imagenResponsable: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Responsable',
  });
  return Responsable;
};