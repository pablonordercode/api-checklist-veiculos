const express = require("express");
const cors = require("cors");
const path = require("path");
const conectarDataBase = require("./db/conn");
const userRoutes = require("./routes/userRoutes");
const checkListModels = require("./routes/checkListRoutes");
const motoristaControlers = require("./routes/motoristaRoutes");
const vigiaRotes = require("./routes/vigiaRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 7001;

// Conexão com o banco de dados
conectarDataBase();

// Middlewares
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos da pasta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas
app.use("/usuario", userRoutes);
app.use("/checklist", checkListModels);
app.use("/motorista", motoristaControlers);
app.use("/vigia", vigiaRotes);

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});


