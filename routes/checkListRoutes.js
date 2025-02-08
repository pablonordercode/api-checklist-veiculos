const route = require("express").Router();
const { addCheckList, listarCheckLists,deletarCheckList

} = require("../controllers/checListControllers");

//middlewares
const { imageUpload } = require("../middlewares/imageUpload");

route.post("/addchecklist", imageUpload.single("foto"), addCheckList);
route.get("/listarchecklist", listarCheckLists);
route.delete("/apagarchecklist/:id", deletarCheckList);

module.exports = route 