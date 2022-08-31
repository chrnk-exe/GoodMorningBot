'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MailingUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MailingUser.init({
  id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
    vklink: DataTypes.STRING,
    customVideos: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'mailing_list',
    tableName: 'mailing_list',
    timestamps: true
  });
  return MailingUser;
};