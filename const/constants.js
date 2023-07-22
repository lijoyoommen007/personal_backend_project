const dotenv = require('dotenv');
dotenv.config();
const Constants={
    connectionURL:process.env.CONNECTION_URL,
    port:process.env.PORT
}

module.exports = Constants