const express = require("express")
const router = express.Router()

const Admin = require("./../models/Admin");
const User = require("./../models/User");

const UserController = require("./../controllers/UserController");
const AdminController = require("./../controllers/AdminController");

// Authentication
router.post("/authenticate/user", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email, password })

        if (!user) {
            return res.status(401).render("error")
        }

        const session = req.session
        session.user_id = user._id;

        res.redirect("/admin/users")
    } catch (error) {
        res.status(401).render("error")
    }
})

router.post("/authenticate/admin", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await Admin.findOne({ email, password })

        if (!user) {
            return res.status(401).render("error")
        }

        res.render("admin/index", { token: token })
    } catch (error) {
        res.status(401).render("error")
    }
})

// Logout route
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

// Administrator route
router.get("/users", async (req, res) => {
    const users = await User.find();
    const admins = await Admin.find();
    /*
        if (!req.session.user_id) {
            res.redirect('/');
        }
    */
    res.render("admin/index", { users: users, admins: admins })
})

// Update routes
router.get("/user/update/:_id", async (req, res) => {
    const user = await User.findOne({ _id: req.params._id });

    res.render("admin/update_user", { user: user })
})

router.get("/admin/update/:_id", async (req, res) => {
    const admin = await Admin.findOne({ _id: req.params._id });

    res.render("admin/update_admin", { admin: admin })
})

// CRUD user
router.post("/createuser", UserController.create)
router.get("/readuser/:_id", UserController.read)
router.post("/updateuser/:_id", UserController.update)
router.get("/deleteuser/:_id", UserController.destroy)

// CRUD admin
router.post("/createadmin", AdminController.create)
router.get("/readadmin/:_id", AdminController.read)
router.post("/updateadmin/:_id", AdminController.update)
router.get("/deleteadmin/:_id", AdminController.destroy)

module.exports = router;