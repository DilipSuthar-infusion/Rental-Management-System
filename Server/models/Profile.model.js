import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
 
const Profile = sequelize.define("Profile", {
 
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  workProfile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alternatePhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IDProof: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IDImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  documentVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true,
});
 
Profile.associate = (models) => {
  Profile.belongsTo(models.User, { foreignKey: 'userId' });
};
 
export default Profile;











