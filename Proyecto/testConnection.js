require("dotenv").config(); // Carga las variables de entorno desde el archivo .env
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI; // Usa la URI desde el archivo .env

// Crea un cliente de MongoDB con las opciones necesarias
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Conecta el cliente al servidor
    await client.connect();
    // Envía un ping para confirmar la conexión exitosa
    await client.db(process.env.MONGO_DBNAME).command({ ping: 1 });
    console.log("¡Conexión exitosa a MongoDB!");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  } finally {
    // Asegúrate de cerrar el cliente cuando termines
    await client.close();
  }
}

run().catch(console.dir);