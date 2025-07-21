import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Property from "./property.model.js";
import Review from "./review.model.js";
import Booking from "./booking.model.js"
 
 
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("guest", "host", "admin"),
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  mobile: { type: DataTypes.STRING, allowNull: true },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  profile_Picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});
 
 
User.associate = (models) => {
  User.hasOne(models.Profile, { foreignKey: 'userId', onDelete: 'CASCADE' });
  User.hasMany(models.Property, { foreignKey: 'userId' });
  User.hasMany(models.Booking, {foreignKey: 'propertyId'})
  User.hasMany(models.Review,{ foreignKey:"userId"})
};
 
export default User;