const route = require("express").Router();
const { addMotorista,listarMotoristas,editMotorista,deletarMotorista
} = require("../controllers/motoristaControlers");

route.post("/adicionarmotorista", addMotorista);
route.get("/buscarmotorista", listarMotoristas);
route.put("/editar/:id", editMotorista);
route.delete("/deletar/:id", deletarMotorista);

module.exports = route 