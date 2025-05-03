const createError = require("http-errors");
const { SalesService } = require("../Sales/services.js");
const debug = require("debug")("app:module-sales-controller");
const { Response } = require("../Common/response.js");

module.exports.SalesController = {
    getSales: async (req, res) => {
        try {
            debug("Obteniendo ventas...");
            const sales = await SalesService.getAll();
            Response.success(res, 200, "Lista de ventas", sales);
        } catch (error) {
            debug("Error al obtener ventas:", error);
            Response.error(res);
        }
    },

    getSale: async (req, res) => {
        try {
            const { params: { id } } = req;
            const sale = await SalesService.getById(id);
            if (!sale) {
                Response.error(res, new createError.NotFound("Venta no encontrada"));
            } else {
                Response.success(res, 200, `Venta ${id}`, sale);
            }
        } catch (error) {
            debug("Error al obtener venta:", error);
            Response.error(res);
        }
    },

    createSale: async (req, res) => {
        try {
            const { body } = req;
    
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest("El cuerpo de la solicitud está vacío"));
                return;
            }
    
            const { products } = body; // Suponemos que el cuerpo incluye un array de productos
            if (!products || !Array.isArray(products) || products.length === 0) {
                Response.error(res, new createError.BadRequest("Debe incluir al menos un producto en la venta"));
                return;
            }
    
            // Validar stock
            const isStockValid = await SalesService.validateStock(products);
            if (!isStockValid) {
                Response.error(res, new createError.BadRequest("La cantidad solicitada excede el stock disponible"));
                return;
            }
    
            // Registrar la venta
            const insertedId = await SalesService.create(body);
    
            // Actualizar el stock de los productos
            await SalesService.updateStock(products);
    
            Response.success(res, 201, "Venta registrada", insertedId);
        } catch (error) {
            debug("Error al registrar venta:", error);
            Response.error(res);
        }
    },

    updateSale: async (req, res) => {
        try {
            const { params: { id }, body } = req;

            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest("El cuerpo de la solicitud está vacío"));
                return;
            }

            const updatedSale = await SalesService.update(id, body);

            if (!updatedSale) {
                Response.error(res, new createError.NotFound("Venta no encontrada"));
            } else {
                Response.success(res, 200, `Venta ${id} actualizada`, updatedSale);
            }
        } catch (error) {
            debug("Error al actualizar venta:", error);
            Response.error(res);
        }
    },

    deleteSale: async (req, res) => {
        try {
            const { params: { id } } = req;

            const deletedSale = await SalesService.delete(id);

            if (!deletedSale) {
                Response.error(res, new createError.NotFound("Venta no encontrada"));
            } else {
                Response.success(res, 200, `Venta ${id} eliminada`);
            }
        } catch (error) {
            debug("Error al eliminar venta:", error);
            Response.error(res);
        }
    },
};