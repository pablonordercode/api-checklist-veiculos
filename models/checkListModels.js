const mongoose = require("mongoose");

const veiculos = ["S-10", "Gol preto", "Estrada", "Fiorino", "L-200", "Spin"];

const CheckListSchema = new mongoose.Schema({
    veiculo: {
        type: String,
        enum: veiculos,
        required: true,
    },
    limpesaDoVeiculo: {
        type: String,
        required: true,
    },

    oleoMotor: { 
        type: String,
        required: true
    },
    aguaRadiador: {
        type: String,
        required: true
    },
    transmissao: {
        type: String,
        required: true
    },
    freios: {
        type: String,
        required: true
    },
    pneusDianteiro: {
        type: String,
        required: true
    },
    pneusTraseiros: {
        type: String,
        required: true
    },
    farolDireito: {
        type: String,
        required: true
    },
    farolEsquerdo: {
        type: String,
        required: true
    },
    lanternaDireita: {
        type: String,
        required: true
    },
    lanternaEsquerda: {
        type: String,
        required: true
    },
    arCondicionado: {
        type: String,
        required: true
    },
    observacao: {
        type: String,
    },
    foto: {
        type: String,
    },
    
    motorista: {  // Adicionando o campo para o motorista
        type: String,
        required: true
    }
}, { timestamps: true });

const CheckList = mongoose.model("CheckListcars", CheckListSchema);
module.exports = { CheckList, veiculos };
