import {QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      ownerid: {
        type: DataTypes.INTEGER
      },
      content: {
        type: DataTypes.BLOB
      },
      vkcontent: {
        type: DataTypes.STRING
      },
      day: {
        type: DataTypes.INTEGER
      },
      date_of_creation: {
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('videos');
  }
};