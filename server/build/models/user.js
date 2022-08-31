'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    vklink: DataTypes.STRING,
    last_vizit: DataTypes.DATE,
    added_videos: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN,
    activated: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users',
    tableName: 'users',
    timestamps: true
  });
  return User;
};