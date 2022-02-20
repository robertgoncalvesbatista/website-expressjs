const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

require("./../models/Admin");
const Admin = mongoose.model("admins");

require("./../models/User");
const User = mongoose.model("users");

const UserController = require("./../controllers/UserController");
const AdminController = require("./../controllers/AdminController");

router.get("/", (req, res) => {
    res.render("admin/index");
});

router.get("/users", async (req, res) => {
    const users = await User.find();
    const admins = await Admin.find();

    //res.send({ users })

    res.render("admin/index", { users: users, admins: admins })
})

// CRUD  User
router.post("/createuser", UserController.create)
router.get("/readuser/:_id", UserController.read)
router.put("/updateuser/:_id", UserController.update)
router.get("/deleteuser/:_id", UserController.destroy)

// CRUD Admin
router.post("/createadmin", AdminController.create)
router.get("/readadmin/:_id", AdminController.read)
router.put("/updateadmin/:_id", AdminController.update)
router.get("/deleteadmin/:_id", AdminController.destroy)

module.exports = router;
