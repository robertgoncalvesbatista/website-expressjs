const express = require("express")
const router = express.Router()

const jwt = require("./../config/jwt")
const User = require("./../models/User")

const AuthMiddleware = async (req, res, next) => {
    const [, token] = req.headers.authorization.split(" ")

    try {
        const payload = jwt.verify(token)
        const user = await User.findById(payload.user)

        if (!user) {
            return res.status(401).send("Usuário não encontrado")
        }

        req.auth = user

        next()
    } catch (error) {
        res.status(401, error).send("Error header authorization")
    }
}

router.post("/authenticate", async (req, res) => {
    const { email, senha } = req.body

    try {
        const user = await User.findOne({ email, senha })

        if (!user) {
            return res.status(401).send("Usuário não encontrado")
        }

        const token = jwt.sign({ user: user.id })

        res.redirect("/readAllCategorys")
    } catch (error) {
        res.status(401).send("Usuário não encontrado")
    }
})

module.exports = router;