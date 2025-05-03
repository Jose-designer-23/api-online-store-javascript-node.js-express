const express = require("express");
const { Response } = require("../Common/response.js"); // Asegúrate de que este archivo exista y funcione
const createError = require("http-errors");

module.exports.IndexAPI = (app) => {
    const router = express.Router();
    router.get("/", (req, res) => {
        try {
            const protocol = req.protocol; // Obtener el protocolo (http o https)
            const host = req.get("host"); // Obtener el host de manera segura
            const menu = {
                products: `${protocol}://${host}/api/products`,
                users: `${protocol}://${host}/api/users`,
                sales: `${protocol}://${host}/api/sales`,
            };
            Response.success(res, 200, "API Inventario", menu);
        } catch (error) {
            console.error("Error en IndexAPI:", error);
            res.status(500).send("Error interno del servidor");
        }
    });
    app.use("/", router);
};

module.exports.NotFoundAPI = (app) => {
    const router = express.Router();
    router.use((req, res) => {
        try {
            const error = new createError.NotFound("Ruta no encontrada");
            Response.error(res, error);
        } catch (error) {
            console.error("Error en NotFoundAPI:", error);
            res.status(500).send("Error interno del servidor");
        }
    });
    app.use(router);
};