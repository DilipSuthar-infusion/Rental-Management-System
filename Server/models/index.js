import sequelize from '../config/database.js';
import Booking from './booking.model.js';
import Profile from './Profile.model.js';
import Property from './property.model.js';
import Review from './review.model.js';
import User from './user.model.js';


const models = {
  User,
  Profile,
  Booking,
  Review,
  Property
};


Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize };
export default models;
