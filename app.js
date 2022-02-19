const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

//Configurações

//Sessão
app.use(
    session({
        secret: "G8EaD23@$d",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./src/views");
//Mongoose
const options = { useUnifiedTopology: true, useNewUrlParser: true };

mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://localhost/g8", options)
    .then(() => {
        console.log("Conectado ao mongo");
    })
    .catch((err) => {
        console.log("Erro ao se conectar: " + err);
    });

//Public
app.use(express.static(path.join(__dirname, "src/public")));

//Rotas
app.use("/", require("./src/routes/admin"));

//Outros
app.listen(8080, () => {
    console.log("Servidor rodando! http://localhost:8080");
});
