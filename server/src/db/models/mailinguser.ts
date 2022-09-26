import { Sequelize, DataTypes, Model } from "sequelize";
import { MailingUserModel } from "../../databaseTypes";

export default (sequelize: Sequelize) => {
  const MailingUser = sequelize.define<MailingUserModel>('mailing_list', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vklink: DataTypes.STRING,
    customVideos: DataTypes.TEXT,
  }, {
    modelName: "mailing_list",
    tableName: "mailing_list",
    timestamps: true,
  })
  return MailingUser;
};
