const express = require('express');
const { UsersController } = require ("./controller.js");
const router = express.Router();


module.exports.UsersAPI = (app) => {
    router.get("/", UsersController.getUsers); // http://localhost:3000/api/users
    router.get("/:id", UsersController.getUser); // http://localhost:3000/api/users/:id
    router.post("/", UsersController.createUser); // http://localhost:3000/api/users
    router.put("/:id", UsersController.updateUser); // http://localhost:3000/api/users/:id
    router.delete("/:id", UsersController.deleteUser); // http://localhost:3000/api/users/:id

    // Usa el router en la ruta base
    app.use('/api/users', router);
};