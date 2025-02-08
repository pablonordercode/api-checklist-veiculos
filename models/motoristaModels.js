const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },


}, { timestamps: true })

const Motoristadehoje = mongoose.model("motoristas", UserSchema);
module.exports = Motoristadehoje