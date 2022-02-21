const express = require("express");
const router = express.Router();

const Admin = require("./../models/Admin");
const User = require("./../models/User");

const UserController = require("./../controllers/UserController");
const AdminController = require("./../controllers/AdminController");

router.get("/", (req, res) => {
    res.render("index");
});

// Authentication routes
router.get("/admin/auth", (req, res) => {
    res.render("auth/admin");
});

router.get("/user/auth", (req, res) => {
    res.render("auth/user");
});

// Administrator route
router.get("/users", async (req, res) => {
    const users = await User.find();
    const admins = await Admin.find();

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

// CRUD  user
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
