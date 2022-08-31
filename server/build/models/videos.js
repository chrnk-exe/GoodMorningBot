'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Videos.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
    ownerid: DataTypes.INTEGER,
    content: DataTypes.BLOB,
    vkcontent: DataTypes.STRING,
    day: DataTypes.INTEGER,
    date_of_creation: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'videos',
    tableName: 'videos',
    timestamps: true
  });
  return Videos;
};