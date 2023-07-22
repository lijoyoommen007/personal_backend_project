// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_config');

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'lijoy',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'oommenlijoy@gmail.com',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Add more columns as needed
});

// Sync the model with the database (You can remove this block from here)
User.sync({ alter: true })
  .then(() => {
    console.log('User Model synced');
  })
  .catch((err) => {
    console.log('Something went wrong while syncing the User model:', err);
  });

module.exports = User;
