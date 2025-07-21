import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";
 
const Property = sequelize.define("Property", {
 
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pricePerNight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
  type: DataTypes.DECIMAL(10, 8),
  
},
longitude: {
  type: DataTypes.DECIMAL(11, 8),
  
},
  amenities: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    
  },
  propertyType: {
    type: DataTypes.ENUM("Apartment", "House", "Villa"),
    allowNull: false,
  },
  guestCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableFrom: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  availableTo: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});
 
 
 
Property.associate = (models) => {
  Property.belongsTo(models.User, { foreignKey: 'userId', onDelete:'CASCADE' });
};
 
export default Property;