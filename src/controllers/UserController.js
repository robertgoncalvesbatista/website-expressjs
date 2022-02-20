const mongoose = require("mongoose");

require("./../models/User");
const User = mongoose.model("users");

module.exports = {
    async create(req, res) {
        try {
            let erros = [];

            if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
                erros.push({ texto: "name inválido!" });
            }

            if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
                erros.push({ texto: "Email inválido!" });
            }

            if (erros.length > 0) {
                res.redirect("/users");
            } else {
                await User.create(req.body)
                res.redirect("/users");
            }
        } catch (error) {
            console.log("Erro: " + error)
        }
    },
    async read(req, res) {
        try {
            await User.findById(req.params._id)

            res.redirect("/users");
        } catch (error) {
            console.log("Erro: " + error)
        }
    },
    async update(req, res) {
        try {
            let erros = [];

            if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
                erros.push({ texto: "Nome inválido!" });
            }

            if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
                erros.push({ texto: "Email inválido!" });
            }
            if (erros.length > 0) {
                res.redirect("/users");
            } else {
                await Admin.findByIdAndUpdate(req.params._id)
                res.redirect("/users");
            }
        } catch (error) {
            console.log("Erro: " + error)
        }
    },
    async destroy(req, res) {
        try {
            await User.findByIdAndDelete(req.params._id)

            res.redirect("/users");
        } catch (error) {
            console.log("Erro: " + error)
        }
    }
};