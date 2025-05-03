const { ObjectId } = require("mongodb");
const { Database } = require("../Database/index.js");

const COLLECTION_PRODUCTS = "products";
const COLLECTION = "sales";

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ _id: new ObjectId(id) });
};

// Validar stock
const validateStock = async (products) => {
    const collection = await Database(COLLECTION_PRODUCTS);

    for (const product of products) {
        const { productId, quantity } = product;
        const dbProduct = await collection.findOne({ _id: new ObjectId(productId) });

        if (!dbProduct || dbProduct.cantidad < quantity) {
            return false; // Stock insuficiente
        }
    }

    return true; // Stock válido
};

// Actualizar stock
const updateStock = async (products) => {
    const collection = await Database(COLLECTION_PRODUCTS);

    for (const product of products) {
        const { productId, quantity } = product;
        await collection.updateOne(
            { _id: new ObjectId(productId) },
            { $inc: { cantidad: -quantity } } // Reducir el stock
        );
    }
};

// Crear venta
const create = async (sale) => {
    const session = await (await Database()).startSession(); // Iniciar una sesión
    session.startTransaction(); // Iniciar la transacción

    try {
        const collectionSales = await Database(COLLECTION);
        const collectionProducts = await Database(COLLECTION_PRODUCTS);

        // Validar el stock antes de registrar la venta
        const { products } = sale;
        const isStockValid = await validateStock(products);
        if (!isStockValid) {
            throw new Error("La cantidad solicitada excede el stock disponible");
        }

        // Reducir el stock de los productos
        for (const product of products) {
            const { productId, quantity } = product;
            await collectionProducts.updateOne(
                { _id: new ObjectId(productId) },
                { $inc: { cantidad: -quantity } }, // Reducir el stock
                { session } // Asociar la operación a la transacción
            );
        }

        // Registrar la venta
        const result = await collectionSales.insertOne(sale, { session }); // Asociar la operación a la transacción

        // Confirmar la transacción
        await session.commitTransaction();
        session.endSession();

        return result.insertedId;
    } catch (error) {
        // Deshacer todas las operaciones si ocurre un error
        await session.abortTransaction();
        session.endSession();
        throw error; // Propagar el error para manejarlo en el controlador
    }
};

const update = async (id, saleData) => {
    const session = await (await Database()).startSession(); // Iniciar una sesión
    session.startTransaction(); // Iniciar la transacción

    try {
        const collectionSales = await Database(COLLECTION);
        const collectionProducts = await Database(COLLECTION_PRODUCTS);

        // Obtener la venta original
        const originalSale = await collectionSales.findOne({ _id: new ObjectId(id) }, { session });

        if (!originalSale) {
            throw new Error("La venta no existe");
        }

        // Restaurar el stock de los productos de la venta original
        const { products: originalProducts } = originalSale;
        for (const product of originalProducts) {
            const { productId, quantity } = product;
            await collectionProducts.updateOne(
                { _id: new ObjectId(productId) },
                { $inc: { cantidad: quantity } }, // Incrementar el stock
                { session } // Asociar la operación a la transacción
            );
        }

        // Validar el stock de los nuevos productos
        const { products: newProducts } = saleData;
        const isStockValid = await validateStock(newProducts);
        if (!isStockValid) {
            throw new Error("La cantidad solicitada excede el stock disponible");
        }

        // Reducir el stock de los nuevos productos
        for (const product of newProducts) {
            const { productId, quantity } = product;
            await collectionProducts.updateOne(
                { _id: new ObjectId(productId) },
                { $inc: { cantidad: -quantity } }, // Reducir el stock
                { session } // Asociar la operación a la transacción
            );
        }

        // Actualizar la venta
        const result = await collectionSales.updateOne(
            { _id: new ObjectId(id) },
            { $set: saleData },
            { session } // Asociar la operación a la transacción
        );

        // Confirmar la transacción
        await session.commitTransaction();
        session.endSession();

        return result.matchedCount > 0 ? saleData : null;
    } catch (error) {
        // Deshacer todas las operaciones si ocurre un error
        await session.abortTransaction();
        session.endSession();
        throw error; // Propagar el error para manejarlo en el controlador
    }
};

const deleteSale = async (id) => {
    const collectionSales = await Database(COLLECTION);
    const collectionProducts = await Database(COLLECTION_PRODUCTS);

    // Obtener la venta antes de eliminarla
    const sale = await collectionSales.findOne({ _id: new ObjectId(id) });

    if (!sale) {
        return false; // La venta no existe
    }

    // Restaurar el stock de los productos
    const { products } = sale;
    for (const product of products) {
        const { productId, quantity } = product;
        await collectionProducts.updateOne(
            { _id: new ObjectId(productId) },
            { $inc: { cantidad: quantity } } // Incrementar el stock
        );
    }

    // Eliminar la venta
    const result = await collectionSales.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
};

module.exports.SalesService = {
    getAll,
    getById,
    validateStock,
    updateStock,
    create,
    update,
    delete: deleteSale,
};