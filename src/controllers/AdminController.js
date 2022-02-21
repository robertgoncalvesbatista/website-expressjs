const Admin = require("./../models/Admin");

module.exports = {
    async create(req, res) {
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
                await Admin.create(req.body)
                res.redirect("/users");
            }
        } catch (error) {
            console.log("Erro: " + error)
        }
    },
    async read(req, res) {
        try {
            await Admin.findById(req.params._id)

            res.redirect("/users");
        } catch (error) {
            console.log("Erro: " + error)
        }
    },
    async update(req, res) {
        try {
            await Admin.findByIdAndUpdate(req.params._id, req.body)

            res.redirect("/users");
        } catch (error) {
            console.log("Erro: " + error)
        }
    },
    async destroy(req, res) {
        try {
            await Admin.findByIdAndRemove(req.params._id)

            res.redirect("/users");
        } catch (error) {
            console.log("Erro: " + error)
        }
    }
};