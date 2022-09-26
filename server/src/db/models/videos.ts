import {Sequelize, DataTypes, Model} from 'sequelize'
import { VideoModel } from '../../databaseTypes';

export default (sequelize: Sequelize) => {
  // class Videos extends Model {}
  const Videos = sequelize.define<VideoModel>('videos', {
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
  }, {
    modelName: 'videos',
    tableName: 'videos',
    timestamps: true
  })
  return Videos;
};