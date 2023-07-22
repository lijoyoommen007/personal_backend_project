const { Sequelize } = require('sequelize');
const Constants = require('../const/constants');


// Replace this with the connection URL provided by Render
const connectionUrl = Constants.connectionURL;

// Create the Sequelize instance
const sequelize = new Sequelize(connectionUrl, {
  dialect: 'postgres',
  dialectOptions:{
    ssl:true
  }
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
