import {Sequelize, DataTypes} from 'sequelize'

export default (sequelize: Sequelize) => {
  const MailingUser = sequelize.define('mailing_list', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
      vklink: DataTypes.STRING,
      customVideos: DataTypes.TEXT
    }, {
      modelName: 'mailing_list',
      tableName: 'mailing_list',
      timestamps: true
    })

  return MailingUser;
};

