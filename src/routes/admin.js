const express = require("express")
const router = express.Router()

const jwt = require("./../config/jwt")

const Admin = require("./../models/Admin");
const User = require("./../models/User");

const UserController = require("./../controllers/UserController");
const AdminController = require("./../controllers/AdminController");

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

// Authentication
router.post("/authenticate/user", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email, password })

        if (!user) {
            return res.status(401).send("Usuário não encontrado")
        }

        // const token = jwt.sign({ user: user.id })
        jwt.sign({ user: user._id })

        res.redirect("/users")
    } catch (error) {
        res.status(401).send("Usuário não encontrado")
    }
})

router.post("/authenticate/admin", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await Admin.findOne({ email, password })

        if (!user) {
            return res.status(401).send("Usuário não encontrado")
        }

        // const token = jwt.sign({ user: user.id })
        jwt.sign({ user: user._id })

        res.redirect("/users")
    } catch (error) {
        res.status(401).send("Usuário não encontrado")
    }
})

// Administrator route
router.get("/users", AuthMiddleware, async (req, res) => {
    const users = await User.find();
    const admins = await Admin.find();

    res.render("admin/index", { users: users, admins: admins })
})

// Update routes
router.get("/user/update/:_id", AuthMiddleware, async (req, res) => {
    const user = await User.findOne({ _id: req.params._id });

    res.render("admin/update_user", { user: user })
})

router.get("/admin/update/:_id", AuthMiddleware, async (req, res) => {
    const admin = await Admin.findOne({ _id: req.params._id });

    res.render("admin/update_admin", { admin: admin })
})

// CRUD  user
router.post("/createuser", AuthMiddleware, UserController.create)
router.get("/readuser/:_id", AuthMiddleware, UserController.read)
router.post("/updateuser/:_id", AuthMiddleware, UserController.update)
router.get("/deleteuser/:_id", AuthMiddleware, UserController.destroy)

// CRUD admin
router.post("/createadmin", AuthMiddleware, AdminController.create)
router.get("/readadmin/:_id", AuthMiddleware, AdminController.read)
router.post("/updateadmin/:_id", AuthMiddleware, AdminController.update)
router.get("/deleteadmin/:_id", AuthMiddleware, AdminController.destroy)

module.exports = router;