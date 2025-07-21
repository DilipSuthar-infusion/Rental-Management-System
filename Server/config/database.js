import { Sequelize } from "sequelize";





const sequelize = new Sequelize('rental_management', 'root', 'Data@123', {
    host: 'localhost',
    dialect: 'mysql', 
    logging: false,
  });


  (async () => {
    try {
      await sequelize.authenticate();
      console.log('DB connected successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

  

  export default sequelize