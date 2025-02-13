const express = require("express");
const userRoutes = require("./routes/userRoutes");
const checkListModels = require("./routes/checkListRoutes");
const motoristaControlers = require("./routes/motoristaRoutes");
const vigiaRotes = require("./routes/vigiaRoutes");
const conectarDataBase = require("./db/conn");

const cors = require('cors');
app.use(cors({
  origin: '*', // Permite requisições de qualquer origem (em produção, use domínios específicos)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 7001;

conectarDataBase()
app.use(express.json());
// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static('uploads'))
app.use(cors());



app.use("/usuario", userRoutes);
app.use("/checklist", checkListModels);
app.use("/motorista", motoristaControlers); 
app.use("/vigia", vigiaRotes); 

app.listen(PORT, () => {
    console.log(`rodando na port: ${PORT}`);
});
