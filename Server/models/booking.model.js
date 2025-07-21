import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";
import Property from "./property.model.js";
 
const Booking = sequelize.define("Booking", {
  checkInDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  checkOutDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
   totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Confirmed", "Cancelled", "Completed"),
    defaultValue: "Pending",
  },
  paymentStatus: {
    type: DataTypes.ENUM("Pending", "Paid", "Failed"),
    defaultValue: "Pending",
  },
 
}, {
  timestamps: true,
})
 
 
Booking.associate = (models) => {
  Booking.belongsTo(models.User, { foreignKey: "userId" });
  Booking.belongsTo(models.Property, { foreignKey: "propertyId" });
};
 
 
export default Booking;