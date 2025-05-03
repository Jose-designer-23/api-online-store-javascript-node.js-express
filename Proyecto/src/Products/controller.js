const createError = require("http-errors");
const { ProductsService } = require ("./services.js");
console.log("ProductsService importado:", ProductsService); // Cambiado a minúsculas
const debug = require("debug")("app:module-products-controller"); // Cambiado a minúsculas
const { Response } = require ("../Common/response.js");

module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            debug("Obteniendo productos...");
            let products = await ProductsService.getAll();
            Response.success(res, 200, "Lista de productos", products);
            debug("Productos obtenidos:", products);
        } catch (error) {
            debug("Error al obtener productos:", error);
            Response.error(res);
        }
    },

    getProduct: async (req, res) => {
        try{
            const {  params : { id },} = req;
            let product = await ProductsService.getById(id);
            if(!product){
                Response.error(res, new createError.NotFound());
            } else{
                Response.success(res, 200, `Producto ${id}`, product);
            }
            
        } catch (error) {
            debug("Error al obtener productos:", error);
            Response.error(res);
        }
    },

    getProductById: async (req, res) => {},

    createProduct: async (req, res) => {
        try{
            const { body } = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            } else{
                const insertedId = await ProductsService.create(body);
                Response.success(res, 201, "Producto agregado", insertedId)
            }
            
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    generateReport: (req, res) => {
        try {
            ProductsService.generateReport("Inventario2", res);
        }catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { params: { id }, body } = req;
    
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest("El cuerpo de la solicitud está vacío"));
                return;
            }
    
            const updatedProduct = await ProductsService.update(id, body);
    
            if (!updatedProduct) {
                Response.error(res, new createError.NotFound("Producto no encontrado"));
            } else {
                Response.success(res, 200, `Producto ${id} actualizado`, updatedProduct);
            }
        } catch (error) {
            debug("Error al actualizar producto:", error);
            Response.error(res);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
    
            const deletedProduct = await ProductsService.delete(id);
    
            if (!deletedProduct) {
                Response.error(res, new createError.NotFound("Producto no encontrado"));
            } else {
                Response.success(res, 200, `Producto ${id} eliminado`);
            }
        } catch (error) {
            debug("Error al eliminar producto:", error);
            Response.error(res);
        }
    },
};