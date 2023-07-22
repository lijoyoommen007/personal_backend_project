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
const rateLimit = require('express-rate-limit');

dotenv.config();
// Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
});
app.use(limiter)
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
