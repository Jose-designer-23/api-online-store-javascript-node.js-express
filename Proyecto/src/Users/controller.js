const createError = require("http-errors");
const { UsersService } = require("./services.js");
const debug = require("debug")("app:module-users-controller");
const { Response } = require("../Common/response.js");

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            debug("Obteniendo usuarios...");
            let users = await UsersService.getAll();
            Response.success(res, 200, "Lista de usuarios", users);
            debug("Usuarios obtenidos:", users);
        } catch (error) {
            debug("Error al obtener usuarios:", error);
            Response.error(res);
        }
    },

    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let user = await UsersService.getById(id);
            if (!user) {
                Response.error(res, new createError.NotFound("Usuario no encontrado"));
            } else {
                Response.success(res, 200, `Usuario ${id}`, user);
            }
        } catch (error) {
            debug("Error al obtener usuario:", error);
            Response.error(res);
        }
    },

    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest("El cuerpo de la solicitud está vacío"));
            } else {
                const insertedId = await UsersService.create(body);
                Response.success(res, 201, "Usuario agregado", insertedId);
            }
        } catch (error) {
            debug("Error al crear usuario:", error);
            Response.error(res);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { params: { id }, body } = req;

            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest("El cuerpo de la solicitud está vacío"));
                return;
            }

            const updatedUser = await UsersService.update(id, body);

            if (!updatedUser) {
                Response.error(res, new createError.NotFound("Usuario no encontrado"));
            } else {
                Response.success(res, 200, `Usuario ${id} actualizado`, updatedUser);
            }
        } catch (error) {
            debug("Error al actualizar usuario:", error);
            Response.error(res);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { params: { id } } = req;

            const deletedUser = await UsersService.delete(id);

            if (!deletedUser) {
                Response.error(res, new createError.NotFound("Usuario no encontrado"));
            } else {
                Response.success(res, 200, `Usuario ${id} eliminado`);
            }
        } catch (error) {
            debug("Error al eliminar usuario:", error);
            Response.error(res);
        }
    },
};