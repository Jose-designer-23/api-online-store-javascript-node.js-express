const express = require("express");
const { SalesController } = require("./controller.js");
const router = express.Router();

module.exports.SalesAPI = (app) => {
    router.get("/", SalesController.getSales); // Listar todas las ventas
    router.get("/:id", SalesController.getSale); // Obtener una venta específica
    router.post("/", SalesController.createSale); // Registrar una nueva venta
    router.put("/:id", SalesController.updateSale); // Actualizar una venta
    router.delete("/:id", SalesController.deleteSale); // Eliminar una venta

    app.use("/api/sales", router);
};