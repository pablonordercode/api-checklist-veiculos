const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    namevigia: {
        type: String,
        required: true,
    },


}, { timestamps: true })

const VigiaHoje = mongoose.model("vigias", UserSchema);
module.exports = VigiaHoje