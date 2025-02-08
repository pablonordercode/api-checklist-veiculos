const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },

}, { timestamps: true })

const UsuarioCadastrar = mongoose.model("usuarioscadastrados", UserSchema);
module.exports = UsuarioCadastrar