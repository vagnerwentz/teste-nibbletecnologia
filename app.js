const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

const db = require("./config/database").database;

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Banco de dados conectado!");
    } catch (error) {
        console.log(error);
    }
};

// Defining the PORT
const port = process.env.port || 3000;

// Initialize cors Middleware
app.use(cors());

// Initialize BodyParser Middleware
app.use(bodyParser.json());

// Initialize Public Directory

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "public/index.html"));
// });

app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});

const cadastroRoutes = require("./routes/apis/cadastro");

app.use("/apis/cadastro", cadastroRoutes);

app.listen(port, () => {
    console.log(`Server iniciado na porta: ${port}`);
    connectDB();
});
