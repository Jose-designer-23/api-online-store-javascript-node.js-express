const { ObjectId } = require("mongodb");

const { Database } = require("../Database/index.js");



const COLLECTION = "users";

const getAll = async () => {
    try {
        const collection = await Database(COLLECTION);
        console.log("Usuarios obtenidos desde la base de datos:");
        return await collection.find({}).toArray();

    } catch (error) {
        console.error("Error al obtener usuarios desde la base de datos:", error);
        throw error;
    }
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    const product = collection.findOne({ _id: new ObjectId(id) });
    return product;
};

const create = async (user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user);
    return result.insertedId;
};

const update = async (id, userData) => {
    const collection = await Database(COLLECTION);
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: userData }
    );
    return result.matchedCount > 0 ? userData : null;
};

const deleteUser = async (id) => {
    const collection = await Database(COLLECTION);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
};

module.exports.UsersService = {
    getAll,
    getById,
    create,
    update,
    delete: deleteUser,
};