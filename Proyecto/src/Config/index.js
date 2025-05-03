require("dotenv").config();

const debug = require("debug")("app:config");
debug("El puerto configurado es:", process.env.PORT);

module.exports.Config = {
    PORT: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbname: process.env.MONGO_DBNAME,
};