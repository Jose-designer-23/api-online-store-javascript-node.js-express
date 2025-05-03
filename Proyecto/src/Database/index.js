const { MongoClient } = require("mongodb");
const debug = require('debug')('app:module-database');
const { Config } = require("../Config/index"); // Cambiado a minúsculas

var connection = null; // Variable global para reutilizar la conexión

module.exports.Database = (collection) => 
    new Promise(async (resolve, reject) => {
        try {
            if (!connection) {
                const client = new MongoClient(Config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
                connection = await client.connect();
                debug('Nueva conexión realizada con MongoDB Atlas');
            } else {
                debug('Reutilizando conexión existente');
            }

            const db = connection.db(Config.mongoDbname);
            debug(`Conectado a la base de datos: ${Config.mongoDbname}`);
            resolve(db.collection(collection));
        } catch (error) {
            debug('Error al conectar a la base de datos:', error.message);
            console.error('Error al conectar a la base de datos:', error); // Agrega este mensaje
            reject(error);
        }
});