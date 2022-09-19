import {Sequelize, DataTypes, Model} from 'sequelize'

export default (sequelize: Sequelize) => {
  // class Videos extends Model {}
  const Videos = sequelize.define('videos', {
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
    modelName: 'videos',
    tableName: 'videos',
    timestamps: true
  })
  return Videos;
};