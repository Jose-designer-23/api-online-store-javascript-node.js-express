

const { ObjectId } = require("mongodb");

const { ProductsUtils } = require("../Products/utils.js");

const { Database } = require("../Database/index.js");



const COLLECTION = "products";

const getAll = async () => {
    try {
        const collection = await Database(COLLECTION);
        console.log("Productos obtenidos desde la base de datos:");
        return await collection.find({}).toArray();

    } catch (error) {
        console.error("Error al obtener productos desde la base de datos:", error);
        throw error;
    }
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    const product = collection.findOne({ _id: new ObjectId(id) });
    return product;
};

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
};

const generateReport = async (name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res);
}

const update = async (id, productData) => {
    const collection = await Database(COLLECTION);
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: productData }
    );
    return result.matchedCount > 0 ? productData : null;
};

const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
};

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport,
    update,
    delete: deleteProduct,
};