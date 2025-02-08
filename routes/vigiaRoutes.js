const route = require("express").Router();
const { addVigia,listarVigias
} = require("../controllers/vigiaControllers");

route.post("/adicionarvigia", addVigia);
route.get("/buscarvigias", listarVigias);

module.exports = route 