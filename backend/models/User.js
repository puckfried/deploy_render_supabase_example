import { DataTypes, Model } from "sequelize";
import db from "../libs/db.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true, // don't allow empty strings
        isEmail: true, // checks for email format (foo@bar.com)
        len: [5, 100], // only allow values with length between 5 and 100
      },
    },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize: db, modelName: "user", timestamps: true },
);

export default User;