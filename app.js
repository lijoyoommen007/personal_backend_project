const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./router/userAuth');
const sequelize = require('./config/db_config'); // Your database connection
const Constants = require('./const/constants');

dotenv.config();

// Middleware
app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// New route
app.get('/hello', (req, res) => {
  res.send('Hello, World!'); 
});

// Start the database connection and server
(async () => { 
  try {
    await sequelize.authenticate();
    console.log('Connected to the database!');
    app.listen(Constants.port, () => {
      console.log('Backend is running!.....');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
