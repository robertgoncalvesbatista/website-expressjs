require("dotenv").config();

const mongoose = require("mongoose");

// Mongoose
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on("error", () =>
    console.error("Erro de conexão ao MongoDB: ")
);
mongoose.connection.once("open", () =>
    console.log("Banco de dados MongoDB conectado!")
);
