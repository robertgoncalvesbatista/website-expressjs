require("./src/config/db");
require("dotenv").config();

const { urlencoded, json } = require("body-parser");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const { join } = require("path");
const sessions = require("express-session");
const flash = require("connect-flash");
const express = require("express");

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const app = express();

// Configurações

// Session middleware
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
    resave: false
}));

// Cookie parser middleware
app.use(cookieParser());

// Flash middleware
app.use(flash());

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

// Body Parser
app.use(urlencoded({ extended: true }));
app.use(json());

// Handlebars
app.engine("handlebars", engine({ defaultLayout: "main", handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Public
app.use(express.static(join(__dirname, "src/public")));

// Rotas
app.use("/", require("./src/routes/main"));
app.use("/admin", require("./src/routes/admin"));

// Outros
app.listen(process.env.PORT, () => console.log(`Servidor rodando! http://${process.env.HOST}:${process.env.PORT}`));
