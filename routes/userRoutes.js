const route = require("express").Router();
const { adduser,buscarTodosUsuarios,
    deletarUsuario,
    loginUser
} = require("../controllers/userController");

route.post("/login", loginUser);
route.post("/adduser", adduser);
route.get("/buscarusuarios", buscarTodosUsuarios);
route.delete("/deletar/:id", deletarUsuario); 

module.exports = route 