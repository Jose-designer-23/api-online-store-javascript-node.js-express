const express = require('express');
const debug = require('debug')('app:main');
const { Config } = require("./src/Config/index.js"); 
const { ProductsAPI } = require ("./src/Products/index.js");
const { UsersAPI } = require ("./src/Users/index.js");
const { SalesAPI } = require ("./src/Sales/index.js"); 
const { IndexAPI, NotFoundAPI } = require("./src/Index/index.js");
const app = express();
app.use(express.json());

IndexAPI(app); //Debe ponerse la primera
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app); 
NotFoundAPI(app); //Debe ponerse la última

// Inicia el servidor
app.listen(Config.PORT, () => {
    debug("Servidor escuchando en el puerto " + Config.PORT);
});