import { Sequelize, DataTypes, Model } from "sequelize";
// import { MailingUserAttr, MailingUserInput } from "../../globals";

export default (sequelize: Sequelize) => {
  class MailingUser extends Model<MailingUserAttr, MailingUserInput> {  }
  MailingUser.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vklink: DataTypes.STRING,
    customVideos: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  },
  {
    sequelize,
    modelName: "mailing_list",
    tableName: "mailing_list",
    timestamps: true,
  })
  return MailingUser;
};
