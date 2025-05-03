const express = require('express');
const { ProductsController } = require ("./controller.js");
const router = express.Router();


module.exports.ProductsAPI = (app) => {
    router.get("/", ProductsController.getProducts); // http://localhost:3000/api/products
    router.get("/report", ProductsController.generateReport); // Debe ponerse antes de id, si no da fallo
    router.get("/:id", ProductsController.getProduct); // http://localhost:3000/api/products/:id
    router.post("/", ProductsController.createProduct); // http://localhost:3000/api/products
    router.put("/:id", ProductsController.updateProduct); // Ruta para actualizar
    router.delete("/:id", ProductsController.deleteProduct); // Ruta para eliminar

    // Usa el router en la ruta base
    app.use('/api/products', router);
};