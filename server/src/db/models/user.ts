import {Sequelize, DataTypes} from 'sequelize'

export default (sequelize: Sequelize) => {
  const User = sequelize.define('users', {
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
    modelName: 'users',
    tableName: 'users',
    timestamps: true
  })
  return User;
};