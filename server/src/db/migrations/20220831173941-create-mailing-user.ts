'use strict';
import {QueryInterface, DataTypes} from 'sequelize'
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('mailing_list', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      vklink: {
        type: DataTypes.STRING
      },
      customVideos: {
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('mailing_list');
  }
};