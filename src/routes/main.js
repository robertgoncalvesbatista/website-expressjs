const express = require("express");
const router = express.Router();

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

module.exports = router;
