const dotenv = require('dotenv').config();

module.exports={
    MONGODB_URI:process.env.MONGODB_URI,
    BASE_URL:process.env.BASE_URL,
    HOST:process.env.HOST,
    PORT:process.env.PORT
}