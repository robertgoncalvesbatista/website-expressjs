const mongoose = require("mongoose");

const Categoria = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("categorias", Categoria);
